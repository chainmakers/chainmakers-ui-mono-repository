import util from 'electron-util';
import { app } from 'electron';
import { homedir } from 'os';
import { resolve } from 'path';

// const debug = require('debug')('atomicapp:config:paths');

export default function loadPaths(config) {
  // create user data path
  const userDataDir = resolve(app.getPath('userData'), config.get('APPNAME'));

  const binDir = process.env.NODE_ENV !== 'production'
    ? util.fixPathForAsarUnpack(resolve(__dirname, '../../bin'))
    : util.fixPathForAsarUnpack(resolve(__dirname, 'bin'));
  const appDir = process.env.NODE_ENV !== 'production'
    ? resolve(__dirname, '../..')
    : resolve(__dirname);
  return config.set('paths', {
    homeDir: homedir(),
    binDir,
    appDir,
    userDataDir
  });
}
