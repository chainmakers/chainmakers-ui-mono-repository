import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import data from './fake-data';
import { checkUpdateSwapEvent } from '../handle-update-swap-event';
import { CHECK_UPDATE_SWAP_EVENT, LOAD_RECENT_SWAPS } from '../../constants';
import { SWAP_STATE_ZERO } from '../../../__tests__/fake-data';

const TIMEOUT = 20 * 1000;

describe('containers/BuyPage/saga/handle-update-swap-event', () => {
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
    'should handle checkUpdateSwapEvent correctly',
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
        checkUpdateSwapEvent,
        {
          payload: {
            type: CHECK_UPDATE_SWAP_EVENT
          }
        },
        1
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        {
          type: LOAD_RECENT_SWAPS
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
        checkUpdateSwapEvent,
        {
          payload: {
            type: CHECK_UPDATE_SWAP_EVENT
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
