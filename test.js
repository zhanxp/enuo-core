var core = require('./index');
var logger = core.logger;

// 1. default 
// is write to file (./logs) and console


// 2. logstash  
// ======================== yarn add log4js-logstash-tcp ==================================
// var otp = logger.logstash('10.10.10.16', 5678);
// logger.configure('myapp', otp, {
//     "source": "source1",
//     "env": "dev"
// });
// core.logger.error('error test3!');


// 3. mongo 
// ======================== yarn add log4js-mongo-appender ==================================
// var otp = logger.mongodb('127.0.0.1', 27017, 'logs', 'log4js_logs');
// logger.configure('test-mongo', otp, {
//     "source": "source1",
//     "env": "dev"
// });
// core.logger.error('error test4!',{a:'b'});