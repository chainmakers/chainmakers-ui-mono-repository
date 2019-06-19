const electron = require('electron');
const ipc = require('electron-better-ipc');
const WebSocket = require('faye-websocket');
const sourceMapSupport = require('source-map-support');

const app = electron.app || electron.remote.app;
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !app.isPackaged;

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
});

// import { configManager } from 'barterdex-utilities';

// let config = null;

// export function getFromIPCFactory() {
//   return {
//     async getFromIPC(path: string) {
//       let r = this.get(path);
//       if (!r) {
//         r = await ipc.callMain('config:get', path);
