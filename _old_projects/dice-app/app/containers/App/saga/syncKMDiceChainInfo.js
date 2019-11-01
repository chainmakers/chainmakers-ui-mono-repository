// @flow

import ipc from 'electron-better-ipc';
import { put, take, call, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { takeFirst } from 'barterdex-rssm';
import {
  KMDICE_CHAIN_GET_INFO,
  KMDICE_CHAIN_START,
  KMDICE_CHAIN_STOP
} from '../constants';
import { getInfoKMDiceChainSuccess } from '../actions';

const debug = require('debug')(
  'kmdice:containers:App:saga:syncKMDiceChainInfo'
);

const ACTIVE_HANDLE_TIMEOUT_COIND_NATIVE = 15000;

export function* syncKMDiceChainInfoFunc(times: number | undefined | null) {
  try {
    let n = times;
    while (true) {
      debug(`sync KMDiceChain info`);
      const rs = yield call([ipc, 'callMain'], 'komodod:rpc', {
        action: 'getinfo'
      });
      yield put(getInfoKMDiceChainSuccess(rs));
      if (n) {
        n -= 1;
        if (n <= 0) break;
      }
      yield call(delay, ACTIVE_HANDLE_TIMEOUT_COIND_NATIVE);
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      debug(`cancel syncing KMDiceChain info`);
    }
  }
}

export default function* syncKMDiceChainInfo() {
  while (true) {
    const task = yield takeFirst(
      KMDICE_CHAIN_GET_INFO,
      syncKMDiceChainInfoFunc
    );
    yield take([KMDICE_CHAIN_START, KMDICE_CHAIN_STOP]);
    yield cancel(task);
  }
}
