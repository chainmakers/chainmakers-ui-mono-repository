import { dialog, app } from 'electron';
import { def } from './config/config-default';

// eslint-disable-next-line import/prefer-default-export
export function marketmakerCrashedDialog(err) {
  dialog.showErrorBox('Marketmaker Crashed', `Error: ${err.message}. ${def.APPNAME} will be quit.`);
  // app.relaunch();
  app.quit();
}
