// @flow
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';
import { SNACKBARS_OPEN, SNACKBARS_CLOSE } from './constants';

const TIME_OUT = 6000;

export const initialState = fromJS({
  open: false,
  message: '',
  timeout: TIME_OUT
});

export default handleActions(
  {
    [SNACKBARS_OPEN]: (state, { payload }) =>
      state.set('open', true).set('message', payload.message),
    [SNACKBARS_CLOSE]: state => state.set('open', false),
    [LOGOUT]: () => initialState
  },
  initialState
);
