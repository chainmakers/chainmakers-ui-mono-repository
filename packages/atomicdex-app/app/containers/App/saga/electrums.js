// @flow
import { put, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import getConfig from '../../../utils/config';
import { ELECTRUM_ADD } from '../constants';
import { addElectrum, addElectrumSuccess, addElectrumError } from '../actions';
import type { AddElectrumPayload } from '../schema';

const debug = require('debug')('atomicapp:containers:App:saga:electrums');

const config = getConfig();
const ALREADY_INIT_LIST = ['BTC', 'KMD'];

export default function* listenForLoadingElectrums() {
  debug(`load electrums server`);
  const servers = config.get('marketmaker.data');
  const electrum = servers.filter(e => e.active === 1);
  for (let i = 0; i < electrum.length; i += 1) {
    if (ALREADY_INIT_LIST.indexOf(electrum[i].coin) === -1) {
      yield put(addElectrum(electrum[i]));
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
        balance: rs.balance,
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
