import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectPrices = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('prices')
  );

const makeSelectPricesLoading = () =>
  createSelector(
    makeSelectPrices(),
    pricesState => pricesState.get('loading')
  );

const makeSelectPricesError = () =>
  createSelector(
    makeSelectPrices(),
    pricesState => pricesState.get('error')
  );

const makeSelectPricesEntities = () =>
  createSelector(
    makeSelectPrices(),
    pricesState => pricesState.get('entities')
  );

const makeSelectPriceEntities = () =>
  createSelector(
    makeSelectPricesEntities(),
    makeSelectPayment(),
    (entities, payment) => entities.get(payment.get('symbol')) || null
  );

const makeSelectBuying = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('buying')
  );

const makeSelectBuyingLoading = () =>
  createSelector(
    makeSelectBuying(),
    buyingState => buyingState.get('loading')
  );

const makeSelectBuyingError = () =>
  createSelector(
    makeSelectBuying(),
    buyingState => buyingState.get('error')
  );

const makeSelectSwaps = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('swaps')
  );

const makeSelectSwapsEntities = () =>
  createSelector(
    makeSelectSwaps(),
    swapsState => swapsState.get('entities')
  );

const makeSelectCurrentSwapsList = () =>
  createSelector(
    makeSelectSwaps(),
    swapsState => swapsState.get('processingList')
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
  createSelector(
    selectBuy,
    buyState => buyState.get('swapDetailModal')
  );

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

const makeSelectCoinModal = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('selectCoinModal')
  );

const makeSelectCurrency = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('currency')
  );

const makeSelectPayment = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('payment')
  );

const makeSelectJoyride = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('joyride')
  );

const makeSelectJoyrideOpenState = () =>
  createSelector(
    makeSelectJoyride(),
    joyrideState => joyrideState.get('open')
  );

const makeSelectlLoadedDataFromDB = () =>
  createSelector(
    selectBuy,
    buyState => buyState.get('loadedDataFromDB')
  );

export {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectPriceEntities,
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
  makeSelectCoinModal,
  makeSelectCurrency,
  makeSelectPayment,
  makeSelectJoyride,
  makeSelectJoyrideOpenState,
  makeSelectlLoadedDataFromDB
};
