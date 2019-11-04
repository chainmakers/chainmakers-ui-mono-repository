import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import data from './fake-data';
import { checkTimeoutEvent } from '../handle-timeout-event';
import { CHECK_TIMEOUT_EVENT, SWAP_TIMEOUT } from '../../constants';
import { SWAP_STATE_ZERO } from '../../../__tests__/fake-data';

const TIMEOUT = 10 * 100;

describe('containers/BuyPage/saga/handle-timeout-event', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  it(
    'should handle handleTimeoutEvent correctly',
    async done => {
      const dispatched = [];
      let store = fromJS(data);
      let processingList = store.getIn(['buy', 'swaps', 'processingList']);
      processingList = processingList.push(uuid);
      let entities = store.getIn(['buy', 'swaps', 'entities']);
      const entity = fromJS({
        id: tradeid,
        uuid,
        requestid,
        quoteid,
        expiration,
        bob,
        alice,
        bobamount: basevalue,
        aliceamount: relvalue,
        sentflags: [],
        status: 'pending'
      });
      entities = entities.set(uuid, entity);
      store = store.setIn(['buy', 'swaps', 'processingList'], processingList);
      store = store.setIn(['buy', 'swaps', 'entities'], entities);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        checkTimeoutEvent,
        {
          payload: {
            type: CHECK_TIMEOUT_EVENT
          }
        },
        1
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        {
          payload: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            bob,
            alice
          },
          type: SWAP_TIMEOUT
        }
      ]);

      done();
    },
    TIMEOUT
  );

  it(
    'should dispatch 2 timeout action',
    async done => {
      const dispatched = [];
      let store = fromJS(data);
      let processingList = store.getIn(['buy', 'swaps', 'processingList']);
      processingList = processingList.push(uuid);
      processingList = processingList.push(uuid);
      let entities = store.getIn(['buy', 'swaps', 'entities']);
      const entity = fromJS({
        id: tradeid,
        uuid,
        requestid,
        quoteid,
        expiration,
        bob,
        alice,
        bobamount: basevalue,
        aliceamount: relvalue,
        sentflags: [],
        status: 'pending'
      });
      entities = entities.set(uuid, entity);
      store = store.setIn(['buy', 'swaps', 'processingList'], processingList);
      store = store.setIn(['buy', 'swaps', 'entities'], entities);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        checkTimeoutEvent,
        {
          payload: {
            type: CHECK_TIMEOUT_EVENT
          }
        },
        1
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        {
          payload: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            bob,
            alice
          },
          type: SWAP_TIMEOUT
        },
        {
          payload: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            bob,
            alice
          },
          type: SWAP_TIMEOUT
        }
      ]);

      done();
    },
    TIMEOUT
  );

  it(
    'should not dispatch timeout action',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        checkTimeoutEvent,
        {
          payload: {
            type: CHECK_TIMEOUT_EVENT
          }
        },
        1
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([]);

      done();
    },
    TIMEOUT
  );
});
