// @flow
import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectCoinsSelectionDialog = state => state.get(APP_STATE_NAME);

const makeSelectSearch = () =>
  createSelector(
    selectCoinsSelectionDialog,
    coinsSelectionDialog => coinsSelectionDialog.get('search')
  );

const makeSelectSearchState = () =>
  createSelector(
    makeSelectSearch(),
    searchState => searchState.get('state')
  );

const makeSelectSearchErrors = () =>
  createSelector(
    makeSelectSearch(),
    searchState => searchState.get('errors')
  );

const makeSelectSearchList = () =>
  createSelector(
    makeSelectSearch(),
    searchState => searchState.get('list')
  );

export {
  selectCoinsSelectionDialog,
  makeSelectSearch,
  makeSelectSearchState,
  makeSelectSearchErrors,
  makeSelectSearchList
};
