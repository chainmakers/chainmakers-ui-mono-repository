// @flow
import config from '../config';
import type { ErrorRPCType } from './schema';

const debug = require('debug')('atomicapp:plugins:marketmaker');

export default function startFactory(marketmaker) {
  return async (passphrase: string) => {
    try {
      if (marketmaker.isRunning() === true) {
        throw new Error('marketmaker is ready');
      }
      const rs = await marketmaker.start(
        {
          userData: config.get('paths.userDataDir'),
          coins: config.get('marketmaker.data'),
          // NOTE: For testing
          passphrase,
          netid: 9999
        },
        {
          logs: true
        }
      );
      return rs;
    } catch (err) {
      debug(err.message);
      const error: ErrorRPCType = {
        context: {
          action: 'marketmaker:start',
          params: {
            passphrase
          }
        },
        type: 'ipc',
        message: err.message,
        ok: 'failed'
      };
      return error;
    }
  };
}
