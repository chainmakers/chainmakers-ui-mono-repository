// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import listenForLoadingElectrums, { loadElectrum } from '../electrums';
import { addElectrum } from '../../actions';
import data from '../../../__tests__/app-state.json';
import electrum from '../../../__tests__/electrum.json';
import getfee from '../../../__tests__/getfee.json';

const TIMEOUT = 20 * 1000;

describe('containers/App/saga/electrums/listenForLoadingElectrums', () => {
  it(
    'should handle listenForLoadingElectrums correctly',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        listenForLoadingElectrums
      ).done;

      expect(dispatched).toEqual([
        {
          payload: {
            txfee: 1000,
            urls: [
              'bch.imaginary.cash:50001',
              'electroncash.dk:50001',
              'electrum.imaginary.cash:50001',
              'abc1.hsmiths.com:60001'
            ],
            active: 0,
            rpcport: 33333,
            name: 'Bitcoin Cash',
            wiftype: 128,
            market_cap: 2197468013,
            coin: 'BCH',
            p2shtype: 5,
            txversion: 4,
            marketcap: 0,
            pubtype: 0,
            symbol: 'BCH',
            id: 10
          },
          type: 'atomicapp/App/ELECTRUM_ADD'
        }
      ]);
      expect(saga).toEqual(undefined);
      done();
    },
    TIMEOUT
  );
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
            cb(null, electrum);
          }
          if (method === 'getfee') {
            cb(null, getfee);
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
            balance: 6716.3433391,
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
