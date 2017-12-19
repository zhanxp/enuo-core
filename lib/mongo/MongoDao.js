/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
function MongoDao(db, collectionName) {
    this.collectionName = collectionName;
    this.db = db;
    this.insert = async function(data) {
        return await db.insert(this.collectionName, data);
    };

    this.update = async function(data, q) {
        if (!q) {
            var val = data._id;
            if (typeof val == 'string') {
                val = new ObjectID(val);
            }
            q = { _id: val };
        }
        return await db.updateOne(this.collectionName, data, q);
    };

    this.delete = async function(query) {
        return await db.delete(this.collectionName, query);
    };

    this.deleteById = async function(id) {
        return await this.deleteByKV("_id", id);
    };

    this.deleteByKV = async function(key, value) {
        var query = {};
        query[key] = value;
        return await this.delete(query);
    };


    this.count = async function(query) {
        return await db.count(this.collectionName, query);
    };


    this.findById = async function(id) {
        return await db.findOne(this.collectionName, { _id: id });
    };

    this.findByKV = async function(key, value) {
        var query = {};
        query[key] = value;
        return await db.findOne(this.collectionName, query);
    };

    this.find = async function(query, options) {
        return await db.findOne(this.collectionName, query, options);
    };

    this.list = async function(query, options) {
        return await db.find(this.collectionName, query, options);
    };

    this.pageList = async function(pageIndex, pageSize, query, sort) {
        var options = { limit: pageSize, skip: (pageIndex - 1) * pageSize, sort: sort };
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