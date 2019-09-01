// @flow
/* eslint no-param-reassign: ["error", { "props": false }] */
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from 'utils/barterdex-api';
import { loadOrderbook, reloadOrderbook } from '../../actions';
import data from '../../../__tests__/app-state.json';
import orderbook from '../../../__tests__/orderbook.json';
import myOrders from '../../../__tests__/my_orders.json';
import listenForLoadingOrderbook, {
  listenForReloadingOrderbook
} from '../orderbook';
import {
  APP_STATE_NAME,
  ORDERBOOK_LOAD,
  ORDERBOOK_LOAD_ERROR,
  ORDERBOOK_LOAD_SKIP,
  ORDERBOOK_LOAD_SUCCESS,
  ORDER_BOB_SIDE,
  ORDER_ALICE_SIDE,
  ORDERBOOK_RELOAD_SUCCESS
} from '../../constants';

const store = fromJS(data);

const TEST_URL = 'http://127.0.0.1:7783';

describe('containers/OrderPage/saga/orderbook', () => {
  api.setUserpass('userpass');

  const payload = Object.assign({}, orderbook);
  const { base, rel } = payload;

  payload.bids.map(v => {
    v.base = base;
    v.rel = rel;
    v.id = `${v.address}-${rel}-${base}`;
    v.type = ORDER_ALICE_SIDE;
    if (v.address === 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu') {
      v.uuid = 'eb211104-b6d9-46ea-aba9-c645a5570bb4';
    }
    return v;
  });
  payload.asks.map(v => {
    v.base = base;
    v.rel = rel;
    v.id = `${v.address}-${rel}-${base}`;
    v.type = ORDER_BOB_SIDE;
    return v;
  });

  it('should handle listenForLoadingOrderbook correctly', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);

        if (method === 'orderbook') {
          cb(null, orderbook);
        } else if (method === 'my_orders') {
          cb(null, myOrders);
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
        type: ORDERBOOK_LOAD_SUCCESS,
        payload
      }
    ]);
    expect(saga).toEqual(1);

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
            action: ORDERBOOK_LOAD
          },
          message: 'Request failed with status code 500',
          type: 'RPC'
        },
        type: ORDERBOOK_LOAD_ERROR
      }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });

  it('should skip when handle listenForLoadingOrderbook', async done => {
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
        getState: () =>
          store.setIn([APP_STATE_NAME, 'orderbook', 'deposit'], null)
      },
      listenForLoadingOrderbook,
      loadOrderbook()
    ).done;

    expect(dispatched).toEqual([
      {
        type: ORDERBOOK_LOAD_SKIP
      }
    ]);
    expect(saga).toEqual(1);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });

  it('should handle listenForReloadingOrderbook correctly', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);

        if (method === 'orderbook') {
          cb(null, orderbook);
        } else if (method === 'my_orders') {
          cb(null, myOrders);
        } else {
          cb(new Error('error message'));
        }
      });

    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForReloadingOrderbook,
      reloadOrderbook(),
      2
    ).done;

    expect(dispatched).toEqual([
      {
        type: ORDERBOOK_LOAD_SUCCESS,
        payload
      },
      {
        type: ORDERBOOK_RELOAD_SUCCESS
      }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });
});
