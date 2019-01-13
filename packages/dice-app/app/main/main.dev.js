/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import MenuBuilder from './menu';
import getApplication from './application';
import getSplashScreen from './splash-screen';
import komodod from './plugins/komodod';

const debug = require('debug')('kmdice:main');
// const log = require('electron-log');
// log.transports.file.file = __dirname + '/log.txt';

export default class AppUpdater {
  constructor() {
    // (node:6511) UnhandledPromiseRejectionWarning: TypeError: this._logger.info is not a function
    // autoUpdater.logger = debug;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  // NOTE: we shoud run `UPGRADE_EXTENSIONS=true yarn dev` after upgrade react
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(debug);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const win = getApplication();
  win.on('application:did-finish-load', () => {
    debug('start komodod app');
    komodod();
  });
  win.init();

  const ss = getSplashScreen();
  ss.init();

  const menuBuilder = new MenuBuilder();
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});
