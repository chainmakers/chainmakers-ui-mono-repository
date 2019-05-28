import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectOrder = state => state.get(APP_STATE_NAME);

const makeSelectPrices = () =>
  createSelector(
    selectOrder,
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
    selectOrder,
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
    selectOrder,
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
    selectOrder,
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
    selectOrder,
    buyState => buyState.get('selectCoinModal')
  );

const makeSelectCurrency = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('currency')
  );

const makeSelectPayment = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('payment')
  );

const makeSelectSearch = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('search')
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

const makeSelectJoyride = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('joyride')
  );

const makeSelectJoyrideOpenState = () =>
  createSelector(
    makeSelectJoyride(),
    joyrideState => joyrideState.get('open')
  );

const makeSelectOrderbook = () =>
  createSelector(
    selectOrder,
    order => order.get('orderbook')
  );

const makeSelectOrderbookDeposit = () =>
  createSelector(
    makeSelectOrderbook(),
    orderbook => orderbook.get('deposit')
  );

const makeSelectOrderbookRecevie = () =>
  createSelector(
    makeSelectOrderbook(),
    orderbook => orderbook.get('recevie')
  );

const makeSelectOrderbookAsks = () =>
  createSelector(
    makeSelectOrderbook(),
    orderbook => orderbook.get('asks')
  );

const makeSelectOrderbookBids = () =>
  createSelector(
    makeSelectOrderbook(),
    orderbook => orderbook.get('bids')
  );

const makeSelectOrderbookFetchStatus = () =>
  createSelector(
    makeSelectOrderbook(),
    orderbook => orderbook.get('fetchStatus')
  );

const makeSelectDepositCoinModal = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('depositCoinModal')
  );

const makeSelectRecevieCoinModal = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('recevieCoinModal')
  );

export {
  selectOrder,
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
  makeSelectSearch,
  makeSelectSearchState,
  makeSelectSearchErrors,
  makeSelectSearchList,
  makeSelectJoyride,
  makeSelectJoyrideOpenState,
  makeSelectOrderbook,
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie,
  makeSelectOrderbookAsks,
  makeSelectOrderbookBids,
  makeSelectOrderbookFetchStatus,
  makeSelectDepositCoinModal,
  makeSelectRecevieCoinModal
};
