import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT_DIALOG_SHOW, LOGOUT_DIALOG_HIDE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  show: false
});

const logoutDialogReducer = handleActions(
  {
    [LOGOUT_DIALOG_SHOW]: state => state.set('show', true),
    [LOGOUT_DIALOG_HIDE]: state => state.set('show', false)
  },
  initialState
);

export default logoutDialogReducer;
