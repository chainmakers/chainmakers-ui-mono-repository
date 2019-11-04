/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';
import { SNACKBARS_OPEN, SNACKBARS_CLOSE } from './constants';

// The initial state of the App
const TIME_OUT = 6000;

export const initialState = fromJS({
  open: false,
  message: '',
  timeout: TIME_OUT
});

const snackbars = handleActions(
  {
    [SNACKBARS_OPEN]: (state, { payload }) =>
      state.set('open', true).set('message', payload.message),
    [SNACKBARS_CLOSE]: state => state.set('open', false),
    [LOGOUT]: () => initialState
  },
  initialState
);

export default snackbars;
/* eslint-enable no-case-declarations, no-param-reassign */
