import ipc from 'electron-better-ipc';
import { configManager } from 'barterdex-utilities';
import loadPaths from './paths';
import loadDefault from './configDefault';
import loadChainsConfig from './chainsConfig';
import loadCoinsData from './coins-data';
import loadSymbol from './symbol';
import loadWindows from './windows';

function setup() {
  const config = configManager();

  loadDefault(config);
  loadPaths(config);
  loadChainsConfig(config);
  loadCoinsData(config);
  loadSymbol(config);
  loadWindows(config);

  // listen ipc event here
  ipc.answerRenderer('config:get', path => config.get(path));

  return config;
}

export default setup();
