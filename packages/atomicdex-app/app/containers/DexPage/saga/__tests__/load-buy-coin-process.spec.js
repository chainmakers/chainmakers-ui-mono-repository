// https://www.jamestease.co.uk/blether/mock-es6-imports-with-jest
// https://redux-saga.js.org/docs/advanced/Testing.html
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import loadBuyCoinProcess from '../load-buy-coin-process';
import { LOAD_BUY_COIN_SUCCESS } from '../../constants';
import data from '../../../__tests__/app-state.json';
import buy from '../../../__tests__/buy.json';

const TEST_URL = 'http://127.0.0.1:7783';

const TIMEOUT = 20 * 1000;

describe('containers/DexPage/saga/load-buy-coin-process', () => {
  api.setUserpass('userpass');

  // Scenario: Normal swap
  it(
    'should handle loadBuyCoinProcess correctly',
    async done => {
      let buystep = 0;
      // const scope = nock(TEST_URL)
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);
          if (method === 'buy' && buystep === 0) {
            buystep = 1;
            buy.result.expiration = 1556263778;
            cb(null, buy);
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
          payload: {
            action: 'Buy',
            alice: 'BEER',
            alicesmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
            base: 'BTC',
            base_amount: 0.5,
            basevalue: 0.5,
            bob: 'COQUI',
            bobsmartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
            dest_pub_key:
              '0000000000000000000000000000000000000000000000000000000000000000',
            expiration: 1556263778,
            method: 'request',
            quoteid: 0,
            rel: 'COQUI',
            rel_amount: 0.2,
            relvalue: 0.2,
            sender_pubkey:
              'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
            requested: {
              aliceAmount: 19.9000001,
              bobAmount: 10
            },
            requestid: 0,
            timeleft: 30,
            tradeid: '3ee41a9c-e963-4237-bcba-904b2bf519af',
            uuid: '3ee41a9c-e963-4237-bcba-904b2bf519af'
          }
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );
});
