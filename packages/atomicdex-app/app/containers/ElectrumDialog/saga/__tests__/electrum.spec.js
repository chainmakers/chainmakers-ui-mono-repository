// @flow
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import data from '../../../__tests__/app-state.json';
import listenForAddingElectrums, {
  listenForRemovingElectrums
} from '../electrum';

const store = fromJS(data);

describe('containers/ElectrumDialog/saga/electrum/listenForRemovingElectrums', () => {
  it('should handle listenForRemovingElectrums correctly', async done => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForRemovingElectrums,
      {
        payload: {
          coins: ['BTC', 'ZEC']
        }
      }
    ).done;
    expect(saga).toEqual(undefined);
    expect(dispatched).toEqual([
      { payload: { coin: 'BTC' }, type: 'atomicapp/App/ELECTRUM_REMOVE' },
      { payload: { coin: 'ZEC' }, type: 'atomicapp/App/ELECTRUM_REMOVE' }
    ]);
    done();
  });
});

describe('containers/ElectrumDialog/saga/electrum/listenForAddingElectrums', () => {
  it('should dispatch loadBalance action', async done => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForAddingElectrums,
      {
        payload: {
          coins: ['LTC', 'BTC', 'BCH']
        }
      }
    ).done;
    expect(saga).toEqual(undefined);
    expect(dispatched).toEqual([
      { payload: { coin: 'LTC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'BTC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'BCH' }, type: 'atomicapp/App/BALANCE_LOAD' }
    ]);
    done();
  });

  it('should dispatch loadElectrum action', async done => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForAddingElectrums,
      {
        payload: {
          coins: ['QTUM', 'BTC', 'BCH']
        }
      }
    ).done;
    expect(saga).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        payload: {
          coin: 'QTUM',
          active: 0,
          id: 11,
          market_cap: 167615207,
          marketcap: 0,
          name: 'Qtum',
          p2shtype: 50,
          pubtype: 58,
          rpcport: 3889,
          symbol: 'QTUM',
          txfee: 400000,
          servers: [
            { url: 's4.qtum.info:50001' },
            { url: 's5.qtum.info:50001' },
            { url: 's7.qtum.info:50001' },
            { url: 's8.qtum.info:50001' }
          ],
          wiftype: 128
        },
        type: 'atomicapp/App/ELECTRUM_ADD'
      },
      { payload: { coin: 'BTC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'BCH' }, type: 'atomicapp/App/BALANCE_LOAD' }
    ]);
    done();
  });

  it('should throw error', async done => {
    const dispatched = [];
    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForAddingElectrums,
      {
        payload: {
          coins: ['CHX', 'BTC', 'BCH']
        }
      }
    ).done;
    expect(saga).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        payload: {
          message:
            'Not Found - CHX config is missing. Please contact to maintainer to fix issue.'
        },
        type: 'atomicapp/BuyPage/SNACKBARS_OPEN'
      },
      { payload: { coin: 'BTC' }, type: 'atomicapp/App/BALANCE_LOAD' },
      { payload: { coin: 'BCH' }, type: 'atomicapp/App/BALANCE_LOAD' }
    ]);
    done();
  });
});
