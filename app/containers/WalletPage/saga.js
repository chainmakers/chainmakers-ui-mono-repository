import { all, call, put, select, cancelled } from 'redux-saga/effects';
// import { CANCEL, delay } from 'redux-saga';
import { CANCEL } from 'redux-saga';
import { takeFirst } from 'barterdex-rssm';
import {
  TRANSACTIONS_LOAD,
  TRANSACTIONS_LOAD_LOOP
  // TIME_LOOP
} from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../lib/barter-dex-api';
import {
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsError,
  loadCoinTransactions
} from './actions';

const debug = require('debug')('atomicapp:containers:WalletPage:saga');

export function* loadCoinTransactionsProcess(coin, address) {
  let request = null;
  try {
    debug(`load coin transaction process running ${coin}`);

    const queueId = api.getQueueId();
    request = api.listTransactions(
      {
        coin,
        address
      },
      {
        useQueue: true
      }
    );

    // {result: "success", status: "queued"}
    const data = yield request;
    data.coin = coin;
    data.queueId = queueId;
    return yield put(loadCoinTransactions(data));
  } catch (err) {
    // FIXME: handling error
    debug(`load coin transaction process fail ${coin}: ${err.message}`);
    return [];
  } finally {
    if (yield cancelled()) {
      debug(`load coin transaction process cancelled ${coin}`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

export function* loadTransactionsProcess() {
  try {
    // load user data
    debug('load transactions process start');
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const coins = user.get('coins');

    const requests = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      const address = e.get('smartaddress');
      requests.push(call(loadCoinTransactionsProcess, coin, address));
    }
    // https://github.com/chainmakers/dicoapp/blob/glxt/.desktop/modules/marketmaker/index.js#L1144
    yield all(requests);
    yield put(loadTransactionsSuccess());
  } catch (err) {
    return yield put(loadTransactionsError(err.message));
  }
}

export function* loadTransactionsLoopProcess() {
  // while (true) {
  debug('load transactions loop process start');
  yield put(loadTransactions());
  // yield call(delay, TIME_LOOP);
  // }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeFirst(TRANSACTIONS_LOAD, loadTransactionsProcess);
  yield takeFirst(TRANSACTIONS_LOAD_LOOP, loadTransactionsLoopProcess);
}
