import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectLogoutState = state => state.get(APP_STATE_NAME);

const makeSelectLogoutState = () =>
  createSelector(selectLogoutState, logoutState => logoutState.get('show'));

// eslint-disable-next-line import/prefer-default-export
export { selectLogoutState, makeSelectLogoutState };
