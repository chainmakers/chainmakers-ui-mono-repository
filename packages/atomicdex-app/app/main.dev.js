/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import MenuBuilder from './main/menu';
import config from './main/config';
import setupMarketmaker from './main/plugins/marketmaker';
import { applicationCrashedDialog } from './main/dialogs';
import blockIP from './main/setPermissionRequestHandler';
import isPackaged from './main/isPackaged';
import explorer from './lib/explorer';

const log = require('electron-log');

const debug = require('debug')('atomicapp:main');

// const isDev = process.mainModule.filename.indexOf('app.asar') === -1;
const isDev = !isPackaged();

if (isDev) log.transports.file.file = path.join(__dirname, '..', 'log.txt');

export default class AppUpdater {
  constructor() {
    // (node:6511) UnhandledPromiseRejectionWarning: TypeError: this._logger.info is not a function
    // autoUpdater.logger = debug;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
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

  if (!isDev) {
    blockIP();
  }

  const loginWindowSize = config.get('loginWindowSize');
  const minWindowSize = config.get('minWindowSize');

  log.info(`start app in ${isDev ? 'development' : 'production'} env`);

  const webPreferences = isDev
    ? {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preloader.js')
      }
    : {
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        contextIsolation: false,
        preload: path.join(__dirname, 'preloader.js'),
        nativeWindowOpen: true,
        enableRemoteModule: false
      };

  mainWindow = new BrowserWindow({
    show: false,
    width: loginWindowSize.width,
    height: loginWindowSize.height,
    minWidth: minWindowSize.width,
    minHeight: minWindowSize.height,
    webPreferences
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

  mainWindow.webContents.on('did-finish-load', async () => {
    try {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }

      log.info('setup mm2 app');
      setupMarketmaker();

      mainWindow.show();
      mainWindow.focus();
    } catch (err) {
      applicationCrashedDialog(err);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

if (!isDev) {
  // https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
  app.on('web-contents-created', (_, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
      log.info(`block navigate to ${navigationUrl}`);
      event.preventDefault();
    });
    contents.on('new-window', async (event, navigationUrl) => {
      event.preventDefault();
      if (explorer.isValid(navigationUrl)) {
        await shell.openExternal(navigationUrl);
      } else {
        log.info(`block open new window ${navigationUrl}`);
      }
    });
  });
}
