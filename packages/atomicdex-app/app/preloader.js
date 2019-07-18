const ipc = require('electron-better-ipc');
const WebSocket = require('faye-websocket');
const sourceMapSupport = require('source-map-support');
const log = require('electron-log');
const path = require('path');

const isPackaged = () => {
  const execFile = path.basename(process.execPath).toLowerCase();
  if (process.platform === 'linux') {
    return execFile !== 'electron';
  }
  if (process.platform === 'win32') {
    return execFile !== 'electron.exe';
  }
  return execFile !== 'electron helper';
};

// https://github.com/electron/electron/issues/7714
// const isDev = process.mainModule.filename.indexOf('app.asar') === -1;

const isDev = !isPackaged();

process.once('loaded', () => {
  const { HOT, NODE_ENV, PORT, DEBUG_PROD } = process.env;
  // Security precaution
  log.info(`preloader isDev=${isDev}`);

  if (!isDev)
    window.eval = global.eval = payload => {
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
