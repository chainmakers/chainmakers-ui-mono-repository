// @flow
// https://github.com/sotojuan/saga-login-flow/blob/master/app/sagas/index.js
import ipc from 'electron-better-ipc';
import { take, race, call, put } from 'redux-saga/effects';
import { takeFirst } from 'barterdex-rssm';
import api from '../../lib/barter-dex-api';
import { open } from '../../utils/db';
import { LOGIN, LOGOUT } from '../App/constants';
import { loginSuccess, loginError } from '../App/actions';

const debug = require('debug')('atomicapp:containers:LoginPage:saga');

export function* authorize(passphrase: string) {
  try {
    debug(`authorize is running`);
    const data = yield call([ipc, 'callMain'], 'marketmaker:start', passphrase);

    if (data.ok === 'failed') {
      throw new Error(data.message);
    }

    api.setUserpass(passphrase);
    yield call([api, 'waitUntilReady']);
    const userpass = api.getUserpass();
    // const db = open(userpass);
    open(userpass);

    return data;
  } catch (err) {
    yield put(
      loginError({
        context: {
          action: LOGIN,
          params: { passphrase }
        },
        type: 'RPC',
        message: err.message
      })
    );
    return false;
  }
}

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
    yield put(loginSuccess());
  }
}

export default function* root() {
  yield takeFirst(LOGIN, loginFlow);
}

// FIXME: only for test, remove this soon
window.api = api;
