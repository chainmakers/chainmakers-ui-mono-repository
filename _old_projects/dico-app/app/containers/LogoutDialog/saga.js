import ipc from 'electron-better-ipc';
import { fork, take, put } from 'redux-saga/effects';
import { AGREE_LOGOUT_DIALOG } from './constants';
import { logout } from '../App/actions';

const debug = require('debug')('dicoapp:containers:LogoutDialog:saga');

export function* logoutFlow() {
  debug(`logout flow`);
  while (true) {
    // eslint-disable-next-line no-unused-vars
    const action = yield take(AGREE_LOGOUT_DIALOG);
    yield put(logout());
    yield ipc.callMain('marketmaker:restart');
  }
}

export default function* root() {
  yield fork(logoutFlow);
}
