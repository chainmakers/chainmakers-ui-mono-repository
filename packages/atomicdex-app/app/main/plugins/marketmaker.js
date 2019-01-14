import ipc from 'electron-better-ipc';
import { Server } from 'barterdex-api';
import { app } from 'electron';
import getConfig from '../config';

const debug = require('debug')('atomicapp:plugins:marketmaker');

const config = getConfig();

let marketmaker = null;

function setup() {
  debug('setup marketmaker app');
  if (marketmaker) return marketmaker;

  marketmaker = Server({
    gui: 'AtomicDex',
    userhome: config.get('paths.homeDir'),
    bin: config.get('paths.binDir')
  });

  app.on('quit', () => {
    marketmaker.stop();
  });

  ipc.answerRenderer('marketmaker:start', () => marketmaker.start());

  ipc.answerRenderer('marketmaker:stop', () => marketmaker.stop());

  ipc.answerRenderer('marketmaker:restart', async () => marketmaker.start());

  return marketmaker;
}

export default setup();
