const electron = require('electron');

const app = electron.app || electron.remote.app;

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

const isDev = isEnvSet ? getFromEnv : !app.isPackaged;

console.log(isDev, 'isDev');

process.once('loaded', () => {
  const { HOT, NODE_ENV, PORT, DEBUG_PROD } = process.env;
  // Security precaution
  if (!isDev)
    global.eval = payload => {
      const error = new Error(`This app does not allow window.eval().`);
      Object.assign(error, { payload });

      throw error;
    };
  global.process = {
    env: {
      HOT,
      NODE_ENV,
      PORT,
      DEBUG_PROD
    }
  };
});
