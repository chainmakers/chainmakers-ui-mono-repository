import { fork, take, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import takeFirst from '../../../utils/sagas/take-first';
import routes from '../../../constants/routes.json';
import { LOGOUT, LOAD_BALANCE, LOAD_WITHDRAW } from '../constants';
import loadBalanceProcess from './load-balance-process';
import loadWithdrawProcess from './load-withdraw-process';

const debug = require('debug')('dicoapp:containers:App:saga');

export function* logoutFlow() {
  debug(`logout flow`);
  while (true) {
    const request = yield take(LOGOUT);
    debug(`go to login ${request.type}`);
    yield put(push(routes.LOGIN));
  }
}

export default function* root() {
  yield takeLatest(LOAD_BALANCE, loadBalanceProcess);
  yield takeFirst(LOAD_WITHDRAW, loadWithdrawProcess);
  yield fork(logoutFlow);
}
