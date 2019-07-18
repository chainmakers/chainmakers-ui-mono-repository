// @flow
// @docs
// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import { put, select, cancelled } from 'redux-saga/effects';
import { floor } from 'barterdex-utilities';
import { CANCEL } from 'redux-saga';
import api from 'utils/barterdex-api';
import { ENABLE } from '../../../constants';
import { BALANCE_LOAD, DISABLE_COINS } from '../constants';
import { openSnackbars } from '../../Snackbars/actions';
import { makeSelectBalance } from '../selectors';
import { loadBalance, loadBalanceSuccess, loadBalanceError } from '../actions';
import type { LoadbalacePayload } from '../schema';

const debug = require('debug')('atomicapp:containers:App:saga:balance');

export default function* listenForLoadingBalance() {
  debug(`listen for loading balance`);
  // load balance data
  const balance = yield select(makeSelectBalance());

  const list = balance
    .get('list')
    .filter(item => item.get('status') === ENABLE)
    .map(e => e.get('symbol'));

  for (let i = 0; i < list.size; i += 1) {
    // dispatch actions
    yield put(
      loadBalance({
        coin: list.get(i)
      })
    );
  }
}

export function* handlingLoadBalance({
  payload
}: {
  payload: LoadbalacePayload
}) {
  debug(`load ${payload.coin} balance`);
  let balanceRequest;
  let feeRequest;
  try {
    // if (payload.coin === 'BEER') {
    //   throw new Error('test some error');
    // }

    balanceRequest = api.myBalance(payload);
    feeRequest = api.getfee({
      coin: payload.coin
    });
    const balanceReponse = yield balanceRequest;
    const result = yield feeRequest;
    if (DISABLE_COINS.indexOf(payload.coin) === -1) {
      yield put(
        loadBalanceSuccess({
          coin: payload.coin,
          address: balanceReponse.address,
          balance: floor(balanceReponse.balance, 8),
          fee: floor(result.txfee, 8)
        })
      );
    }
  } catch (err) {
    debug(`loading ${payload.coin} balance error: ${err.message}`);
    yield put(
      loadBalanceError({
        context: {
          action: BALANCE_LOAD,
          params: payload
        },
        type: 'RPC',
        message: err.message
      })
    );
  } finally {
    if (yield cancelled()) {
      debug(`loading ${payload.coin} balance cancelled`);
      if (balanceRequest && balanceRequest[CANCEL]) {
        balanceRequest[CANCEL]();
      }
      if (feeRequest && feeRequest[CANCEL]) {
        feeRequest[CANCEL]();
      }
    }
  }
}

export function* handlingLoadBalanceError({ error }) {
  debug(`handling load balance error: ${error.message}`);
  yield put(openSnackbars(error.message));
}
