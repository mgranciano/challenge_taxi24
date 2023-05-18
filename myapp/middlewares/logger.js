var httpContext = require('express-http-context');

const  { format , createLogger, transports}  = require("winston");
const { combine, timestamp, printf, colorize, align } = format;

//Using the printf format.
const customFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}][ ${ httpContext.get('reqId') ? httpContext.get('reqId') : 'MYAPP' } ][ ${level} ] => ${message}`;
  });

const logger = createLogger({
  level: "debug",
  format:  combine( colorize({all:true}), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [new transports.Console()],
});

module.exports = logger;