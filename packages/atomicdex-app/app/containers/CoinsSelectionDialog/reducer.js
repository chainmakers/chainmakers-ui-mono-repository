// @flow
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';
import {
  SELECT_COIN_MODAL_SEARCH_SUCCESS,
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
  SEARCH_STATE_SKIP_CREATION,
  SEARCH_STATE_NULL,
  SEARCH_STATE_CREATE,
  SEARCH_STATE_READY
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  selectCoinModal: {
    open: false
  },

  search: {
    state: SEARCH_STATE_NULL,
    errors: {},
    list: []
  }
});

export default handleActions(
  {
    [SELECT_COIN_MODAL_SEARCH_SUCCESS]: (state, { payload }) =>
      state.setIn(['search', 'list'], fromJS(payload)),

    [SELECT_COIN_MODAL_SETUP_SEARCH_API]: state =>
      state.setIn(['search', 'state'], SEARCH_STATE_CREATE),

    [SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS]: (state, { payload }) =>
      state
        .setIn(['search', 'state'], SEARCH_STATE_READY)
        .setIn(['search', 'list'], fromJS(payload)),

    [SEARCH_STATE_SKIP_CREATION]: state =>
      state.setIn(['search', 'state'], SEARCH_STATE_READY),

    [LOGOUT]: () => initialState
  },
  initialState
);
