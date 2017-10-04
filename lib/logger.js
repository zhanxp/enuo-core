var tracer = require("tracer").colorConsole();
var config = require('../config');

/**
 * Created by zhanxiaoping 
 * zhanxp@me.com
 */
var logger = {
    info: function(...args) {
        if (config.debug) {
            tracer.info(args);
        }
    },
    debug: function(...args) {
        if (config.debug) {
            tracer.debug(args);
        }
    },
    warn: function(...args) {
        tracer.warn(args);
    },
    error: function(...args) {
        tracer.error(args);
    },
    trace: function(...args) {
        tracer.trace(args);
    }
}

module.exports = logger;