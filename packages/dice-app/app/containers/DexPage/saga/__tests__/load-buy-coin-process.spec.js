// https://www.jamestease.co.uk/blether/mock-es6-imports-with-jest
// https://redux-saga.js.org/docs/advanced/Testing.html
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from '../../../../lib/barter-dex-api';
import loadBuyCoinProcess from '../load-buy-coin-process';
import { LOAD_BUY_COIN_SUCCESS } from '../../constants';
import data from '../../../__tests__/app-state.json';
import {
  listunspentstep1,
  listunspentstep2,
  buy1,
  buy2,
  buyAppropriateError
} from './fake-data';

const TEST_URL = 'http://127.0.0.1:7783';

const TIMEOUT = 20 * 1000;

describe('containers/DexPage/saga/load-buy-coin-process', () => {
  api.setUserpass('userpass');
  // Scenario: Normal swap
  it(
    'should handle loadBuyCoinProcess correctly',
    async done => {
      let listunspentstep = 0;
      let buystep = 0;
      // const scope = nock(TEST_URL)
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);

          if (method === 'listunspent' && listunspentstep === 0) {
            listunspentstep = 1;
            cb(null, listunspentstep2);
          }

          if (method === 'buy' && buystep === 0) {
            buystep = 1;
            cb(null, buy2);
          }
        });

      const dispatched = [];

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => fromJS(data)
        },
        loadBuyCoinProcess,
        {
          payload: {
            basecoin: 'COQUI',
            paymentcoin: 'BEER',
            amount: 10
          },
          time: 0
        }
      ).done;

      expect(saga).toEqual(1);
      expect(dispatched).toEqual([
        {
          type: LOAD_BUY_COIN_SUCCESS,
          payload: buy2.pending
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );
  // Scenario: Auto splitting
  it(
    'should handle loadBuyCoinProcess correctly (Auto splitting)',
    async done => {
      let listunspentstep = 0;
      let buystep = 0;
      // const scope = nock(TEST_URL)
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);

          if (method === 'listunspent' && listunspentstep === 0) {
            listunspentstep = 1;
            cb(null, listunspentstep1);
          } else if (method === 'listunspent' && listunspentstep === 1) {
            listunspentstep = 2;
            cb(null, listunspentstep2);
          }

          if (method === 'buy' && buystep === 0) {
            buystep = 1;
            cb(null, buy1);
          } else if (method === 'buy' && buystep === 1) {
            buystep = 2;
            cb(null, buy2);
          }
        });

      const dispatched = [];

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => fromJS(data)
        },
        loadBuyCoinProcess,
        {
          payload: {
            basecoin: 'COQUI',
            paymentcoin: 'BEER',
            amount: 10
          },
          time: 0
        }
      ).done;

      expect(saga).toEqual(1);
      expect(dispatched).toEqual([
        {
          type: LOAD_BUY_COIN_SUCCESS,
          payload: buy2.pending
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );

  // Scenario: Cant find a deposit that is close enough in size
  it(
    'should dispatch appropriate error when handle loadBuyCoinProcess',
    async done => {
      let listunspentstep = 0;
      let buystep = 0;
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);

          if (method === 'listunspent' && listunspentstep === 0) {
            listunspentstep = 1;
            cb(null, listunspentstep1);
          } else if (method === 'listunspent' && listunspentstep === 1) {
            listunspentstep = 2;
            cb(null, listunspentstep2);
          }

          if (method === 'buy' && buystep === 0) {
            buystep = 1;
            cb(null, buy1);
          } else if (method === 'buy' && buystep === 1) {
            buystep = 2;
            cb(null, buyAppropriateError);
          }
        });

      const dispatched = [];

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => fromJS(data)
        },
        loadBuyCoinProcess,
        {
          payload: {
            basecoin: 'COQUI',
            paymentcoin: 'BEER',
            amount: 10
          },
          time: 0
        }
      ).done;

      expect(saga).toEqual(1);
      expect(dispatched).toEqual([
        {
          error: {
            message: 'Please try a different amount to pay (1/2 or 2x)'
          },
          type: 'atomicapp/DexPage/LOAD_BUY_COIN_ERROR'
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );
});
