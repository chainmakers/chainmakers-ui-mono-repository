import swal from 'sweetalert';
// import { put, call, select, cancel, cancelled } from 'redux-saga/effects';
import { put, call, select, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import {
  makeSelectBalanceEntities
} from '../../App/selectors';
import { loadBuyCoinError, loadBuyCoinSuccess } from '../actions';
import { makeSelectPricesEntities } from '../selectors';
import { NUMCOIN, APPROPRIATE_ERROR_UTXOS } from '../constants';
import { floor } from '../utils';

const debug = require('debug')(
  'atomicapp:containers:DexPage:saga:load-buy-coin-process'
);

const intervalTime = 45 * 1000; // 45s
// const intervalTime = 15 * 1000; // 15s

export default function* loadBuyCoinProcess({ payload, time = intervalTime }) {
  try {
    // step one: load user data
    const balances = yield select(makeSelectBalanceEntities());

    const { basecoin, paymentcoin, amount } = payload;
    const paymentsmartaddress = balances.getIn([paymentcoin, 'address']);
    const basesmartaddress = balances.getIn([basecoin, 'address']);

    // step two: load balance
    const balance = balances.get(paymentcoin);
    const fee = floor(balance.get('fee'), 8);

    // step three: load best price
    const prices = yield select(makeSelectPricesEntities());
    const price = prices.find(c => c.get('rel') === paymentcoin);

    // step four: check balance
    const relvolume = floor(Number(amount * price.get('price')), 8);
    const dexfee = floor(relvolume / 777, 8);
    if (
      relvolume * NUMCOIN + 2 * dexfee * NUMCOIN + fee * NUMCOIN >=
      Number(balance.get('balance') * NUMCOIN).toFixed(0)
    ) {
      throw new Error('Not enough balance!');
    }

    const isSplittingTheFund = false;
    // const startTime = Date.now();

    // while (true) {
    // const durationTime = Date.now() - startTime;
    // if (durationTime > 20 * 1000) {
    //   debug('cancel');
    //   yield cancel();
    // }

    // step five: get listunspent data
    const unspent = yield call([api, 'listunspent'], {
      coin: paymentcoin,
      address: paymentsmartaddress
    });

    // if (unspent.length < 2) {
    //   // splitting utxos
    //   debug('splitting utxos');
    //   if (!isSplittingTheFund) {
    //     // FIXED ME: This is UI code. We should move it to somewhere else (react component).
    //     swal(
    //       'Splitting Procedure',
    //       'You will need at least 2 UTXOs to perform your swap. We are trying to split it for you. Dont turn off the application.'
    //     );
    //     const buyparams = {
    //       base: basecoin,
    //       rel: paymentcoin,
    //       relvolume: +relvolume.toFixed(8),
    //       price: +price.get('bestPrice').toFixed(8)
    //     };
    //     const result = yield call([api, 'buy'], buyparams);

    //     debug('UTXO autosplit TX INFO:', result);
    //     if (result.error) {
    //       throw new Error(result.error);
    //     }
    //     isSplittingTheFund = true;
    //   }
    // } else {
    //   debug('ready to buy');
    const buyparams = {
      base: basecoin,
      rel: paymentcoin,
      relvolume: +relvolume.toFixed(8),
      price: +price.get('bestPrice').toFixed(8)
    };

    const result = yield call([api, 'buy'], buyparams);

    if (result.error) {
      if (result.error === APPROPRIATE_ERROR_UTXOS) {
        throw new Error('Please try a different amount to pay (1/2 or 2x)');
      }
      throw new Error(result.error);
    }
    if (result.pending) {
      result.pending.bobsmartaddress = paymentsmartaddress;
      result.pending.requested = {
        bobAmount: amount,
        aliceAmount: amount * price.get('bestPrice')
      };
      result.pending.alicesmartaddress = basesmartaddress;
      return yield put(loadBuyCoinSuccess(result.pending));
    }
    // }
    yield call(delay, time);
    // }
  } catch (err) {
    return yield put(loadBuyCoinError(err.message));
  } finally {
    if (yield cancelled()) {
      debug('load buy coin process cancelled');
    }
  }
}
