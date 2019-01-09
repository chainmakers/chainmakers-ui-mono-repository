import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import { checkUpdateSwapEvent } from '../handle-update-swap-event';
import {
  CHECK_UPDATE_SWAP_EVENT,
  LOAD_RECENT_SWAPS,
  APP_STATE_NAME
} from '../../constants';
import data from '../../../__tests__/app-state.json';
import { SWAP_STATE_ZERO } from '../../../__tests__/fake-data';

const TIMEOUT = 20 * 1000;

describe('containers/DexPage/saga/handle-update-swap-event', () => {
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
      let processingList = store.getIn([
        APP_STATE_NAME,
        'swaps',
        'processingList'
      ]);
      processingList = processingList.push(uuid);
      let entities = store.getIn([APP_STATE_NAME, 'swaps', 'entities']);
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
      store = store.setIn(
        [APP_STATE_NAME, 'swaps', 'processingList'],
        processingList
      );
      store = store.setIn([APP_STATE_NAME, 'swaps', 'entities'], entities);

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
