// @flow
// @doc
// https://developers.komodoplatform.com/basic-docs/cryptoconditions/cc-dice.html#dicebet

import ipc from 'electron-better-ipc';
import { select, put, call, cancelled } from 'redux-saga/effects';
import { makeSelectBalance } from '../../App/selectors';
import {
  syncKmdiceBetting,
  insertKmdiceBetting,
  startKmdiceBettingSuccess,
  startKmdiceBettingError
} from '../actions';
import { FUNDINGTXID, BETTING_STATUS_PENDING } from '../constants';
import { makeSelectBetHistoryEntities } from '../selectors';
import type { StartKmdiceBettingPayload } from '../schema';

const debug = require('debug')(
  'kmdice:containers:DicePage:saga:startKmdiceBettingSaga'
);

export default function* startKmdiceBettingSaga({
  payload
}: {
  payload: StartKmdiceBettingPayload
}) {
  try {
    debug(`start kmdice betting saga`);
    const { numberToBet, amount } = payload;
    const balance = yield select(makeSelectBalance());
    const betHistoryEntities = yield select(makeSelectBetHistoryEntities());
    const id = betHistoryEntities.size;
    yield put(
      insertKmdiceBetting({
        id,
        time: new Date(),
        amount,
        numberToBet,
        status: BETTING_STATUS_PENDING,
        balanceBeforeBetting: balance
      })
    );

    // step 1: Set your parameters to create a raw transaction and get the hex value
    // bet=$(./komodo-cli -ac_name=KMDICE dicebet KMDICE $FUNDINGTXID $1 $2)
    const rs = yield call([ipc, 'callMain'], 'komodod:dicebet', {
      args: ['KMDICE', FUNDINGTXID, amount, numberToBet]
    });
    if (rs.ok === 'failed') {
      return yield put(startKmdiceBettingError(rs));
    }

    // step 2: Send/broadcast the raw transaction hex
    // bet_hex=$(echo $bet | jq -r '.hex')
    // bet_txid=$(./komodo-cli -ac_name=KMDICE sendrawtransaction $bet_hex)
    const ss = yield call([ipc, 'callMain'], 'komodod:sendrawtransaction', {
      args: [rs.hex]
    });
    if (ss.ok === 'failed') {
      return yield put(startKmdiceBettingError(ss));
    }

    // step 3: Dispatch syncing kmdice bet action
    yield put(
      startKmdiceBettingSuccess({
        numberToBet,
        amount,
        bettxid: ss.bettxid
      })
    );

    return yield put(
      syncKmdiceBetting({
        bettxid: ss.bettxid,
        id
      })
    );
  } catch (err) {
    // Dispatch error of kmdice bet
    console.trace(err);
  } finally {
    if (yield cancelled()) {
      debug(`cancel kmdice betting saga`);
    }
  }
}
/**
RS
{hex: "0400008085202f8902ddab8a65608289e0e0d866996176ee39…00000000000000000002c3202000000000000000000000000", result: "success"}
 */
