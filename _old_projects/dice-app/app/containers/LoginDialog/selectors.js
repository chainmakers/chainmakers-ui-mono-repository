import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectLoginState = state => state.get(APP_STATE_NAME);

const makeSelectLoginState = () =>
  createSelector(
    selectLoginState,
    loginState => loginState.get('show')
  );

// eslint-disable-next-line import/prefer-default-export
export { selectLoginState, makeSelectLoginState };
