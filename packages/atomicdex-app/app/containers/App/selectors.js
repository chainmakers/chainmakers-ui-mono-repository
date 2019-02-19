// @flow
// The global state selectors
import { createSelector } from 'reselect';
import { LOADING, ENABLE, STATE_STARTED, STATE_RUNNING } from '../../constants';
import { APP_STATE_NAME } from './constants';

const selectGlobal = state => state.get(APP_STATE_NAME);

const selectRoute = state => state.get('route');

const makeSelectAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['marketmaker', 'state']) === STATE_RUNNING
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS()
  );

// -- //

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['marketmaker', 'errors'])
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['marketmaker', 'state']) === STATE_STARTED
  );

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

const makeSelectSupportedCoins = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('supported_coins')
  );

const makeSelectSupportedCoinsList = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['supported_coins', 'list'])
  );

const makeSelectSupportedCoinsEntities = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['supported_coins', 'entities'])
  );

const makeSelectSupportedCoinsAll = () =>
  createSelector(
    makeSelectSupportedCoinsList(),
    makeSelectSupportedCoinsEntities(),
    (list, entities) => list.map(icon => entities.get(icon))
  );

// -- //

export {
  selectGlobal,
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
  makeSelectBalanceAvailable,
  makeSelectSupportedCoins,
  makeSelectSupportedCoinsList,
  makeSelectSupportedCoinsEntities,
  makeSelectSupportedCoinsAll
};
