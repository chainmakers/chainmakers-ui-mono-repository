import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { ELECTRUM_DIALOG_SHOW, ELECTRUM_DIALOG_HIDE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  show: false
});

export default handleActions(
  {
    [ELECTRUM_DIALOG_SHOW]: state => state.set('show', true),
    [ELECTRUM_DIALOG_HIDE]: state => state.set('show', false)
  },
  initialState
);
