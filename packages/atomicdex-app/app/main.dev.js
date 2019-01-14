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
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import MenuBuilder from './main/menu';
import marketmaker from './main/plugins/marketmaker';
import getConfig from './main/config';
import { marketmakerCrashedDialog } from './main/dialogs';

const debug = require('debug')('atomicapp:main');

export default class AppUpdater {
  constructor() {
    autoUpdater.logger = debug;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const config = getConfig();

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

  const loginWindowSize = config.get('loginWindowSize');

  mainWindow = new BrowserWindow({
    show: false,
    width: loginWindowSize.width,
    height: loginWindowSize.height
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

  mainWindow.webContents.on('did-finish-load', async () => {
    try {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }

      // marketmaker
      await marketmaker.start({
        userData: config.get('paths.userDataDir'),
        coins: config.get('marketmaker.data')
      });
      // await marketmaker.waitUntilReady();

      mainWindow.show();
      mainWindow.focus();
    } catch (err) {
      marketmakerCrashedDialog();
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
