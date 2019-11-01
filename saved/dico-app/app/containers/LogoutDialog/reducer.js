import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  SHOW_LOGOUT_DIALOG,
  CANCEL_LOGOUT_DIALOG,
  AGREE_LOGOUT_DIALOG
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  show: false
});

const logoutDialogReducer = handleActions(
  {
    [SHOW_LOGOUT_DIALOG]: state => state.set('show', true),
    [CANCEL_LOGOUT_DIALOG]: state => state.set('show', false),
    [AGREE_LOGOUT_DIALOG]: state => state.set('show', false)
  },
  initialState
);

export default logoutDialogReducer;
