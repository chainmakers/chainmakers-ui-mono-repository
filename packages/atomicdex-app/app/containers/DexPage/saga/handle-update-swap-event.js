import { put, all, call, cancelled, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { takeFirst } from 'barterdex-rssm';
import api from 'utils/barterdex-api';
import { loadSwapSuccess /* loadBalance */ } from '../../App/actions';
import { FINISHED_SWAPS_STATE, STATE_FAILED_SWAPS } from '../../../constants';
import {
  loadRecentSwapsCoin,
  loadRecentSwapsError,
  loadRecentSwaps
} from '../actions';
import {
  /* makeSelectSwapsEntities, */ makeSelectCurrentSwaps
} from '../selectors';
import {
  CHECK_UPDATE_SWAP_EVENT,
  LOAD_RECENT_SWAPS,
  TIME_LOOP
} from '../constants';

const debug = require('debug')(
  'atomicapp:containers:DexPage:saga:handle-update-swap-event'
);

export function* checkSwap(swap /* , isPending */) {
  try {
    const uuid = swap.get('uuid');
    const swapelem = {
      params: {
        uuid
      }
    };

    const swapstatusResult = yield call([api, 'myswapstatus'], swapelem);
    // ONE CASE
    // Status Code: 404 Not Found
    // {error: "swap data is not found"}

    yield put(loadRecentSwapsCoin(swapstatusResult));

    const {
      result: { events }
    } = swapstatusResult;
    if (events.length > 0) {
      const { event } = events[events.length - 1];
      if (event.type === FINISHED_SWAPS_STATE) {
        // check if swap is failed
        let swapFailed = false;
        for (let i = 0; i < events.length; i += 1) {
          const {
            event: { type }
          } = events[i];
          if (STATE_FAILED_SWAPS.indexOf(type) !== -1) {
            swapFailed = true;
            break;
          }
        }
        if (!swapFailed) {
          // NOTE: If you buy COQUI with BEER then COQUI balance will not update automatically after swap finish (maybe we should wait few second)
          // yield put(
          //   loadBalance({
          //     coin: swap.get('alice')
          //   })
          // );
          // yield put(
          //   loadBalance({
          //     coin: swap.get('bob')
          //   })
          // );
          yield put(
            loadSwapSuccess([
              {
                coin: swap.get('bob'),
                value: swap.get('bobamount')
              },
              {
                coin: swap.get('alice'),
                value: 0 - swap.get('aliceamount')
              }
            ])
          );
        }
      }
    }
    /**
    if (isPending && swapstatusResult.status === 'finished') {
      // NOTE: turn this off since we really run it in subscribe func
      debug(`isPending = ${isPending}`);
      // yield put(
      //   loadSwapSuccess([
      //     {
      //       coin: swapstatusResult.bob,
      //       value: swapstatusResult.srcamount
      //     },
      //     {
      //       coin: swapstatusResult.alice,
      //       value: 0 - swapstatusResult.destamount
      //     }
      //   ])
      // );
    }
    */
    return true;
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}

export function* loadRecentSwapsProcess() {
  try {
    // const recentswapsResult = yield call([api, 'recentswaps']);
    // const swapsEntities = yield select(makeSelectSwapsEntities());
    const currentSwaps = yield select(makeSelectCurrentSwaps());
    const requests = [];
    for (let idx = 0; idx < currentSwaps.size; idx++) {
      const item = currentSwaps.get(idx);
      requests.push(call(checkSwap, item));
    }
    // const { swaps } = recentswapsResult;
    // for (let i = 0; i < swaps.length; i += 1) {
    //   const swapobj = swaps[i];
    //   // eslint-disable-next-line no-await-in-loop
    //   const e = swapsEntities.find(
    //     val =>
    //       val.get('requestid') === swapobj[0] &&
    //       val.get('quoteid') === swapobj[1]
    //   );
    //   if (!e) {
    //     requests.push(call(checkSwap, swapobj[0], swapobj[1]));
    //   } else if (e.get('status') === 'pending') {
    //     requests.push(call(checkSwap, swapobj[0], swapobj[1], true));
    //   }
    // }
    const data = yield all(requests);
    debug('load recent swaps process', data);
  } catch (err) {
    // FIXME: handling error
    return yield put(loadRecentSwapsError(err.message));
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}

export function* checkUpdateSwapEvent(payload, times) {
  try {
    let n = times;

    while (true) {
      debug('start');
      // step one: get current swap
      const currentSwaps = yield select(makeSelectCurrentSwaps());
      debug('currentSwaps', currentSwaps.toJS());
      // if not found stop
      if (currentSwaps.size === 0) {
        debug('stop');
        break;
      }

      yield put(loadRecentSwaps());

      if (n) {
        n -= 1;
        if (n <= 0) break;
      }
      yield call(delay, TIME_LOOP);
    }
  } catch (err) {
    // eslint-disable-next-line no-empty
  } finally {
    if (yield cancelled()) {
      console.log('to do something');
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield takeFirst(CHECK_UPDATE_SWAP_EVENT, checkUpdateSwapEvent);
  yield takeFirst(LOAD_RECENT_SWAPS, loadRecentSwapsProcess);
}
