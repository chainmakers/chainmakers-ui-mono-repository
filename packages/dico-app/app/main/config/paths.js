const util = require('electron-util');
const { app } = require('electron');
const { homedir } = require('os');
const { resolve } = require('path');

const { is } = util;
// const debug = require('debug')('atomicapp:config:paths');

export default function loadPaths(config) {
  // create user data path
  const userDataDir = resolve(app.getPath('userData'), config.get('APPNAME'));

  const binDir = is.development
    ? util.fixPathForAsarUnpack(resolve(__dirname, '../../bin'))
    : util.fixPathForAsarUnpack(resolve(__dirname, 'bin'));
  const appDir = is.development
    ? resolve(__dirname, '../..')
    : resolve(__dirname);
  return config.set('paths', {
    homeDir: homedir(),
    binDir,
    appDir,
    userDataDir
  });
}
