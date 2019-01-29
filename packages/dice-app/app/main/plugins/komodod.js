// @flow
// docs
// - https://github.com/particle4dev/komodo-rpc-lib

import ipc from 'electron-better-ipc';
import KomodoRPC from 'kmd-rpc';
import getDebug from '../../lib/debug';
import emitters from '../emitters';
import config from '../config';
import dicebetFactory from './dicebetFactory';
import dicestatusFactory from './dicestatusFactory';
import sendrawtransactionFactory from './sendrawtransactionFactory';
import { NAMESPACE } from './constants';
import type { ErrorRPCType } from './schema';

const debug = getDebug('main:plugins:komodod');
const APPLICATION = 'kmdice';
const TIMEOUT = 90 * 1000;
const log = require('electron-log');

export default async function setup() {
  try {
    const api = KomodoRPC(APPLICATION, {
      bin: config.get('paths.binDir')
    });
    const { coin, args } = config.get('chains');
    const komodod = await api.startDaemon(coin);

    ipc.answerRenderer('komodod:start', async (pubkey?: string) => {
      try {
        if (komodod.isRunning() === true) {
          debug(`${coin} is running. Let stop it first`);
          await komodod.stop();
        }
        debug(`start ${coin} chain`);
        if (pubkey) {
          args.pubkey = pubkey;
        }
        const rs = await komodod.start({
          args
        });
        // wait until ready
        const waitUntilReady = await komodod.waitUntilReady(TIMEOUT);
        debug(`waitUntilReady = ${JSON.stringify(waitUntilReady)}`);

        return rs;
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
          await komodod.stop();
          const waitUntilStopped = await komodod.waitUntilStopped();
          debug(`waitUntilStopped = ${JSON.stringify(waitUntilStopped)}`);
          return waitUntilStopped;
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

    ipc.answerRenderer(
      `${NAMESPACE}:rpc`,
      async ({ action = 'getinfo', args }: { action: string, args: any }) => {
        try {
          debug(`rpc ${coin} chain`, komodod.isRunning());
          if (komodod.isRunning() !== true) {
            throw new Error('komodod has not started yet');
          }
          const rs = await komodod.rpc({
            coin,
            action,
            args
          });
          return JSON.parse(rs);
        } catch (err) {
          log.error(err.message);
          const error: ErrorRPCType = {
            context: {
              action: `${NAMESPACE}:rpc`,
              params: {
                coin,
                action,
                args
              }
            },
            type: NAMESPACE,
            message: err.message,
            ok: 'failed'
          };
          return error;
        }
      }
    );

    ipc.answerRenderer(`${NAMESPACE}:dicebet`, dicebetFactory(komodod));

    ipc.answerRenderer(`${NAMESPACE}:dicestatus`, dicestatusFactory(komodod));

    ipc.answerRenderer(
      `${NAMESPACE}:sendrawtransaction`,
      sendrawtransactionFactory(komodod)
    );

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
