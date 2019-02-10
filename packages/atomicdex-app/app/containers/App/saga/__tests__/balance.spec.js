// @flow
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import data from '../../../__tests__/app-state.json';
import type { ErrorType } from '../../../schema';
import { BALANCE_LOAD } from '../../constants';
import { openSnackbars } from '../../../Snackbars/actions';
import { loadBalanceError } from '../../actions';
import listenForLoadingBalance, { handlingLoadBalanceError } from '../balance';

describe('containers/App/saga/balance/listenForLoadingBalance', () => {
  it('should handle listenForLoadingBalance correctly', async done => {
    const dispatched = [];
    const store = fromJS(data);
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForLoadingBalance
    ).done;
    expect(saga).toEqual(undefined);
    expect(dispatched).toEqual([
      { payload: { coin: 'BTC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'BCH' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'ZEC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'QTUM' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'KMD' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'CHIPS' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'VRSC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'EQL' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'COQUI' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'KMDICE' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'CHAIN' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'BEER' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'PIZZA' }, type: 'atomicapp/App/BALANCE_LOAD' }
    ]);
    done();
  });
});

describe('containers/App/saga/balance/handlingLoadBalanceError', () => {
  const error: ErrorType = {
    context: {
      action: BALANCE_LOAD,
      params: {
        coin: 'PIZZA'
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };

  it('should handle handlingLoadBalanceError correctly', async done => {
    const dispatched = [];
    const store = fromJS(data);
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      handlingLoadBalanceError,
      loadBalanceError(error)
    ).done;
    expect(saga).toEqual(undefined);
    expect(dispatched).toEqual([openSnackbars(error.message)]);
    done();
  });
});
