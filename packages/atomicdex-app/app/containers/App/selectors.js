// @flow
// The global state selectors
import { createSelector } from 'reselect';
import { LOADING, ENABLE } from '../../constants';
import { APP_STATE_NAME } from './constants';

const selectGlobal = state => state.get(APP_STATE_NAME);

const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('currentUser')
  );

const makeSelectAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => !!globalState.get('currentUser')
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading')
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('error')
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS()
  );

// -- //

const makeSelectBalance = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('balance')
  );

const makeSelectBalanceFetchStatus = () =>
  createSelector(
    makeSelectBalance(),
    balanceState => balanceState.get('fetchStatus')
  );

const makeSelectBalanceLoading = () =>
  createSelector(
    makeSelectBalance(),
    balanceState =>
      !!balanceState.get('fetchStatus').find(val => val === LOADING)
  );

const makeSelectBalanceList = () =>
  createSelector(
    makeSelectBalance(),
    balanceState => balanceState.get('list')
  );

const makeSelectBalanceEntities = () =>
  createSelector(
    makeSelectBalance(),
    balanceState => balanceState.get('entities')
  );

const makeSelectBalanceErrors = () =>
  createSelector(
    makeSelectBalance(),
    balanceState => balanceState.get('errors')
  );

const makeSelectBalanceAvailable = () =>
  createSelector(
    makeSelectBalance(),
    balanceState => {
      const list = balanceState
        .get('list')
        .filter(item => item.get('status') === ENABLE)
        .map(e => e.get('symbol'));
      const entities = balanceState.get('entities');

      return list
        .map(key => entities.get(key))
        .filter(value => value.get('balance'));
    }
  );

// -- //

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectAuthenticated,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectBalance,
  makeSelectBalanceFetchStatus,
  makeSelectBalanceLoading,
  makeSelectBalanceErrors,
  makeSelectBalanceList,
  makeSelectBalanceEntities,
  makeSelectBalanceAvailable
};
