import winston from 'winston';

require('winston-syslog').Syslog; // eslint-disable-line no-unused-expressions

const host = '18.208.160.101';
const port = 5044;
const appname = 'atomicdex';
const transports = [];

transports.push(new winston.transports.Console());
if (process.env.NODE_ENV !== 'test') {
  transports.push(
    new winston.transports.Syslog({
      host,
      port,
      app_name: appname
    })
  );
}

const logger = winston
  .createLogger({
    level: 'info',
    transports
  })
  .on('error', (...err) => {
    console.log(err, 'err');
  });
export default logger;
