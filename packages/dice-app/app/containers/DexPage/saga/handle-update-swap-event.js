import { put, all, call, cancelled, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { takeFirst } from 'barterdex-rssm';
import api from '../../../lib/barter-dex-api';
// import { loadSwapSuccess } from '../../App/actions';
import {
  loadRecentSwapsCoin,
  loadRecentSwapsError,
  loadRecentSwaps
} from '../actions';
import { makeSelectSwapsEntities, makeSelectCurrentSwaps } from '../selectors';
import {
  CHECK_UPDATE_SWAP_EVENT,
  LOAD_RECENT_SWAPS,
  TIME_LOOP
} from '../constants';

const debug = require('debug')(
  'atomicapp:containers:DexPage:saga:handle-update-swap-event'
);

export function* checkSwap(requestid, quoteid, isPending) {
  try {
    const swapelem = {
      requestid,
      quoteid
    };

    const swapstatusResult = yield call([api, 'swapstatus'], swapelem);

    yield put(loadRecentSwapsCoin(swapstatusResult));

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
    return true;
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}

export function* loadRecentSwapsProcess() {
  try {
    const recentswapsResult = yield call([api, 'recentswaps']);

    const swapsEntities = yield select(makeSelectSwapsEntities());

    const { swaps } = recentswapsResult;
    const requests = [];
    for (let i = 0; i < swaps.length; i += 1) {
      const swapobj = swaps[i];
      // eslint-disable-next-line no-await-in-loop
      const e = swapsEntities.find(
        val =>
          val.get('requestid') === swapobj[0] &&
          val.get('quoteid') === swapobj[1]
      );
      if (!e) {
        requests.push(call(checkSwap, swapobj[0], swapobj[1]));
      } else if (e.get('status') === 'pending') {
        requests.push(call(checkSwap, swapobj[0], swapobj[1], true));
      }
    }
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
