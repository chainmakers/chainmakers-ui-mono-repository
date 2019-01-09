// @flow
import ipc from 'electron-better-ipc';
import Config from '../lib/config-manager';

let config = null;

export function getFromIPCFactory() {
  return {
    async getFromIPC(path: string) {
      let r = this.get(path);
      if (!r) {
        r = await ipc.callMain('config:get', path);
        this.set(path, r);
      }
      return r;
    }
  };
}

export async function setup() {
  if (config) return config;

  config = Object.assign(Config(), getFromIPCFactory());
  const c = await ipc.callMain('config:get');
  config.set(c);

  // listen ipc event here

  return config;
}

export default () => config;
