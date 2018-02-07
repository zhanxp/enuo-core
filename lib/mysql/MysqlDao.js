/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
function MysqlDao(db, table) {
    this.table = table;
    this.db = db;
    this.insert = async function(data) {
        return await db.insert(this.table, data);
    };

    this.update = async function(data, where, params) {
        return await db.update(this.table, data, where, params);
    };

    this.findById = async function(id) {
        return await db.loadById(this.table, id);
    };

    this.findByKV = async function(key, value) {
        return await db.loadByKV(this.table, key, value);
    };

    this.deleteById = async function(id) {
        return await this.deleteByKV("id", id);
    };

    this.deleteByKV = async function(key, value) {
        var where = key + "=?"
        var params = [value];
        return await this.delete(where, params);
    };

    this.delete = async function(where, params) {
        var conditions = {
            where: where,
            params: params
        };
        return await db.delete(this.table, conditions);
    };

    this.count = async function(where, params) {
        var conditions = {
            where: where,
            params: params
        };
        return await db.count(this.table, conditions);
    };

    this.find = async function(where, params) {
        var conditions = {};
        conditions.where = where;
        conditions.params = params;
        return await db.load(this.table, conditions);
    };

    this.list = async function(where, params, options) {
        options = options || {};
        var conditions = {};
        conditions.where = where;
        conditions.params = params;
        conditions.orderBy = options.orderBy;
        conditions.limit = options.limit;
        return await db.list(this.table, conditions);
    };

    this.pageList = async function(pageIndex, pageSize, where, params, orderBy) {
        var conditions = {};
        conditions.where = where;
        conditions.params = params;
        conditions.limit = pageSize;
        conditions.skip = pageSize * (pageIndex - 1);
        conditions.orderBy = orderBy;
        var items = await db.list(this.table, conditions);
        var total = await db.count(this.table, conditions);
        return {
            items: items,
            total: total,
            pageIndex: pageIndex,
            pageSize: pageSize
        };
    };
}

module.exports = MysqlDao;