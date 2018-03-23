var ObjectID = require("mongodb").ObjectID;

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

    // this.tryObjectID = function(id) {
    //     var val = id;
    //     if (typeof id == 'string') {
    //         try {
    //             val = new ObjectID(val);
    //         } catch (e) {

    //         }
    //     }
    //     return val;
    // }

    this.objectID = function(str) {
        return new ObjectID(str);
    }

    this.update = async function(data, query) {
        // if (!query) {
        //     var val = this.tryObjectID(data._id);
        //     query = { _id: val };
        // }
        return await db.updateOne(this.collectionName, data, query);
    };

    this.delete = async function(query) {
        return await db.delete(this.collectionName, query);
    };

    this.deleteById = async function(id) {
        //var val = this.tryObjectID(id);
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
        //var val = this.tryObjectID(id);
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