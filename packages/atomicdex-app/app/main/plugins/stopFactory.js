// @flow
import type { ErrorRPCType } from './schema';

const debug = require('debug')('atomicapp:plugins:marketmaker');

export default function stopFactory(marketmaker) {
  return async () => {
    try {
      if (marketmaker.isRunning() !== true) {
        throw new Error('marketmaker has not started yet');
      }
      const rs = await marketmaker.stop();
      return rs;
    } catch (err) {
      debug(err.message);
      const error: ErrorRPCType = {
        context: {
          action: 'marketmaker:stop',
          params: {}
        },
        type: 'ipc',
        message: err.message,
        ok: 'failed'
      };
      return error;
    }
  };
}
