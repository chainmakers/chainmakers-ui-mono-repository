// @flow
import ipc from 'electron-better-ipc';
import { put, call, cancelled } from 'redux-saga/effects';
import { getInfoKMDiceChain, startKMDiceChainSuccess } from '../actions';

const debug = require('debug')(
  'kmdice:containers:App:saga:startKMDiceChainSaga'
);

export default function* startKMDiceChainSaga({ payload }) {
  try {
    debug(`start KMDiceChainSaga`);
    const rs = yield call([ipc, 'callMain'], 'komodod:start', payload.pubkey);
    if (rs && rs.ok === 'done') {
      yield put(getInfoKMDiceChain());
    }
    yield put(startKMDiceChainSuccess());
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      debug(`cancel KMDiceChainSaga`);
    }
  }
}
