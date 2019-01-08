import { put, select, takeLatest } from 'redux-saga/effects';
import { GENERATE_PASSPHRASE, OPEN_WIF_EXPANSION } from './constants';
import { makeSelectWifExpansion, makeSelectPassphrase } from './selectors';
import { generateWif } from './utils';
import { generateWif as generateWifAction } from './actions';

const debug = require('debug')('atomicapp:containers:SeedPage:saga');

export function* generateWifProcessWithPassPhrase(action) {
  try {
    const wifExpansion = yield select(makeSelectWifExpansion());
    if (wifExpansion) {
      debug('generate wif');
      const { payload } = action;
      const wif = generateWif(payload.passphrase);
      return yield put(generateWifAction(wif));
    }
  } catch (err) {
    // FIXME: handling error
    debug(err.message);
  }
}

export function* generateWifProcessWithExpansion(action) {
  try {
    if (action.type === OPEN_WIF_EXPANSION) {
      debug('generate wif');
      const passphrase = yield select(makeSelectPassphrase());
      if (passphrase === '') return;
      const wif = generateWif(passphrase);
      return yield put(generateWifAction(wif));
    }
  } catch (err) {
    // FIXME: handling error
    debug(err.message);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* seedData() {
  yield takeLatest(GENERATE_PASSPHRASE, generateWifProcessWithPassPhrase);
  yield takeLatest(OPEN_WIF_EXPANSION, generateWifProcessWithExpansion);
}
