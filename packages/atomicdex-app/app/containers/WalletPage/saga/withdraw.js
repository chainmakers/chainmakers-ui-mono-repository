// @flow
// @docs
// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import React from 'react';
import { shell } from 'electron';
import { put } from 'redux-saga/effects';
import api from '../../../lib/barter-dex-api';
import explorer from '../../../lib/explorer';
import { openSnackbars } from '../../Snackbars/actions';
import { loadWithdrawBalanceSuccess } from '../../App/actions';
import { loadWithdrawSuccess, loadWithdrawError } from '../actions';
import { WITHDRAW_LOAD } from '../constants';

const debug = require('debug')('atomicapp:containers:WalletPage:saga:withdraw');

export function generateMessage(txHash, coin) {
  const txid = explorer.tx(txHash, coin);
  return (
    <>
      Successful withdrawal. Click{' '}
      <a
        style={{ color: '#fff' }}
        href={txid}
        onClick={(evt: SyntheticInputEvent<>) => {
          evt.preventDefault();
          // https://github.com/electron/electron/blob/master/docs/api/shell.md#shellopenexternalurl
          shell.openExternal(evt.target.href);
        }}
      >
        here
      </a>{' '}
      to open tx in explorer.
    </>
  );
}

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

    // eslint-disable-next-line camelcase
    const { tx_hash } = yield api.sendrawtransaction(sendrawtx);
    debug(`tx_hash = ${tx_hash}`);

    // eslint-disable-next-line no-param-reassign
    payload.amount += fee_details.amount;

    yield put(openSnackbars(generateMessage(tx_hash, coin)));
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
