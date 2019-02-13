// @flow
import { put, select } from 'redux-saga/effects';
import { makeSelectBalance } from '../../App/selectors';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:saga:retryActionProcess'
);

export default function* retryActionProcess({ payload }) {
  debug('retry action process');
  const balanceState = yield select(makeSelectBalance());
  const error = balanceState.getIn(['errors', payload.coin]);
  if (!error) {
    return debug('not found error');
  }
  const context = error.get('context').toJS();
  return yield put({
    type: context.action,
    payload: context.params
  });
}
