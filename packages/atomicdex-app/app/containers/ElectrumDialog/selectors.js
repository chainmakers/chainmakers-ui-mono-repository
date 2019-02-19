import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectElectrumState = state => state.get(APP_STATE_NAME);

const makeSelectElectrumState = () =>
  createSelector(
    selectElectrumState,
    logoutState => logoutState.get('show')
  );

// eslint-disable-next-line import/prefer-default-export
export { selectElectrumState, makeSelectElectrumState };
