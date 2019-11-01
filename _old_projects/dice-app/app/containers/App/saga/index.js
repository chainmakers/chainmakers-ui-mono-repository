// @flow

import { all, fork, take, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { takeFirst } from 'barterdex-rssm';
import routes from '../../../constants/routes.json';
import { LOGOUT, KMDICE_CHAIN_START, KMDICE_CHAIN_STOP } from '../constants';
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
  debug('setting up app saga');
  yield all([
    yield takeFirst(KMDICE_CHAIN_START, startKMDiceChainSaga),
    yield takeFirst(KMDICE_CHAIN_STOP, stopKMDiceChainSaga),
    yield fork(syncKMDiceChainInfo),
    yield fork(logoutFlow)
  ]);
}
