import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectOrder = state => state.get(APP_STATE_NAME);

const makeSelectSwapDetailModal = () =>
  createSelector(
    selectOrder,
    buyState => buyState.get('swapDetailModal')
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

const makeSelectMyOrder = () =>
  createSelector(
    selectOrder,
    order => order.get('myorder')
  );

const makeSelectMyOrderFetchStatus = () =>
  createSelector(
    makeSelectMyOrder(),
    myorder => myorder.get('fetchStatus')
  );

const makeSelectMyOrderErrors = () =>
  createSelector(
    makeSelectMyOrder(),
    myorder => myorder.get('errors')
  );

const makeSelectConfirmNewOrderModal = () =>
  createSelector(
    selectOrder,
    order => order.get('confirmNewOrderModal')
  );

export {
  selectOrder,
  makeSelectSwapDetailModal,
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
  makeSelectRecevieCoinModal,
  makeSelectMyOrder,
  makeSelectMyOrderFetchStatus,
  makeSelectMyOrderErrors,
  makeSelectConfirmNewOrderModal
};
