// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from '../../../../lib/barter-dex-api';
import { loadOrderbook } from '../../actions';
import data from '../../../__tests__/app-state.json';
import orderbook from '../../../__tests__/orderbook.json';
import listenForLoadingOrderbook from '../orderbook';

const store = fromJS(data);

const TEST_URL = 'http://127.0.0.1:7783';

describe('containers/OrderPage/saga/order', () => {
  api.setUserpass('userpass');

  const payload = orderbook;

  it('should handle listenForLoadingOrderbook correctly', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);

        if (method === 'orderbook') {
          cb(null, payload);
        } else {
          cb(new Error('error message'));
        }
      });

    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForLoadingOrderbook,
      loadOrderbook()
    ).done;

    expect(dispatched).toEqual([
      {
        type: 'atomicapp/OrdersPage/ORDERBOOK_LOAD_SUCCESS',
        payload
      }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });

  it('should throw error when handle listenForLoadingOrderbook', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        cb(new Error('message'));
      });

    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForLoadingOrderbook,
      loadOrderbook()
    ).done;

    expect(dispatched).toEqual([
      {
        payload: {
          message: 'Request failed with status code 500'
        },
        type: 'atomicapp/BuyPage/SNACKBARS_OPEN'
      },
      {
        error: {
          context: {
            action: 'atomicapp/OrdersPage/ORDERBOOK_LOAD'
          },
          message: 'Request failed with status code 500',
          type: 'RPC'
        },
        type: 'atomicapp/OrdersPage/ORDERBOOK_LOAD_ERROR'
      }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });
});
