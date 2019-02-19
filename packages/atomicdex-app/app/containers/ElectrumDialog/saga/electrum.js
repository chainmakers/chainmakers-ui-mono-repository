// @flow
import { put, select } from 'redux-saga/effects';
import type { AddElectrumPayload } from '../schema';
import { makeSelectSupportedCoinsEntities } from '../../App/selectors';
import { openSnackbars } from '../../Snackbars/actions';
import { addElectrum } from '../../App/actions';

const debug = require('debug')(
  'atomicapp:containers:ElectrumDialog:saga:electrums'
);

export default function* listenForAddingElectrums({
  payload
}: {
  payload: AddElectrumPayload
}) {
  debug(`listen for adding electrums`, payload);
  const supportedCoinsEntities = yield select(
    makeSelectSupportedCoinsEntities()
  );
  const { coins } = payload;
  for (let i = 0; i < coins.length; i += 1) {
    const config = supportedCoinsEntities.get(coins[i]);
    if (config) {
      yield put(addElectrum(config.toJS()));
    } else {
      debug(`ERROR: not found ${coins[i]} config`);
      yield put(
        openSnackbars(
          `Not Found - ${
            coins[i]
          } config is missing. Please contact to maintainer to fix issue.`
        )
      );
    }
  }
}
