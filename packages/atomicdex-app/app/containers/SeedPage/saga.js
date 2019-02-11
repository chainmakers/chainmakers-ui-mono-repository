// @flow
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { generateWif } from 'barterdex-utilities';
import { openSnackbars } from '../Snackbars/actions';
import { GENERATE_PASSPHRASE, OPEN_WIF_EXPANSION } from './constants';
import { makeSelectWifExpansion, makeSelectPassphrase } from './selectors';
import { generateWif as generateWifAction } from './actions';

const debug = require('debug')('atomicapp:containers:SeedPage:saga');

export function* generateWifProcessWithPassPhrase({ payload }) {
  try {
    const wifExpansion = yield select(makeSelectWifExpansion());
    if (wifExpansion) {
      debug('generate wif');
      const wif = generateWif(payload.passphrase);
      return yield put(generateWifAction(wif));
    }
  } catch (err) {
    debug(err.message);
    yield put(openSnackbars(err.message));
  }
}

export function* generateWifProcessWithExpansion({ type }) {
  try {
    if (type === OPEN_WIF_EXPANSION) {
      debug('generate wif');
      const passphrase = yield select(makeSelectPassphrase());
      if (passphrase === '') return;
      const wif = generateWif(passphrase);
      return yield put(generateWifAction(wif));
    }
  } catch (err) {
    debug(err.message);
    yield put(openSnackbars(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    yield takeLatest(GENERATE_PASSPHRASE, generateWifProcessWithPassPhrase),
    yield takeLatest(OPEN_WIF_EXPANSION, generateWifProcessWithExpansion)
  ]);
}
