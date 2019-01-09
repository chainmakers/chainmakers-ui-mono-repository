import { dialog, app } from 'electron';
import { APPNAME } from './config/config-default';

exports.marketmakerCrashedDialog = () => {
  dialog.showErrorBox('Marketmaker Crashed', `${APPNAME} will be started.`);
  app.relaunch();
  app.quit();
};
