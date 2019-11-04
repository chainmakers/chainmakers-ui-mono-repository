// @flow
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';
import {
  KMDICE_BETTING_START,
  KMDICE_BETTING_INSERT,
  KMDICE_BETTING_START_SUCCESS,
  KMDICE_BETTING_START_ERROR,
  KMDICE_BETTING_SYNC_SUCCESS
} from './constants';
import type { InsertKmdiceBettingPayload } from './schema';

export const initialState = fromJS({
  betHistory: {
    entities: {},
    errors: {},
    list: [],
    loading: false
  }
});

export default handleActions(
  {
    [KMDICE_BETTING_START]: state =>
      state.setIn(['betHistory', 'loading'], true),
    [KMDICE_BETTING_INSERT]: (
      state,
      { payload }: { payload: InsertKmdiceBettingPayload }
    ) => {
      // step one: load entities and list
      const entities = state.getIn(['betHistory', 'entities']);
      const list = state.getIn(['betHistory', 'list']);
      // step two: add new record
      return state
        .setIn(
          ['betHistory', 'entities'],
          entities.set(payload.id, fromJS(payload))
        )
        .setIn(['betHistory', 'list'], list.unshift(payload.id));
    },
    [KMDICE_BETTING_START_SUCCESS]: (state, { payload }) => {
      // step one: load entities
      const entities = state.getIn(['betHistory', 'entities']);
      // step two: update betting record
      return state.setIn(
        ['betHistory', 'entities'],
        entities.set(
          payload.id,
          entities.get(payload.id).set('bettxid', payload.bettxid)
        )
      );
    },
    [KMDICE_BETTING_SYNC_SUCCESS]: (state, { payload }) => {
      // step one: load entities
      const entities = state.getIn(['betHistory', 'entities']);
      const bet = entities.get(payload.id);
      // step two: add new record
      return state.setIn(
        ['betHistory', 'entities'],
        entities.set(payload.id, bet.set('status', payload.status))
      );
    },
    [KMDICE_BETTING_START_ERROR]: state =>
      state.setIn(['betHistory', 'loading'], false),
    [KMDICE_BETTING_START_SUCCESS]: state =>
      state.setIn(['betHistory', 'loading'], false),
    [LOGOUT]: () => initialState
  },
  initialState
);
