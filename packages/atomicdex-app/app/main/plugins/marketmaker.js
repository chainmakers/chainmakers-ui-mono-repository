import ipc from 'electron-better-ipc';
import { Server } from 'barterdex-api';
import { app } from 'electron';
import config from '../config';
import startFactory from './startFactory';
import stopFactory from './stopFactory';

const debug = require('debug')('atomicapp:plugins:marketmaker');

let marketmaker = null;

export default function setup() {
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

  ipc.answerRenderer('marketmaker:start', startFactory(marketmaker));

  ipc.answerRenderer('marketmaker:stop', stopFactory(marketmaker));

  return marketmaker;
}
