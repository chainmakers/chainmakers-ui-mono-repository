// @flow

import { take, put } from 'redux-saga/effects';
import { openSnackbars } from '../../Snackbars/actions';
import { KMDICE_BETTING_START_ERROR } from '../constants';
import type { ErrorRPCType } from '../schema';

const debug = require('debug')(
  'kmdice:containers:DicePage:saga:handlingBettingError'
);

export default function* handlingBettingError() {
  while (true) {
    const { payload }: { payload: ErrorRPCType } = yield take(
      KMDICE_BETTING_START_ERROR
    );
    debug(`get betting error ${payload.message}`);
    yield put(openSnackbars(payload.message));
  }
}
