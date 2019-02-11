// @flow
import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { routes } from '../../../constants';

const debug = require('debug')('atomicapp:containers:App:saga:login');

export function handlingLoginError({ error }) {
  debug(`handling login error: ${error.message}`);
}

export function* handlingLoginSuccess() {
  yield put(push(routes.HOME));
}
