const LOG_LEVELS = ['error', 'warn', 'info', 'debug'];
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_FORMAT = process.env.LOG_FORMAT || 'dev';

function shouldLog(level) {
  return LOG_LEVELS.indexOf(level) <= LOG_LEVELS.indexOf(LOG_LEVEL);
}

export const logger = (msg, ...args) => {
  if (shouldLog('info') && process.env.NODE_ENV !== 'test') {
    if (LOG_FORMAT === 'dev') {
      console.log(`[${new Date().toISOString()}]`, msg, ...args);
    } else {
      console.log(msg, ...args);
    }
  }
};

export const errorLogger = (msg, ...args) => {
  if (shouldLog('error')) {
    console.error(`[${new Date().toISOString()}]`, msg, ...args);
  }
};
