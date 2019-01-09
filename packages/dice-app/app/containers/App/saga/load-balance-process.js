// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import { put, select, call, all, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import { makeSelectCurrentUser } from '../selectors';
import {
  loadBalanceSuccess,
  loadCoinBalanceSuccess,
  loadBalanceError
} from '../actions';

const debug = require('debug')(
  'atomicapp:containers:App:saga:load-balance-process'
);

export function* loadCoinBalanceProcess(coin, address) {
  let request = null;
  try {
    debug(`load coin balance process running ${coin}`);
    const params = {
      coin,
      address
    };
    request = api.balance(params);
    const data = yield request;
    data.address = address;
    // const utxo = yield call([api, 'listunspent'], params);
    // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#getfee
    const fee = yield call([api, 'getfee'], {
      coin
    });
    yield put(
      loadCoinBalanceSuccess({
        coin,
        address,
        balance: Number(data.balance),
        fee: fee.txfee
        // utxo
      })
    );

    debug(`load balance done ${coin}`);

    return {
      coin,
      address,
      balance: Number(data.balance),
      fee: fee.txfee
    };
  } catch (err) {
    debug(`load coin balance process fail ${coin}: ${err.message}`);
    return false;
  } finally {
    if (yield cancelled()) {
      debug(`load coin balance process cancelled ${coin}`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

export default function* loadBalanceProcess() {
  try {
    // load user data
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
      requests.push(call(loadCoinBalanceProcess, coin, address));
    }
    yield all(requests);
    return yield put(loadBalanceSuccess());
  } catch (err) {
    return yield put(loadBalanceError(err.message));
  }
}
