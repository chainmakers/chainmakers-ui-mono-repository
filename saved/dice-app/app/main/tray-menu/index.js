// @flow

import { Tray, BrowserWindow, Menu } from 'electron';
import path from 'path';
// import sudo from 'sudo-prompt';
import type { WindowType } from '../schemas';

export default function createTrayMenu(): WindowType {
  let win = null;
  let tray = null;
  return Object.assign({
    init() {
      // const options = {
      //   name: 'Productivity plus plus'
      // };

      win = new BrowserWindow({
        width: 250,
        height: 310,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true,
        'node-integration': false
      });
      // Context of tray
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Kenh14.vn',
          type: 'checkbox',
          // click: menuItem => {
          //   let command = '';
          //   if (menuItem.checked) {
          //     command = 'hostile set localhost kenh14.vn';
          //   } else {
          //     command = 'hostile remove kenh14.vn';
          //   }
          //   sudo.exec(command, options, error => {
          //     if (error) throw new Error('User did not grat permission');
          //   });
          // },
          checked: false
        }
      ]);

      // Hide the win when it loses focus
      win.on('blur', () => {
        if (!win.webContents.isDevToolsOpened()) {
          win.hide();
        }
      });
      tray = new Tray(path.join(__dirname, 'icon.png'));
      tray.setToolTip('Productivity plus plus');
      tray.setContextMenu(contextMenu);
      // tray.on('click', () => {
      //   this.toggle();
      // });
    },
    getIndexHTML() {
      return path.join(__dirname, 'index.html');
    },
    hide() {
      win.hide();
    },
    getWindowPosition() {
      const windowBounds = win.getBounds();
      const trayBounds = tray.getBounds();

      // Center window horizontally below the tray icon
      const x = Math.round(
        trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
      );

      // Position window 4 pixels vertically below the tray icon
      const y = Math.round(trayBounds.y + trayBounds.height + 3);

      return { x, y };
    },
    show() {
      const { x, y } = this.getWindowPosition();
      win.setPosition(x, y, false);
      win.show();
      win.focus();
    },
    toggle() {
      if (win.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy() {}
  });
}
