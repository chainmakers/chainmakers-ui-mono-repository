// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import { put } from 'redux-saga/effects';
import api from '../../../lib/barter-dex-api';
import { loadWithdrawSuccess, loadWithdrawError } from '../actions';

const debug = require('debug')(
  'dicoapp:containers:App:saga:load-withdraw-process'
);

const numcoin = 100000000;

export default function* loadWithdrawProcess({ payload }) {
  try {
    const { amount, address, coin } = payload;

    let outputs = `[{${address}: ${Number(amount)}}]`;

    // eslint-disable-next-line no-eval
    outputs = JSON.stringify(eval(`(${outputs})`));

    const sendparams = {
      coin,
      outputs: JSON.parse(outputs)
    };

    const resultWithdraw = yield api.withdraw(sendparams);

    const { hex, txfee } = resultWithdraw;

    const sendrawtx = {
      coin,
      signedtx: hex
    };
    const resultSendrawtx = yield api.sendrawtransaction(sendrawtx);
    debug(`resultSendrawtx = ${resultSendrawtx}`);

    // eslint-disable-next-line no-param-reassign
    payload.amount += txfee / numcoin;

    return yield put(loadWithdrawSuccess(payload));
  } catch (err) {
    return yield put(loadWithdrawError(payload, err.message));
  }
}
