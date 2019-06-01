// @flow
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from '../../../../lib/barter-dex-api';
import { setNewOrder } from '../../actions';
import data from '../../../__tests__/app-state.json';
import setprice from '../../../__tests__/setprice.json';
import listenForCreatingNewOrder from '../order';
import {
  APP_STATE_NAME,
  NEW_ORDER_SET_SUCCESS,
  NEW_ORDER_SET,
  NEW_ORDER_SET_ERROR,
  NEW_ORDER_SET_SKIP,
  ORDERBOOK_LOAD
} from '../../constants';

const store = fromJS(data);

const TEST_URL = 'http://127.0.0.1:7783';

describe('containers/OrderPage/saga/order', () => {
  api.setUserpass('userpass');

  const payload = setprice;

  it('should handle listenForCreatingNewOrder correctly', async done => {
    const dispatched = [];

    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .post('/', () => true)
      .reply(200, (uri, body, cb) => {
        const { method } = JSON.parse(body);

        if (method === 'setprice') {
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
      listenForCreatingNewOrder,
      setNewOrder()
    ).done;

    expect(dispatched).toEqual([
      { type: ORDERBOOK_LOAD },
      {
        type: NEW_ORDER_SET_SUCCESS
      }
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
});