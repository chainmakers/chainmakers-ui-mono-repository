const ipc = require('electron-better-ipc');
const WebSocket = require('faye-websocket');
const sourceMapSupport = require('source-map-support');

// https://github.com/electron/electron/issues/7714
const isDev = process.mainModule.filename.indexOf('app.asar') === -1;

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

  global.sourceMapSupport = sourceMapSupport;
  global.ipc = {
    callMain: (...args) => ipc.callMain(...args)
  };
  global.WebSocket = WebSocket;
  global.isDev = isDev;
  if (isDev) global.__devtron = { require, process };
});
