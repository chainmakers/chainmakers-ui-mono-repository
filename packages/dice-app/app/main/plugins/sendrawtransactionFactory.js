// @flow
import getDebug from '../../lib/debug';
import config from '../config';
import { NAMESPACE } from './constants';
import type { ErrorRPCType } from './schema';

const debug = getDebug('main:plugins:komodod:sendrawtransaction');

//     KMDICE chain true +15s
// [04:09:15.963] [error] Command failed: /Volumes/Data/workspaces/komodo/atomicdex/packages/dice-app/app/bin/mac/komodo-cli -ac_name=KMDICE sendrawtransaction
// error code: -22
// error message:
// TX decode failed

// get betting error Command failed: /Volumes/Data/workspaces/komodo/atomicdex/packages/dice-app/app/bin/mac/komodo-cli -ac_name=KMDICE sendrawtransaction 0400008085202f8902386a94b7ceb03938ffbfb214836c0ba713bb77fbdc2378914ddf0395a13df7da000000007b4c79a276a072a26ba067a5658021039d966927cfdadab3ee6c56da63c21f17ea753dde4b3dfd41487103e24b27e94e8140ec9cf6ec9a8a163c4cf0716fc70919526b42d40bc90d0d55bcf465dd818adbec3dff8ce9f195121846d5fdb94fcc844e1d6a6ac1f16589790a112b767f187565a100af038001e6a10001ffffffff2b6bd55e7258ccc59c9e64bf124dea00025df7e2de6b05d2d451e6be7297537d030000004948304502210094e74fcaef7e7ef2855e207a96d2ce131f754802f713d170aeac520902dc6b4802203e507bd39572dad0e1be58b3ec006547e59aeee4d43f32a97c4ea637b9ebb07601ffffffff05f960590c00000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cca086010000000000302ea22c80200095ece5eee67e1f313e7ba2d156c7617106cd52b75c93ed3fb110ff3fba6e998103120c008203000401cc27270000000000002321035178457d4bcab8e221ddbc2cf3814bf704bb261be50f8f0e31b5fbf55cd77310acd713601d000000002321035178457d4bcab8e221ddbc2cf3814bf704bb261be50f8f0e31b5fbf55cd77310ac00000000000000006d6a4c6ae6424b4d4449434500006f2d750d5495be86104adb48fc586fa8a893da84d0b608bb6a036dc57095e45b0c385e0c76d9d671bb0fce46aafc4f55074bddd93d2b63c60d9973ee9ab1d749000000000000000000000000000000000000000000000000000000000000000000000000f13702000000000000000000000000error code: -26error message:18: bad-txns-inputs-spent 

export default function sendrawtransactionFactory(komodod) {
  const action = 'sendrawtransaction';
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
      return {
        ok: 'done',
        bettxid: rs.trim()
      };
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
