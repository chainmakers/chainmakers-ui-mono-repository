import fs from 'fs';
import split2 from 'split2';
import childProcess from 'child_process';
import ipc from 'electron-better-ipc';
import { app } from 'electron';
import killProcess from './killprocess';
import getConfig from '../config';

// const { marketmakerCrashedDialog } = require('../dialogs');
const debug = require('debug')('atomicapp:plugins:marketmaker');

const config = getConfig();

const MarketMaker = () => {
  const state = {
    isRunning: false
  };

  let marketmakerProcess = null;

  return Object.assign({
    start: function start(options) {
      // killProcess('marketmaker');
      this.stop();
      debug('start');

      const userDataDir = config.get('paths.userDataDir');
      if (!fs.existsSync(userDataDir)) {
        fs.mkdirSync(userDataDir);
      }

      const coins = config.get('marketmaker.data');
      const startparams = Object.assign({}, options, {
        client: 1,
        // canbind: 0,
        gui: 'AtomicDex',
        passphrase: 'default',
        userhome: config.get('paths.homeDir'),
        coins
      });

      marketmakerProcess = childProcess.spawn(
        config.get('paths.marketmaker'),
        [JSON.stringify(startparams)],
        { cwd: userDataDir }
      );

      state.isRunning = true;

      // The 'error' event is emitted whenever:
      //  The process could not be spawned, or
      //   The process could not be killed, or
      //  Sending a message to the child process failed.
      marketmakerProcess.on('error', error => {
        debug(error.message);
        state.isRunning = false;
        throw error;
      });

      // The 'exit' event is emitted after the child process ends.
      // marketmakerProcess.on('exit', () => {
      //   if (!this.isRunning) {
      //     return;
      //   }

      //   state.isRunning = false;
      //   marketmakerCrashedDialog();
      // });

      marketmakerProcess.stdout.setEncoding('utf8');
      marketmakerProcess.stdout.pipe(split2()).on('data', data => debug(data));

      marketmakerProcess.stderr.setEncoding('utf8');
      marketmakerProcess.stderr.pipe(split2()).on('data', data => debug(data));

      app.on('quit', () => {
        this.stop();
      });
    },

    stop: function stop() {
      debug('stop');
      state.isRunning = false;
      if (marketmakerProcess) {
        marketmakerProcess.kill();
      }

      marketmakerProcess = null;
      killProcess('marketmaker');
    },

    isRunning: function isRunning() {
      return state.isRunning;
    }
  });
};

let marketmaker = null;

function setup() {
  if (marketmaker) return marketmaker;

  marketmaker = MarketMaker();

  ipc.answerRenderer('marketmaker:start', () => marketmaker.start());

  ipc.answerRenderer('marketmaker:stop', () => marketmaker.stop());

  ipc.answerRenderer('marketmaker:restart', async () => marketmaker.start());

  return marketmaker;
}

export default setup();
