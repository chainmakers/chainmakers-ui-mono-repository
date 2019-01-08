/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectGlobal = state => state.get(APP_STATE_NAME);

const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectAuthenticated = () =>
  createSelector(selectGlobal, globalState => !!globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectUserpass = () =>
  createSelector(makeSelectCurrentUser(), user => user.get('userpass'));

const makeSelectBalance = () =>
  createSelector(selectGlobal, globalState => globalState.get('balance'));

const makeSelectBalanceLoading = () =>
  createSelector(makeSelectBalance(), balanceState =>
    balanceState.get('loading')
  );

const makeSelectBalanceInit = () =>
  createSelector(makeSelectBalance(), balanceState => balanceState.get('init'));

const makeSelectBalanceError = () =>
  createSelector(makeSelectBalance(), balanceState =>
    balanceState.get('error')
  );

const makeSelectBalanceList = () =>
  createSelector(makeSelectBalance(), balanceState =>
    balanceState.get('coins').map(e => e.get('symbol'))
  );

const makeSelectBalanceEntities = () =>
  createSelector(makeSelectBalance(), balanceState =>
    balanceState.get('entities')
  );

const makeSelectBalanceAvailable = () =>
  createSelector(
    makeSelectBalanceList(),
    makeSelectBalanceEntities(),
    (list, entities) =>
      list.map(key => entities.get(key)).filter(value => value.get('balance'))
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectAuthenticated,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectUserpass,
  makeSelectBalance,
  makeSelectBalanceLoading,
  makeSelectBalanceInit,
  makeSelectBalanceError,
  makeSelectBalanceList,
  makeSelectBalanceEntities,
  makeSelectBalanceAvailable
};
