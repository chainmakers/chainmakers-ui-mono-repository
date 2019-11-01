import { createSelector } from 'reselect';
import { makeSelectBalanceList as makeSelectBalanceListApp } from '../App/selectors';
import getConfig from '../../utils/config';
import { APP_STATE_NAME } from './constants';

const config = getConfig();

const COIN_BASE = config.get('marketmaker.tokenconfig');

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectPrices = () =>
  createSelector(selectBuy, buyState => buyState.get('prices'));

const makeSelectPricesLoading = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('loading'));

const makeSelectPricesError = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('error'));

const makeSelectPricesEntities = () =>
  createSelector(makeSelectPrices(), pricesState =>
    pricesState.get('entities')
  );

const makeSelectBuying = () =>
  createSelector(selectBuy, buyState => buyState.get('buying'));

const makeSelectBuyingLoading = () =>
  createSelector(makeSelectBuying(), buyingState => buyingState.get('loading'));

const makeSelectBuyingError = () =>
  createSelector(makeSelectBuying(), buyingState => buyingState.get('error'));

const makeSelectSwaps = () =>
  createSelector(selectBuy, buyState => buyState.get('swaps'));

const makeSelectSwapsEntities = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('entities'));

const makeSelectCurrentSwapsList = () =>
  createSelector(makeSelectSwaps(), swapsState =>
    swapsState.get('processingList')
  );

const makeSelectCurrentSwaps = () =>
  createSelector(
    makeSelectSwaps(),
    makeSelectSwapsEntities(),
    (swapsState, swapsEntities) =>
      swapsState.get('processingList').map(e => swapsEntities.get(e))
  );

const makeSelectFinishedSwaps = () =>
  createSelector(
    makeSelectSwaps(),
    makeSelectSwapsEntities(),
    (swapsState, swapsEntities) =>
      swapsState.get('finishedList').map(e => swapsEntities.get(e))
  );

const makeSelectCurrentSwap = () =>
  createSelector(
    makeSelectSwaps(),
    makeSelectSwapsEntities(),
    (swapsState, swapsEntities) => {
      const c = swapsState.get('currentSwap');
      if (!c) return null;
      return swapsEntities.get(c);
    }
  );

const makeSelectSwapDetailModal = () =>
  createSelector(selectBuy, buyState => buyState.get('swapDetailModal'));

const makeSelectSwapInDetailModal = () =>
  createSelector(
    makeSelectSwapDetailModal(),
    makeSelectSwapsEntities(),
    (swapDetail, swapsEntities) => {
      const c = swapDetail.get('uuid');
      if (!c) return null;
      return swapsEntities.get(c);
    }
  );

const makeSelectBalanceList = () =>
  createSelector(makeSelectBalanceListApp(), balanceList => {
    const symbol = COIN_BASE.coin;
    return balanceList.filter(e => e !== symbol);
  });

export {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectBuying,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectSwaps,
  makeSelectSwapsEntities,
  makeSelectCurrentSwapsList,
  makeSelectCurrentSwaps,
  makeSelectFinishedSwaps,
  makeSelectCurrentSwap,
  makeSelectSwapDetailModal,
  makeSelectSwapInDetailModal,
  makeSelectBalanceList
};
