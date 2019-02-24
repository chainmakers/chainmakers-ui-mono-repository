// @flow
import ipc from 'electron-better-ipc';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../../../lib/barter-dex-api';
import { routes } from '../../../constants';
import { close } from '../../../utils/db';

const debug = require('debug')('atomicapp:containers:App:saga:logout');

export default function* logoutFlow() {
  debug(`watch logout flow`);
  api.resetUserpass();
  close();
  yield put(push(routes.LOGIN));
  yield call([ipc, 'callMain'], 'marketmaker:stop');
}
