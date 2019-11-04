import ipc from 'electron-better-ipc';
import { configManager } from 'barterdex-utilities';

let config = null;

export async function setup() {
  if (config) return config;

  config = configManager();
  // const c = remote.require('./main/config');
  const c = await ipc.callMain('config:get');
  config.set(c);

  // listen ipc event here

  return config;
}

export default () => config;
