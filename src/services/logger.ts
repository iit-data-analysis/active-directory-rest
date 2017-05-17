const winston = require('winston');

// Set up logger
const customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red'
};

const logger = new (winston.Logger)({
    colors: customColors,
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        crit: 4,
        fatal: 5
    },
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: true
        }),
        new (winston.transports.File)({filename: __dirname + '/../logs/app.log'})
    ]
});

winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
const origLog = logger.log;

logger.log = function (level, msg) {
    const objType = Object.prototype.toString.call(msg);
    if (objType === '[object Error]') {
        origLog.call(logger, level, msg.toString());
    } else {
        origLog.call(logger, level, msg);
    }
};
/* LOGGER EXAMPLES
 logger.trace('testing');
 logger.debug('testing');
 logger.info('testing');
 logger.warn('testing');
 logger.crit('testing');
 logger.fatal('testing');
 */

module.exports = logger;