// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import { put } from 'redux-saga/effects';
import api from '../../../../lib/barter-dex-api';
import listenForLoadingElectrums, { loadElectrum } from '../electrums';
import { addElectrum } from '../../actions';
import data from '../../../__tests__/app-state.json';

const TIMEOUT = 20 * 1000;

describe('containers/App/saga/electrums/listenForLoadingElectrums', () => {
  it('should handle listenForLoadingElectrums correctly', done => {
    const gen = listenForLoadingElectrums();
    expect(gen.next().value).toEqual(
      put(
        addElectrum({
          coin: 'PIZZA',
          name: 'Pizza',
          asset: 'PIZZA',
          txversion: 4,
          rpcport: 11608,
          urls: ['electrum1.cipig.net:10024', 'electrum2.cipig.net:10024'],
          active: 1,
          market_cap: -2
        })
      )
    );
    expect(gen.next().value).toEqual(
      put(
        addElectrum({
          coin: 'BEER',
          name: 'Beer',
          asset: 'BEER',
          txversion: 4,
          rpcport: 8923,
          urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
          active: 1,
          market_cap: -1
        })
      )
    );
    done();
  });
});

describe('containers/App/saga/electrums/loadElectrum', () => {
  const TEST_URL = 'http://127.0.0.1:7783';
  api.setUserpass('userpass');
  it(
    'should handle loadElectrum correctly',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);
          if (method === 'electrum') {
            cb(null, {
              address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
              balance: 6502.66989074,
              coin: 'BEER'
            });
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
        loadElectrum,
        addElectrum({
          coin: 'BEER',
          name: 'Beer',
          asset: 'BEER',
          txversion: 4,
          rpcport: 8923,
          urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
          active: 1,
          market_cap: -1
        })
      ).done;

      expect(dispatched).toEqual([
        {
          type: 'atomicapp/App/ELECTRUM_ADD_SUCCESS',
          payload: {
            coin: 'BEER',
            address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
            balance: 6502.66989074,
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
      const store = fromJS(data);

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
        loadElectrum,
        addElectrum({
          coin: 'BEER',
          name: 'Beer',
          asset: 'BEER',
          txversion: 4,
          rpcport: 8923,
          urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022'],
          active: 1,
          market_cap: -1
        })
      ).done;

      expect(dispatched).toEqual([
        {
          error: {
            context: {
              action: 'atomicapp/App/ELECTRUM_ADD',
              params: {
                active: 1,
                asset: 'BEER',
                coin: 'BEER',
                market_cap: -1,
                name: 'Beer',
                rpcport: 8923,
                txversion: 4,
                urls: ['electrum1.cipig.net:10022', 'electrum2.cipig.net:10022']
              }
            },
            message: 'Request failed with status code 500',
            type: 'RPC'
          },
          type: 'atomicapp/App/ELECTRUM_ADD_ERROR'
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
