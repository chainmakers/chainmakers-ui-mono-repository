// @flow
import path from 'path';
// import ipc from 'electron-better-ipc';
import { Menu, BrowserWindow } from 'electron';
import emitters from '../emitters';
import config from '../config';
import type { WindowType } from '../schemas';

const NAMESPACE = 'application';

export default function createApplication(): WindowType {
  let mainWindow = null;
  return Object.assign({
    init() {
      const applicationWindow = config.get('windows.applicationWindow.size');

      mainWindow = new BrowserWindow({
        show: false,
        width: applicationWindow.width,
        height: applicationWindow.height
      });

      mainWindow.loadURL(`file://${this.getIndexHTML()}`);

      // @TODO: Use 'ready-to-show' event
      //  https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

      mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }
        emitters.emit(`${NAMESPACE}:did-finish-load`);
        // this.show();
      });

      mainWindow.on('closed', () => {
        mainWindow = null;
      });

      if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
      ) {
        this.setupDevelopmentEnvironment();
      }

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
        this.show();
      });
    },
    getIndexHTML() {
      return path.join(
        config.get('paths.appDir'),
        'main',
        'application',
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
    setupDevelopmentEnvironment() {
      mainWindow.openDevTools();
      mainWindow.webContents.on('context-menu', (e, props) => {
        const { x, y } = props;

        Menu.buildFromTemplate([
          {
            label: 'Inspect element',
            click: () => {
              mainWindow.inspectElement(x, y);
            }
          }
        ]).popup(mainWindow);
      });
    },
    // eslint-disable-next-line flowtype/no-weak-types
    on(type: string, callback: Function) {
      emitters.on(type, callback);
    }
  });
}
