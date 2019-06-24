// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import type { ErrorType } from '../../../schema';
import { BALANCE_LOAD } from '../../constants';
import { openSnackbars } from '../../../Snackbars/actions';
import { loadBalanceError, loadBalance } from '../../actions';
import listenForLoadingBalance, {
  handlingLoadBalanceError,
  handlingLoadBalance
} from '../balance';
import data from '../../../__tests__/app-state.json';
import balance from '../../../__tests__/balance.json';

const TIMEOUT = 20 * 1000;
const store = fromJS(data);

describe('containers/App/saga/balance/listenForLoadingBalance', () => {
  it('should handle listenForLoadingBalance correctly', async done => {
    const dispatched = [];
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
      { payload: { coin: 'ZEC' }, type: 'atomicapp/App/BALANCE_LOAD' },
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

describe('containers/App/saga/balance/handlingLoadBalance', () => {
  const TEST_URL = 'http://127.0.0.1:7783';
  api.setUserpass('userpass');
  it(
    'should handle handlingLoadBalance correctly',
    async done => {
      const dispatched = [];

      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);
          if (method === 'my_balance') {
            cb(null, balance);
          }
          if (method === 'getfee') {
            cb(null, {
              coin: 'BEER',
              txfee: 0.00001
            });
          }
        });

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        handlingLoadBalance,
        loadBalance({
          coin: 'BEER'
        })
      ).done;

      expect(dispatched).toEqual([
        {
          type: 'atomicapp/App/BALANCE_LOAD_SUCCESS',
          payload: {
            coin: 'BEER',
            address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
            balance: 6729.343289,
            fee: 0.00001
          }
        }
      ]);
      expect(saga).toEqual(undefined);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );
  it(
    'should handle throw new error',
    async done => {
      const dispatched = [];

      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          cb(new Error('new error message'));
        });

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        handlingLoadBalance,
        loadBalance({
          coin: 'BEER'
        })
      ).done;

      expect(dispatched).toEqual([
        {
          error: {
            context: {
              action: 'atomicapp/App/BALANCE_LOAD',
              params: { coin: 'BEER' }
            },
            message: 'Request failed with status code 500',
            type: 'RPC'
          },
          type: 'atomicapp/App/BALANCE_LOAD_ERROR'
        }
      ]);
      expect(saga).toEqual(undefined);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );
});
