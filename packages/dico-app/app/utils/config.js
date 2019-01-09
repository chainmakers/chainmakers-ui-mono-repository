import ipc from 'electron-better-ipc';
import Config from '../lib/config-manager';

let config = null;

export async function setup() {
  if (config) return config;

  config = Config();
  // const c = remote.require('./main/config');
  const c = await ipc.callMain('config:get');
  config.set(c);

  // listen ipc event here

  return config;
}

export default () => config;
