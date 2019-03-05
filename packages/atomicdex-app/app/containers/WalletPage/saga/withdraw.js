// @flow
// @docs
// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import { put } from 'redux-saga/effects';
import api from '../../../lib/barter-dex-api';
import { openSnackbars } from '../../Snackbars/actions';
import { loadWithdrawBalanceSuccess } from '../../App/actions';
import { loadWithdrawSuccess, loadWithdrawError } from '../actions';
import { WITHDRAW_LOAD } from '../constants';

const debug = require('debug')('atomicapp:containers:WalletPage:saga:withdraw');

export default function* loadWithdrawProcess({ payload }) {
  debug(`withdraw ${payload.coin} coin`);
  try {
    const { amount, address, coin } = payload;
    const sendparams = {
      coin,
      to: address,
      amount: Number(amount)
    };

    const resultWithdraw = yield api.withdraw(sendparams);
    // eslint-disable-next-line camelcase
    const { tx_hex, fee_details } = resultWithdraw;

    const sendrawtx = {
      coin,
      tx_hex
    };
    const resultSendrawtx = yield api.sendrawtransaction(sendrawtx);
    debug(`resultSendrawtx = ${resultSendrawtx}`);

    // eslint-disable-next-line no-param-reassign
    payload.amount += fee_details.amount;

    yield put(openSnackbars('Successful withdrawal'));
    yield put(loadWithdrawBalanceSuccess(payload));
    return yield put(loadWithdrawSuccess(payload));
  } catch (err) {
    debug(`withdraw ${payload.coin} coinerror: ${err.message}`);
    yield put(openSnackbars(`Withdrawal: ${err.message}`));
    return yield put(
      loadWithdrawError({
        context: {
          action: WITHDRAW_LOAD,
          params: payload
        },
        type: 'RPC',
        message: err.message
      })
    );
  }
}
