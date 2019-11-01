/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectDiceRootState = state => state.get(APP_STATE_NAME);

const makeSelectBetHistory = () =>
  createSelector(
    selectDiceRootState,
    root => root.get('betHistory')
  );

const makeSelectBetHistoryLoading = () =>
  createSelector(
    makeSelectBetHistory(),
    betHistory => betHistory.get('loading')
  );

const makeSelectBetHistoryEntities = () =>
  createSelector(
    makeSelectBetHistory(),
    betHistory => betHistory.get('entities')
  );

const makeSelectBetHistoryList = () =>
  createSelector(
    makeSelectBetHistory(),
    betHistory => betHistory.get('list')
  );

const makeSelectBetHistoryListData = () =>
  createSelector(
    makeSelectBetHistoryList(),
    makeSelectBetHistoryEntities(),
    (list, entities) => list.map(id => entities.get(id))
  );

export {
  selectDiceRootState,
  makeSelectBetHistory,
  makeSelectBetHistoryLoading,
  makeSelectBetHistoryEntities,
  makeSelectBetHistoryList,
  makeSelectBetHistoryListData
};
