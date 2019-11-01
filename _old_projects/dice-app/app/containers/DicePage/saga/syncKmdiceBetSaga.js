// @flow
// @doc
// https://developers.komodoplatform.com/basic-docs/cryptoconditions/cc-dice.html#dicestatus

import ipc from 'electron-better-ipc';
import { put, call, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { syncKmdiceBettingSuccess } from '../actions';
import {
  FUNDINGTXID,
  BETTING_STATUS_WIN,
  BETTING_STATUS_LOSS
} from '../constants';
import type { SyncKmdiceBettingPayload } from '../schema';

const debug = require('debug')(
  'kmdice:containers:DicePage:saga:syncKmdiceBetSaga'
);

const ACTIVE_HANDLE_TIMEOUT_BETTING_STATUS = 10000;

export default function* syncKmdiceBetSaga(
  {
    payload
  }: {
    payload: SyncKmdiceBettingPayload
  },
  times: number | undefined | null
) {
  try {
    let n = times;
    const { bettxid, id } = payload;
    let status;
    while (true) {
      debug(`start syncing kmdice bet`);
      // step 1: get the status of a dicebet
      // bet_status=$(komodo-cli -ac_name=KMDICE dicestatus KMDICE FUNDINGTXID $bet_txid)
      const rs = yield call([ipc, 'callMain'], 'komodod:dicestatus', {
        args: ['KMDICE', FUNDINGTXID, bettxid]
      });
      if (rs.status === 'loss' || rs.status === 'win') {
        status = rs.status === 'win' ? BETTING_STATUS_WIN : BETTING_STATUS_LOSS;
        break;
      }
      // if (rs.ok === 'failed') {
      //   return yield put(openSnackbars(rs.message));
      // }
      if (n) {
        n -= 1;
        if (n <= 0) break;
      }
      yield call(delay, ACTIVE_HANDLE_TIMEOUT_BETTING_STATUS);
    }

    yield put(
      syncKmdiceBettingSuccess({
        bettxid,
        id,
        status
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      debug(`cancel syncing kmdice bet`);
    }
  }
}
