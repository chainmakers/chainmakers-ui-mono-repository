// @flow
import getDebug from '../../lib/debug';
import config from '../config';
import { NAMESPACE } from './constants';
import type { ErrorRPCType } from './schema';

const debug = getDebug('main:plugins:komodod:dicestatus');

export default function dicestatusFactory(komodod) {
  const action = 'dicestatus';
  const { coin } = config.get('chains');
  return async ({ args }: { args: Array<*> }) => {
    try {
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
      debug(err.message);
      const error: ErrorRPCType = {
        context: {
          action: `${NAMESPACE}:${action}`,
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
  };
}
