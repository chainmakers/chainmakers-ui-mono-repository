// @flow
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import { addElectrum } from '../../../App/actions';
import { retryAction } from '../../actions';
import retryActionProcess from '../retryActionProcess';
import data from '../../../__tests__/app-state.json';

const TIME_OUT = 30 * 1000;

describe('containers/WalletPage/saga/retryActionProcess', () => {
  const coin = 'LTC';
  const store = fromJS(data);
  it(
    'should handle loadCoinTransactionsProcess correctly',
    async done => {
      try {
        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () => store
          },
          retryActionProcess,
          retryAction({ coin })
        ).done;

        expect(saga).toEqual(1);
        expect(dispatched).toEqual([
          addElectrum({
            txfee: 100000,
            servers: [
              { url: 'electrum1.cipig.net:10065' },
              { url: 'electrum2.cipig.net:10065' }
            ],
            active: 1,
            rpcport: 9332,
            name: 'Litecoin',
            wiftype: 176,
            market_cap: 2578993869,
            asset: 'LTC',
            coin: 'LTC',
            p2shtype: 5,
            txversion: 4,
            pubtype: 48
          })
        ]);

        done();
      } catch (err) {
        done.fail(err);
      }
    },
    TIME_OUT
  );

  it(
    'should not throw addElectrum action',
    async done => {
      try {
        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () =>
              store.setIn(['global', 'balance', 'errors', coin], null)
          },
          retryActionProcess,
          retryAction({ coin })
        ).done;

        expect(saga).toEqual(undefined);
        expect(dispatched).toEqual([]);

        done();
      } catch (err) {
        done.fail(err);
      }
    },
    TIME_OUT
  );
});
