var MongoDB = require('./mongo/MongoDB');
var MysqlDB = require('./mysql/MysqlDB');
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
    logger: logger
};

module.exports = enuo;