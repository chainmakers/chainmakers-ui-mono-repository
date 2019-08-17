import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import { loadPrice } from '../load-prices-process';
import data from '../../../__tests__/app-state.json';
import orderbook from '../../../__tests__/orderbook.json';

const TEST_URL = 'http://127.0.0.1:7783';

const TIMEOUT = 20 * 1000;

describe('containers/DexPage/saga/load-prices-process', () => {
  api.setUserpass('userpass');
  // Scenario: Normal swap
  it(
    'should handle loadPrice correctly',
    async done => {
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, b, cb) => {
          const body = JSON.parse(b);

          expect(body).toEqual({
            userpass:
              '05d49692b755f99c4504b510418efeeeebfd466892540f27acf9a31a326d6504',
            base: 'KMD',
            rel: 'BTC',
            method: 'orderbook'
          });
          if (body.method === 'orderbook') {
            cb(null, orderbook);
          } else {
            cb(new Error('unexpected api'));
          }
        });

      const dispatched = [];

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => fromJS(data)
        },
        loadPrice,
        'BTC'
      ).done;

      expect(saga).toEqual(1);
      expect(dispatched).toEqual([
        {
          payload: {
            coin: 'BTC',
            address: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1',
            price: 11751.74655523,
            numutxos: 0,
            avevolume: 0.0,
            maxvolume: 0.10416148,
            depth: 0.0,
            pubkey:
              '1bb83b58ec130e28e0a6d5d2acf2eb01b0d3f1670e021d47d31db8a858219da8',
            age: 9,
            zcredits: 0,
            base: 'KMD',
            bestPrice: 11869.26402078,
            rel: 'BTC'
          },
          type: 'atomicapp/DexPage/LOAD_BEST_PRICE'
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    TIMEOUT
  );
});
