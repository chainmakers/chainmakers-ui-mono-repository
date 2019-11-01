import { fromJS } from 'immutable';
import buySubscribe from '../subscribe';
import { LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET } from '../constants';
import { LOAD_SWAP_SUCCESS } from '../../App/constants';
import data from '../saga/__tests__/fake-data';
import {
  WEBSOCKET_STATE_ZERO,
  WEBSOCKET_STATE_ONE,
  WEBSOCKET_STATE_TWO,
  WEBSOCKET_STATE_THREE,
  WEBSOCKET_STATE_FOUR,
  WEBSOCKET_STATE_FIVE,
  WEBSOCKET_STATE_SIX,
  WEBSOCKET_STATE_SEVEN
} from '../../__tests__/fake-data';

describe('containers/BuyPage/subscribe', () => {
  const { uuid } = WEBSOCKET_STATE_ZERO;
  it('should handle buySubscribe correctly', async done => {
    expect(typeof buySubscribe).toEqual('function');

    let store = fromJS(data);
    store = store.setIn(['buy', 'swaps', 'processingList'], fromJS([uuid]));

    let dispatched = [];

    const dispatch = action => {
      dispatched.push(action);
    };

    const getState = () => store;

    let result = await buySubscribe(WEBSOCKET_STATE_ZERO, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_ONE, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_ONE.result
      }
    ]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_TWO, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_TWO.result
      }
    ]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_THREE, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_THREE.result
      }
    ]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_FOUR, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_FOUR.result
      }
    ]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_FIVE, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_FIVE.result
      }
    ]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_SIX, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_SIX.result
      }
    ]);
    dispatched = [];

    result = await buySubscribe(WEBSOCKET_STATE_SEVEN, dispatch, getState);
    expect(result).toEqual(undefined);
    expect(dispatched).toEqual([
      {
        type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
        payload: WEBSOCKET_STATE_SEVEN.result
      },
      {
        type: LOAD_SWAP_SUCCESS,
        payload: [
          {
            coin: WEBSOCKET_STATE_SEVEN.result.bob,
            value: WEBSOCKET_STATE_SEVEN.result.srcamount
          },
          {
            coin: WEBSOCKET_STATE_SEVEN.result.alice,
            value: 0 - WEBSOCKET_STATE_SEVEN.result.destamount
          }
        ]
      }
    ]);
    dispatched = [];

    done();
  });
});
