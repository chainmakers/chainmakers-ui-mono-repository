// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from '../../../../lib/barter-dex-api';
import { setNewOrder, cancelNewOrder } from '../../actions';
import data from '../../../__tests__/app-state.json';
import setprice from '../../../__tests__/setprice.json';
import cancelorder from '../../../__tests__/cancel_order.json';
import listenForCreatingNewOrder, { listenForCancelOrder } from '../order';
import {
  APP_STATE_NAME,
  NEW_ORDER_SET_SUCCESS,
  NEW_ORDER_SET,
  NEW_ORDER_SET_ERROR,
  NEW_ORDER_SET_SKIP,
  ORDERBOOK_RELOAD,
  ORDER_ALICE_SITE,
  NEW_ORDER_CANCEL_SUCCESS
} from '../../constants';

const store = fromJS(data);

const TEST_URL = 'http://127.0.0.1:7783';

describe('containers/OrderPage/saga/order', () => {
  api.setUserpass('userpass');

  const payload = Object.assign({}, setprice.result);
  payload.address = 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu';
  payload.id = 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu-KMD-BTC';
  payload.type = ORDER_ALICE_SITE;

  it('should handle listenForCreatingNewOrder correctly', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);

        if (method === 'setprice') {
          cb(null, setprice);
        } else {
          cb(new Error('error message'));
        }
      });

    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForCreatingNewOrder,
      setNewOrder()
    ).done;

    expect(dispatched).toEqual([
      {
        type: NEW_ORDER_SET_SUCCESS,
        payload
      },
      { type: ORDERBOOK_RELOAD }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });

  it('should throw error when handle listenForCreatingNewOrder', async done => {
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
      listenForCreatingNewOrder,
      setNewOrder()
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
            action: NEW_ORDER_SET
          },
          message: 'Request failed with status code 500',
          type: 'RPC'
        },
        type: NEW_ORDER_SET_ERROR
      }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });

  it('should skip when handle listenForCreatingNewOrder', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);
        if (method === 'setprice') {
          cb(null, setprice);
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
      listenForCreatingNewOrder,
      setNewOrder()
    ).done;

    expect(dispatched).toEqual([
      {
        type: NEW_ORDER_SET_SKIP
      }
    ]);
    expect(saga).toEqual(1);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });

  it('should handle listenForCancelOrder correctly', async done => {
    const dispatched = [];
    const id = 'id';
    const uuid = 'uuid';
    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);

        if (method === 'cancel_order') {
          cb(null, cancelorder);
        } else {
          cb(new Error('error message'));
        }
      });

    const saga = await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => store
      },
      listenForCancelOrder,
      cancelNewOrder({
        id,
        uuid
      })
    ).done;

    expect(dispatched).toEqual([
      { type: NEW_ORDER_CANCEL_SUCCESS, payload: { id } }
    ]);
    expect(saga).toEqual(undefined);

    nock.cleanAll();
    nock.enableNetConnect();
    done();
  });
});
