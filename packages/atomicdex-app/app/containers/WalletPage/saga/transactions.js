import { all, call, put, select, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import api from 'utils/barterdex-api';
import { ENABLE } from '../../../constants';
import { makeSelectBalance } from '../../App/selectors';
import {
  loadTransactionsSuccess,
  loadTransactionsError,
  loadCoinTransactions
} from '../actions';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:saga:transactions'
);

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

export function* listenForElectrumSuccess({ payload }) {
  yield call(loadCoinTransactionsProcess, payload.coin, payload.address);
}

export default function* loadTransactionsProcess() {
  try {
    debug('load transactions process start');
    const balanceState = yield select(makeSelectBalance());

    const list = balanceState
      .get('list')
      .filter(item => item.get('status') === ENABLE)
      .map(e => e.get('symbol'));
    const entities = balanceState.get('entities');

    const coins = list.map(key => entities.get(key));

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
