import ipc from 'electron-better-ipc';
import { configManager } from 'barterdex-utilities';
import loadPaths from './paths';
import loadDefault from './config-default';
import loadCoinsData from './coins-data';
import loadSymbol from './symbol';

let config = null;

export function setup() {
  if (config) return config;

  config = configManager();

  loadDefault(config);
  loadPaths(config);
  loadCoinsData(config);
  loadSymbol(config);

  // listen ipc event here
  ipc.answerRenderer('config:get', path => config.get(path));

  return config;
}

export default setup();
