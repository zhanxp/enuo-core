/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
function MongoDao(db, collectionName) {
    this.collectionName = collectionName;
    this.db = db;
    this.insert = async function (data) {
        return await db.insert(this.collectionName, data);
    };

    this.update = async function (data) {
        return await db.updateById(this.collectionName, data, data._id);
    };

    this.delete = async function (query) {
        return await db.delete(this.collectionName, query);
    };

    this.findById = async function (id) {
        return await db.findOne(this.collectionName, { _id: id });
    };

    this.findByKV = async function (key, value) {
        return await db.findOne(this.collectionName, { key: value });
    };

    this.find = async function (query, options) {
        return await db.findOne(this.collectionName, query, options);
    };

    this.list = async function (query, options) {
        return await db.find(this.collectionName, query, options);
    };

    this.pageList = async function (pageIndex, pageSize, query) {
        var options = { limit: pageSize, skip: (pageIndex - 1) * pageSize };
        var items = await db.find(this.collectionName, query, options);
        var total = await db.count(this.collectionName, query, null);
        return {
            items: items,
            total: total,
            pageIndex: pageIndex,
            pageSize: pageSize
        };
    };
}

module.exports = MongoDao;