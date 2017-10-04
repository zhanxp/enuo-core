var MongoDB = require('./lib/mongo/MongoDB');
var MongoDao = require('./lib/mongo/MongoDao');
var MysqlDB = require('./lib/mysql/MysqlDB');
var MysqlDao = require('./lib/mysql/MysqlDao');
var api = require('./lib/apiResult');
var Redis = require('./lib/Redis');
var errors = require('./lib/errors');
var logger = require('./lib/logger');

/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
var enuo = {
    mongo: new MongoDB(),
    mysql: new MysqlDB(),
    api: api,
    redis: new Redis(),
    errors: errors,
    logger: logger,
    MongoDB: MongoDB,
    MysqlDB: MysqlDB,
    Redis: Redis,
    MongoDao: MongoDao,
    MysqlDao: MysqlDao
};

module.exports = enuo;