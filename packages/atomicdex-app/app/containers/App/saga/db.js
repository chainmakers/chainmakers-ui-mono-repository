// @flow
import { put, call, cancelled } from 'redux-saga/effects';
import { get } from '../../../utils/db';
import { loadDataFromDBSuccess, loadDataFromDBError } from '../actions';

const debug = require('debug')('atomicapp:containers:App:saga:db');

export function* listenForLoadBalanceOrElectrumSuccessful({ payload }) {
  let balanceList;
  const db = get();
  try {
    debug(`load balance or electrum successful`);
    balanceList = yield call([db, 'get'], 'balance_list');
  } catch (err) {
    debug(`load balance or electrum error: ${err.message}`);
  } finally {
    const l = balanceList || [];
    if (!balanceList || balanceList.indexOf(payload.coin) === -1) {
      l.push(payload.coin);
      yield call([db, 'put'], 'balance_list', l);
    }

    if (yield cancelled()) {
      debug(`load balance or electrum cancelled`);
    }
  }
}

export function* listenForRemoveElectrum({ payload }) {
  let balanceList;
  const db = get();
  try {
    debug(`remove electrum successful`);
    balanceList = yield call([db, 'get'], 'balance_list');
    if (balanceList) {
      const l = balanceList.filter(e => e !== payload.coin);
      if (l.length !== balanceList.length) {
        yield call([db, 'put'], 'balance_list', l);
      }
    }
  } catch (err) {
    debug(`remove electrum error: ${err.message}`);
  } finally {
    if (yield cancelled()) {
      debug(`remove electrum cancelled`);
    }
  }
}

export default function* listenForLoadingDataFromDB() {
  debug(`load data from db`);
  try {
    const db = get();
    const balanceList = yield call([db, 'get'], 'balance_list');
    debug('load data from db:', balanceList);
    return yield put(loadDataFromDBSuccess(balanceList));
  } catch (err) {
    debug(`load data from db: ${err.message}`);
    return yield put(loadDataFromDBError());
  } finally {
    if (yield cancelled()) {
      debug(`load data from db cancelled`);
    }
  }
}
