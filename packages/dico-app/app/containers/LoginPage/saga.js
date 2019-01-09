// https://github.com/sotojuan/saga-login-flow/blob/master/app/sagas/index.js
import { all, take, race, call, put } from 'redux-saga/effects';
import takeFirst from '../../utils/sagas/take-first';
import { LOGIN, LOGOUT } from '../App/constants';
import { loginSuccess, loginError } from '../App/actions';
import api from '../../lib/barter-dex-api';
import getConfig from '../../utils/config';

const debug = require('debug')('dicoapp:containers:LoginPage:saga');

const config = getConfig();

export function* authorize(passphrase) {
  try {
    debug(`authorize is running`);
    const data = yield call([api, 'login'], passphrase);
    const servers = config.get('marketmaker.electrums');

    const requests = [];
    for (let i = 0; i < servers.length; i += 1) {
      requests.push(call([api, 'addServer'], servers[i]));
    }

    const result = yield all(requests);
    result.forEach(element => {
      if (element.result === 'success') {
        debug(`adding ${element.ipaddr}:${element.port} is successfully`);
      }
      if (element.error) {
        debug(`${element.ipaddr}:${element.port} ${element.error}`);
      }
    });
    return data;
  } catch (err) {
    yield put(
      loginError({
        message: err.message
      })
    );
    return false;
  }
}

/**
 * Root saga manages watcher lifecycle
 */
// export default function* userData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOGIN, loginProcess);
// }

export function* loginFlow({ payload }) {
  debug(`login flow`);
  const { passphrase } = payload;
  // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
  // lead to a race condition. This is unlikely, but just in case, we call `race` which
  // returns the "winner", i.e. the one that finished first
  const winner = yield race({
    auth: call(authorize, passphrase),
    logout: take(LOGOUT)
  });

  if (winner.auth) {
    yield put(loginSuccess(winner.auth));
    // forwardTo('/dashboard') // Go to dashboard page
  }
}

export default function* root() {
  yield takeFirst(LOGIN, loginFlow);
}
