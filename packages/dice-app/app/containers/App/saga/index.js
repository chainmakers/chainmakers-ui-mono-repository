import { all, fork, take, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { takeFirst } from 'barterdex-rssm';
import routes from '../../../constants/routes.json';
import {
  LOGOUT,
  LOAD_WITHDRAW,
  KMDICE_CHAIN_START,
  KMDICE_CHAIN_STOP
} from '../constants';
import loadWithdrawProcess from './load-withdraw-process';
import startKMDiceChainSaga from './startKMDiceChainSaga';
import stopKMDiceChainSaga from './stopKMDiceChainSaga';
import syncKMDiceChainInfo from './syncKMDiceChainInfo';

const debug = require('debug')('kmdice:containers:App:saga');

export function* logoutFlow() {
  debug(`logout flow`);
  while (true) {
    const request = yield take(LOGOUT);
    debug(`go to login ${request.type}`);
    yield put(push(routes.LOGIN));
  }
}

export default function* root() {
  yield all([
    yield takeFirst(LOAD_WITHDRAW, loadWithdrawProcess),
    yield takeFirst(KMDICE_CHAIN_START, startKMDiceChainSaga),
    yield takeFirst(KMDICE_CHAIN_STOP, stopKMDiceChainSaga),
    yield fork(syncKMDiceChainInfo),
    yield fork(logoutFlow)
  ]);
}
