var ObjectID = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;
var logger = require("../logger");
var errors = require('../errors');

/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
function MongoDB() {
    this.db = null;
    this.debug = false;

    this.connect = async function(dbUrl, options) {

        options = options || {
            useMongoClient: true,
            autoReconnect: true,
            reconnectTries: 10000,
            keepAlive: 30000,
            bufferMaxEntries: 0
        };

        let _this = this;
        return new Promise(function(resolve, reject) {
            MongoClient.connect(dbUrl, options, function(err, db) {
                if (err) {
                    return reject(err);
                }
                if (_this.debug) {
                    logger.info("已经连接到 mongodb：", dbUrl);
                }
                _this.db = db;
                return resolve(db);
            });
        });
    };

    /**
     * 此方法适合 Web 中的 GET
     * @param collectionName
     * @param query
     * @param options
     * @returns {Function}
     */
    this.find = async function(collectionName, query, options) {
        if (this.debug) {
            logger.info("find");
            logger.info("collection:", collectionName);
            logger.info("query:", query);
            logger.info("options:", options);
        }
        var collection = this.db.collection(collectionName);
        var docs = collection.find(query);

        //logger.info(collectionName, "------", options);
        if (!options) {
            options = {};
        }
        if (options.hasOwnProperty("project")) {
            docs.project(options['project']);
        }
        if (options.hasOwnProperty("skip")) {
            var skip = parseInt(options.skip);
            docs.skip(skip);
        }

        //var limit = 5000;
        //limit = limit > 5000 ? 5000 : limit;
        if (options.hasOwnProperty("limit")) {
            var limit = parseInt(options.limit) || 200;
            if (limit > 5000) {
                logger.warn('mongo limit > 5000 !');
            }
            docs.limit(limit);
        }

        if (options.hasOwnProperty("comment")) {
            docs.comment(options['comment']);
        }
        if (options.hasOwnProperty("sort")) {
            docs.sort(options['sort']);
        }
        if (options.hasOwnProperty("max")) {
            docs.max(options['max']);
        }
        if (options.hasOwnProperty("min")) {
            docs.min(options['min']);
        }
        return await docs.toArray();
    }

    /**
     * 此方法适合 Web 中的 GET
     * @param collectionName
     * @param query
     * @param options
     * @returns {Function}
     */
    this.count = async function(collectionName, query, options) {
        if (this.debug) {
            logger.info("count");
            logger.info("collection:", collectionName);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.count(query, options);
    }

    this.list = async function(collectionName, query, options) {
        var res = await this.find(collectionName, query, options);
        var total = await this.count(collectionName, query, null);
        return { total: total, list: res };
    }

    /**
     * 此方法适合 Web 中的 GET
     * @param collectionName
     * @param query
     * @param options
     * @returns {*}
     */
    this.findOne = async function(collectionName, query, options) {
        if (!options) {
            options = {};
        }
        options.limit = 1;
        var res = await this.find(collectionName, query, options);
        if (res.length > 0)
            return res[0];
        return null;
    }

    /**
     *
     * @param collectionName
     * @param query
     * @returns {boolean}
     */
    this.exists = async function(collectionName, query) {
        var res = await this.count(collectionName, query);
        return res > 0;
    }

    /**
     * 删除一个文档, 此方法适合 Web 中的 GET
     * @param collectionName
     * @param query
     * @param options
     * @returns {Function}
     */
    this.deleteOne = async function(collectionName, query, options) {
        if (this.debug) {
            logger.info("deleteOne");
            logger.info("collection:", collectionName);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.deleteOne(query, options);
    }

    /**
     *  删除, 此方法适合 Web 中的 GET
     * @param collectionName
     * @param query
     * @param options
     * @returns {Function}
     */
    this.delete = async function(collectionName, query, options) {
        if (this.debug) {
            logger.info("delete");
            logger.info("collection:", collectionName);
            // logger.info("doc:", doc);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.deleteMany(query, options);
    }

    /**
     * 插入文档, 可以支持多个文档一起插入, 此方法适合 Web 中的 POST
     * @param collectionName
     * @param docs
     * @param query
     * @param options
     * @returns {Function}
     */
    this.insert = async function(collectionName, docs, options) {
        if (this.debug) {
            logger.info("insert");
            logger.info("collection:", collectionName);
            logger.info("docs:", docs);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        if (Array.isArray(docs)) {
            return await collection.insertMany(docs, options);
        } else {
            return await collection.insertOne(docs, options);
        }
    }

    /**
     * Update  documents on MongoDB, 谨慎使用可以批量修改
     * @param collectionName 集合
     * @param doc
     * @param query
     * @param options
     * @returns {Function}
     */
    this.update = async function(collectionName, doc, query, options) {
        if (this.debug) {
            logger.info("updateOne");
            logger.info("collection:", collectionName);
            logger.info("doc:", doc);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.update(query, doc, options);
    }

    /**
     * Update a single document on MongoDB, 这个方法适合 Web 中的 POST
     * @param collectionName 集合
     * @param doc
     * @param query
     * @param options
     * @returns {Function}
     */
    this.updateOne = async function(collectionName, doc, query, options) {
        if (this.debug) {
            logger.info("updateOne");
            logger.info("collection:", collectionName);
            logger.info("doc:", doc);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.updateOne(query, { $set: doc }, options);
    }

    /**
     * query and increment a single document on MongoDB, it's a atomic operation
     * @param collectionName 集合
     * @param doc
     * @param query
     * @param options
     * @returns {Function}
     */
    this.findOneAndIncWithLock = async function(collectionName, doc, query, options) {
        if (this.debug) {
            logger.info("findOneAndIncWithLock");
            logger.info("collection:", collectionName);
            logger.info("doc:", doc);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.findOneAndUpdate(query, { $inc: doc }, options);
    }

    /**
     * 这个方法适合 Web 中的 POST
     * @param collectionName
     * @param doc
     * @param _id
     * @param options
     * @returns {*}
     */
    this.updateById = async function(collectionName, doc, _id, options) {
        return await this.updateOne(collectionName, doc, { _id: new ObjectID(_id) }, options);
    }

    /**
     * 这个方法适合 Web 中的 POST
     * @param collectionName
     * @param doc
     * @param query
     * @param options
     * @returns {*}
     */
    this.save = async function(collectionName, doc, options) {
        var _id = new ObjectID();
        if (doc._id) {
            _id = new ObjectID(doc._id);
        }
        if (doc.hasOwnProperty("_id")) {
            delete doc._id;
        }
        if (!options) {
            options = {};
        }
        options.upsert = true;

        return await this.findOneAndUpdate(collectionName, doc, { _id: _id }, options);

    }

    this.findOneAndUpdate = async function(collectionName, doc, query, options) {
        if (this.debug) {
            logger.info("findOneAndUpdate");
            logger.info("collection:", collectionName);
            logger.info("doc", doc);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.findOneAndUpdate(query, { $set: doc }, options);
    }

    /**
     * 此方法不适合 Web 直接调用
     * @param collectionName
     * @param key
     * @param match
     * @returns {Function}
     */
    this.sum = async function(collectionName, key, match) {
        if (this.debug) {
            logger.info("sum");
            logger.info("collection:", collectionName);
            logger.info("key:", key);
            logger.info("match:", match);
        }
        var collection = this.db.collection(collectionName);
        var xV = [];
        if (match) {
            xV.push({
                $match: match
            });
        }
        xV.push({
            $group: {
                _id: null,
                sum: { $sum: "$" + key }
            }
        });
        var cursor = collection.aggregate(xV);
        return await cursor.toArray();
    }

    /**
     * query and increment a single document on MongoDB
     * @param collectionName 集合
     * @param doc
     *
     * @param query
     * @param options
     * @returns {Function}
     */
    this.findOneAndInc = async function(collectionName, doc, query, options) {
        if (this.debug) {
            logger.info("findOneAndInc");
            logger.info("collection:", collectionName);
            logger.info("doc:", doc);
            logger.info("query:", query);
            logger.info("options:", options);
        }

        var collection = this.db.collection(collectionName);
        return await collection.updateOne(query, { $inc: doc }, options);
    }

};

module.exports = MongoDB;