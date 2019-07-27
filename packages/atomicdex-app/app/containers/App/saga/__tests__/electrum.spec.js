// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import listenForLoadingElectrums, { loadElectrum } from '../electrums';
import { addElectrum } from '../../actions';
import data from '../../../__tests__/app-state.json';
import electrum from '../../../__tests__/electrum.json';
import enable from '../../../__tests__/enable.json';
import getfee from '../../../__tests__/get_trade_fee.json';

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
            servers: [
              { url: 'bch.imaginary.cash:50001' },
              { url: 'electroncash.dk:50001' },
              { url: 'electrum.imaginary.cash:50001' },
              { url: 'abc1.hsmiths.com:60001' }
            ],
            active: 0,
            rpcport: 33333,
            name: 'bch',
            fname: 'Bitcoin Cash',
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
          if (method === 'get_trade_fee') {
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
          servers: [
            { url: 'electrum1.cipig.net:10022' },
            { url: 'electrum2.cipig.net:10022' }
          ],
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
    'should handle ECR20 correctly',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);
          if (method === 'enable') {
            cb(null, enable);
          }
          if (method === 'get_trade_fee') {
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
          coin: 'ETH',
          name: 'eth',
          fname: 'Ethereum',
          etomic: '0x0000000000000000000000000000000000000000',
          urls: [
            'http://eth1.cipig.net:8555',
            'http://eth2.cipig.net:8555',
            'http://eth3.cipig.net:8555'
          ],
          swap_contract_address: '0x8500AFc0bc5214728082163326C2FF0C73f4a871',
          gas_station_url: 'https://ethgasstation.info/json/ethgasAPI.json',
          rpcport: 80,
          market_cap: 0,
          mm2: 1
        })
      ).done;

      expect(dispatched).toEqual([
        {
          type: 'atomicapp/App/ELECTRUM_ADD_SUCCESS',
          payload: {
            address: '0x4E85559f69fB6b6A1eaA9EeD689bcf62f0f50fd7',
            balance: 0,
            coin: 'ETH',
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
          servers: [
            { url: 'electrum1.cipig.net:10022' },
            { url: 'electrum2.cipig.net:10022' }
          ],
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
                servers: [
                  { url: 'electrum1.cipig.net:10022' },
                  { url: 'electrum2.cipig.net:10022' }
                ]
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
