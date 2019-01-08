import { dialog, app } from 'electron';
import { def } from './config/config-default';

exports.marketmakerCrashedDialog = () => {
  dialog.showErrorBox('Marketmaker Crashed', `${def.APPNAME} will be started.`);
  app.relaunch();
  app.quit();
};
