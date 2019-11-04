// @flow

import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  SHOW_LOGIN_DIALOG,
  CANCEL_LOGIN_DIALOG,
  AGREE_LOGIN_DIALOG
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  show: false
});

const loginDialogReducer = handleActions(
  {
    [SHOW_LOGIN_DIALOG]: state => state.set('show', true),
    [CANCEL_LOGIN_DIALOG]: state => state.set('show', false),
    [AGREE_LOGIN_DIALOG]: state => state.set('show', false)
  },
  initialState
);

export default loginDialogReducer;
