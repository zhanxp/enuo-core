var core = require('./index');
var logger = core.logger;

// var otp = logger.default;
// otp.appenders.logstash = {
//     type: 'log4js-logstash-tcp',
//     host: '10.10.10.16',
//     port: 5678,
// };
// otp.appenders.filterLogstash = {
//     "type": "logLevelFilter",
//     "level": "ERROR",
//     "appender": 'logstash'
// };
// otp.categories.default.appenders.push('filterLogstash');
// var fields = {
//     "source": "source1",
//     "env": "dev"
// };
// logger.configure('myapp', otp, fields);

//"log4js-logstash-tcp": "^1.0.8",

var otp = logger.logstash('10.10.10.16', 5678);
logger.configure('myapp', otp, {
    "source": "source1",
    "env": "dev"
});

core.logger.error('error test2!', 'test info 1', {
    info2: 'info2'
});