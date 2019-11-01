// @flow
import { all, fork, takeEvery } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import { KMDICE_BETTING_START, KMDICE_BETTING_SYNC } from '../constants';
import startKmdiceBettingSaga from './startKmdiceBettingSaga';
import syncKmdiceBetSaga from './syncKmdiceBetSaga';
import handlingBettingError from './handlingBettingError';

const debug = require('debug')('kmdice:containers:DicePage:saga');

export default function* root() {
  debug('setting up dice page saga');
  yield all([
    yield takeFirst(KMDICE_BETTING_START, startKmdiceBettingSaga),
    yield takeEvery(KMDICE_BETTING_SYNC, syncKmdiceBetSaga),
    yield fork(handlingBettingError)
  ]);
}
