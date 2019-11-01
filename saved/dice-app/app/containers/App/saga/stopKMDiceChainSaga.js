// @flow

import ipc from 'electron-better-ipc';
import { call, cancelled } from 'redux-saga/effects';

const debug = require('debug')(
  'kmdice:containers:App:saga:stopKMDiceChainSaga'
);

export default function* stopKMDiceChainSaga() {
  try {
    debug(`stop KMDiceChainSaga`);
    const rs = yield call([ipc, 'callMain'], 'komodod:stop');
    debug('stopKMDiceChainSaga', rs);
    if (rs && rs.ok === 'done') {
      console.log(rs, 'rs');
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      debug(`cancel KMDiceChainSaga`);
    }
  }
}
