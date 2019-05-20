/**
USECASE TIMEOUT BACKGROUND TASK
- Trigger when have a new buy

- Auto cancel when there is no buy

- Still watch even switch router
*/
import { select, put, call, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { takeFirst } from 'barterdex-rssm';
import { CHECK_TIMEOUT_EVENT, TIME_LOOP } from '../constants';
import { timeoutSwap } from '../actions';
import { makeSelectCurrentSwaps } from '../selectors';

const debug = require('debug')(
  'atomicapp:containers:DexPage:saga:handle-timeout-event'
);

// function* handleTimeoutSwap() {
// Todo
// notification to user
// dispatchLoadRecentSwapsError('Timeout');
// }

export function* checkTimeoutEvent(payload, times) {
  try {
    let n = times;
    while (true) {
      debug('start');
      // step one: get current swap
      let currentSwaps = yield select(makeSelectCurrentSwaps());
      debug('currentSwaps', currentSwaps.toJS());
      // if not found stop
      if (currentSwaps.size === 0) {
        debug('stop');
        break;
      }
      // step two: compare now() with expiration field
      const now = (Date.now() - TIME_LOOP) / 1000;
      currentSwaps = currentSwaps.filter(
        entity => entity.get('expiration') - now <= 0
      );
      // dispatch timeout event
      if (currentSwaps.size >= 0) {
        for (let i = 0; i < currentSwaps.size; i += 1) {
          const entity = currentSwaps.get(i);
          yield put(
            timeoutSwap({
              id: entity.get('id'),
              uuid: entity.get('uuid'),
              requestid: entity.get('requestid'),
              quoteid: entity.get('quoteid'),
              bob: entity.get('bob'),
              alice: entity.get('alice')
            })
          );
        }
      }
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
  yield takeFirst(CHECK_TIMEOUT_EVENT, checkTimeoutEvent);
}
