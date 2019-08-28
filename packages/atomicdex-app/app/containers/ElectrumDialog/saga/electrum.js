// @flow
import { put, select } from 'redux-saga/effects';
import type { ElectrumPayload } from '../schema';
import {
  makeSelectBalance,
  makeSelectSupportedCoinsEntities
} from '../../App/selectors';
import { openSnackbars } from '../../Snackbars/actions';
import { addElectrum, loadBalance, removeElectrum } from '../../App/actions';

const debug = require('debug')(
  'atomicapp:containers:ElectrumDialog:saga:electrums'
);

export function* listenForRemovingElectrums({
  payload
}: {
  payload: ElectrumPayload
}) {
  debug(`listen for removing electrums`, payload);
  const { coins } = payload;

  for (let i = 0; i < coins.length; i += 1) {
    yield put(removeElectrum(coins[i]));
  }
}

export default function* listenForAddingElectrums({
  payload
}: {
  payload: ElectrumPayload
}) {
  debug(`listen for adding electrums`, payload);

  const balance = yield select(makeSelectBalance());

  const list = balance.get('list');

  const { coins } = payload;

  for (let i = 0; i < coins.length; i += 1) {
    const status = list.find(item => item.get('symbol') === coins[i]);
    if (status) {
      yield put(
        loadBalance({
          coin: coins[i]
        })
      );
    } else {
      const supportedCoinsEntities = yield select(
        makeSelectSupportedCoinsEntities()
      );
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
}
