// @flow
// https://github.com/trodi/electron-splashscreen

import path from 'path';
import { BrowserWindow } from 'electron';
import config from '../config';
import emitters from '../emitters';
import type { WindowType } from '../schemas';

const NAMESPACE = 'splash-screen';

export default function createApplication(): WindowType {
  let mainWindow = null;
  return Object.assign({
    init() {
      const splashScreen = config.get('windows.splashScreen.size');

      mainWindow = new BrowserWindow({
        show: false,
        width: splashScreen.width,
        height: splashScreen.height,
        frame: false,
        center: true
      });

      mainWindow.loadURL(`file://${this.getIndexHTML()}`);

      // @TODO: Use 'ready-to-show' event
      //  https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

      mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }
        emitters.emit(`${NAMESPACE}:did-finish-load`);
        this.show();
      });

      mainWindow.on('closed', () => {
        mainWindow = null;
      });

      // ipc.answerRenderer('marketmaker:start', () => marketmaker.start());

      // ipc.answerRenderer('marketmaker:stop', () => marketmaker.stop());

      // ipc.answerRenderer('marketmaker:restart', async () =>
      //   marketmaker.start()
      // );

      emitters.on(`${NAMESPACE}:reload`, () => {
        mainWindow.webContents.reload();
      });

      emitters.on(`${NAMESPACE}:setFullScreen`, () => {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      });

      emitters.on(`${NAMESPACE}:toggleDevTools`, () => {
        mainWindow.toggleDevTools();
      });

      emitters.on(`${NAMESPACE}:close`, () => {
        mainWindow.close();
      });

      emitters.on(`komodod:kmdice:initialized`, () => {
        mainWindow.close();
      });
    },
    getIndexHTML() {
      return path.join(
        config.get('paths.appDir'),
        'main',
        'splash-screen',
        'index.html'
      );
    },
    hide() {
      if (mainWindow) {
        mainWindow.hide();
      }
    },
    show() {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    },
    // eslint-disable-next-line flowtype/no-weak-types
    on(type: string, callback: Function) {
      emitters.on(type, callback);
    }
  });
}
