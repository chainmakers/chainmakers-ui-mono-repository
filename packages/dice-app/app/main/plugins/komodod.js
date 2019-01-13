// @flow
// docs: https://github.com/particle4dev/komodo-rpc-lib
import ipc from 'electron-better-ipc';
import KomodoRPC from 'kmd-rpc';
import getDebug from '../../lib/debug';
import emitters from '../emitters';
import config from '../config';

const debug = getDebug('main:plugins:komodod');
const NAMESPACE = 'komodod';
const APPLICATION = 'kmdice';
const log = require('electron-log');

export default async function setup() {
  try {
    const api = KomodoRPC(APPLICATION, {
      bin: config.get('paths.binDir')
    });
    const { coin, args } = config.get('chains');
    const komodod = await api.startDaemon(coin);
    await komodod.start({
      args
    });

    // ipc.answerRenderer('komodod:start', async (pubkey?: string) => {
    ipc.answerRenderer('komodod:start', async () => {
      try {
        debug(`start ${coin} chain`);
        if (komodod.isRunning() !== true) {
          const rs = await komodod.start({
            args
          });
          return rs;
        }
        return {
          ok: 'failed'
        };
      } catch (err) {
        log.error(err);
        log.error(err.message);
        return {
          ok: 'failed'
        };
      }
    });

    ipc.answerRenderer(`${NAMESPACE}:stop`, async () => {
      try {
        debug(`stop ${coin} chain`);
        if (komodod.isRunning() === true) {
          const rs = await komodod.stop();
          return rs;
        }
        return {
          ok: 'failed'
        };
      } catch (err) {
        log.error(err);
        log.error(err.message);
        return {
          ok: 'failed'
        };
      }
    });

    ipc.answerRenderer(`${NAMESPACE}:restart`, async () => {
      debug('not implement yet');
    });

    ipc.answerRenderer(`${NAMESPACE}:rpc`, async () => {
      try {
        debug(`rpc ${coin} chain`, komodod.isRunning());
        if (komodod.isRunning() === true) {
          const rs = await komodod.getInfo();
          return rs;
        }
        return {
          ok: 'failed'
        };
      } catch (err) {
        log.error(err);
        log.error(err.message);
        return {
          ok: 'failed'
        };
      }
    });

    // wait until ready
    const waitUntilReady = await komodod.waitUntilReady();
    debug(`waitUntilReady = ${JSON.stringify(waitUntilReady)}`);
    emitters.emit(`${NAMESPACE}:${APPLICATION}:initialized`);
  } catch (err) {
    log.error(err);
    log.error(err.message);
  }
}

// let marketmaker = null;

// function setup() {
//   if (marketmaker) return marketmaker;

//   marketmaker = MarketMaker();

//   ipc.answerRenderer('marketmaker:start', () => marketmaker.start());

//   ipc.answerRenderer('marketmaker:stop', () => marketmaker.stop());

//   ipc.answerRenderer('marketmaker:restart', async () => marketmaker.start());

//   return marketmaker;
// }

// export default setup();
