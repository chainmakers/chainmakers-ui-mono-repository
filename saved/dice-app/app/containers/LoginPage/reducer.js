import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

// The initial state of the App
export const initialState = fromJS({});

const loginReducer = handleActions({}, initialState);

export default loginReducer;
