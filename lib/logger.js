const log4js = require('log4js');

/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
log4js.configure({
    appenders: {
        file: {
            type: 'dateFile',
            filename: 'logs/',
            backups: 50,
            //pattern: 'app-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            level: 'WARN'
        },
        filter: {
            "type": "logLevelFilter",
            "level": "WARN",
            "appender": 'file'
        },
        console: {
            type: 'console'
        },
    },
    categories: {
        default: {
            appenders: ['filter', 'console'],
            level: 'ALL',
        }
    },
    pm2: true,
    replaceConsole: true
});

const logger = log4js.getLogger('app');

var l = {
    info: function(...args) {
        logger.info(args);
    },
    debug: function(...args) {
        logger.debug(args);
    },
    warn: function(...args) {
        logger.warn(args);
    },
    error: function(...args) {
        logger.error(args);
    },
    trace: function(...args) {
        logger.trace(args);
    }
}

module.exports = l;