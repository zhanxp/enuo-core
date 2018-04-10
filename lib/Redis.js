var redis = require('redis');
var logger = require("./logger");

/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
function Redis() {
    this.client = null;
    this.debug = false;

    this.connect = function(connStrJson) {
        if (this.debug) {
            logger.info('Connecting to redis...', connStrJson);
        }
        this.client = redis.createClient(connStrJson);

        this.client.on("error", function(err) {
            logger.error("redis Error", err);
        });

        this.client.on("connect", function() {
            logger.info("redis connected");
        });
    };

    this.set = async function(key, val, seconds) {
        await this.client.set(key, val, 'EX', seconds);
    }

    this.setJson = async function(key, json, seconds) {
        var str = JSON.stringify(json);
        await this.set(key, str, seconds);
    }

    // this.expire = async function(seconds) {
    //     await this.client.expire(seconds);
    // }

    this.del = async function(key) {
        await this.client.del(key);
    }

    this.get = async function(key) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            _this.client.get(key, function(err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
        //return await this.client.get(key);
    }

    this.getJson = async function(key) {
        var str = await this.get(key);
        if (!str) {
            return null;
        }
        try {
            return JSON.parse(str);
        } catch (e) {
            logger.error(e);
            return null;
        }
    }
};

module.exports = Redis;