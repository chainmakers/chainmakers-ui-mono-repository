import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGIN_SUCCESS, LOGOUT } from '../App/constants';

// The initial state of the App
export const initialState = fromJS({
  isStartWebsocket: false
});

const debug = require('debug')('dicoapp:containers:WebSocketComponent:reducer');

const webSocketReducer = handleActions(
  {
    [LOGIN_SUCCESS]: state => {
      debug(LOGIN_SUCCESS);
      return state.set('isStartWebsocket', true);
    },

    [LOGOUT]: state => {
      debug(LOGOUT);
      return state.set('isStartWebsocket', false);
    }
  },
  initialState
);

export default webSocketReducer;
