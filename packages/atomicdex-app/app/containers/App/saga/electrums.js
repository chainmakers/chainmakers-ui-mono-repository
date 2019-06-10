// @flow
import { put, select, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import { floor } from 'barterdex-utilities';
import api from '../../../lib/barter-dex-api';
import { INITIALIZATION } from '../../../constants';
import { ELECTRUM_ADD, ALREADY_INIT_LIST } from '../constants';
import {
  makeSelectBalance,
  makeSelectSupportedCoinsEntities
} from '../selectors';
import { addElectrum, addElectrumSuccess, addElectrumError } from '../actions';
import type { AddElectrumPayload } from '../schema';

const debug = require('debug')('atomicapp:containers:App:saga:electrums');

export default function* listenForLoadingElectrums() {
  debug(`load electrums server`);
  const balance = yield select(makeSelectBalance());
  const supportedCoinsEntities = yield select(
    makeSelectSupportedCoinsEntities()
  );
  const list = balance
    .get('list')
    .filter(item => item.get('status') === INITIALIZATION)
    .map(e => e.get('symbol'));

  for (let i = 0; i < list.size; i += 1) {
    const coin = list.get(i);
    if (ALREADY_INIT_LIST.indexOf(coin) === -1) {
      const config = supportedCoinsEntities.get(coin);
      if (config && config.toJS) yield put(addElectrum(config.toJS()));
    }
  }
}

export function* loadElectrum({ payload }: { payload: AddElectrumPayload }) {
  debug(`load ${payload.coin} electrum`);
  let electrumRequest;
  let feeRequest;
  try {
    electrumRequest = api.electrum(payload);
    const rs = yield electrumRequest;
    feeRequest = api.getfee({
      coin: payload.coin
    });
    const fee = yield feeRequest;
    yield put(
      addElectrumSuccess({
        coin: payload.coin,
        address: rs.address,
        balance: floor(rs.balance, 8),
        fee: fee.txfee
      })
    );
  } catch (err) {
    debug(`loading ${payload.coin} electrum error: ${err.message}`);
    yield put(
      addElectrumError({
        context: {
          action: ELECTRUM_ADD,
          params: payload
        },
        type: 'RPC',
        message: err.message
      })
    );
  } finally {
    if (yield cancelled()) {
      debug(`loading ${payload.coin} electrum cancelled`);
      if (electrumRequest && electrumRequest[CANCEL]) {
        electrumRequest[CANCEL]();
      }
      if (feeRequest && feeRequest[CANCEL]) {
        feeRequest[CANCEL]();
      }
    }
  }
}
