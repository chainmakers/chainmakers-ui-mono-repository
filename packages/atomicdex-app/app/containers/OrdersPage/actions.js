// @flow
import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS,
  LOAD_PRICES_ERROR,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_SUCCESS,
  LOAD_BUY_COIN_ERROR,
  CLEAR_BUY_COIN_ERROR,
  LOAD_RECENT_SWAPS,
  LOAD_RECENT_SWAPS_COIN,
  // LOAD_RECENT_SWAPS_SUCCESS,
  LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
  LOAD_RECENT_SWAPS_ERROR,
  CHECK_TIMEOUT_EVENT,
  CHECK_UPDATE_SWAP_EVENT,
  SWAP_TIMEOUT,
  SWAP_MAKE_A_NEW,
  SWAP_DETAIL_MODAL_OPEN,
  SWAP_DETAIL_MODAL_CLOSE,
  SELECT_COIN_MODAL_OPEN,
  SELECT_COIN_MODAL_CLOSE,
  SELECT_COIN_MODAL_CLICK,
  SELECT_COIN_MODAL_SEARCH,
  SELECT_COIN_MODAL_SEARCH_SUCCESS,
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
  COIN_PAYMENT_SELECT,
  SEARCH_STATE_SKIP_CREATION,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_LOAD_SUCCESS,
  ORDERBOOK_LOAD_ERROR
} from './constants';

import type {
  BuyCoinPayload,
  BestPricePayload,
  TimeoutPayload,
  SelectCoinPayload
} from './schema';

import type { ErrorType } from '../schema';

export function loadPrice(coin: string) {
  return {
    type: LOAD_PRICE,
    payload: {
      coin
    }
  };
}

export function loadPrices() {
  return {
    type: LOAD_PRICES
  };
}

export function loadBestPrice(payload: BestPricePayload) {
  return {
    type: LOAD_BEST_PRICE,
    payload
  };
}

export function loadPricesSuccess() {
  return {
    type: LOAD_PRICES_SUCCESS
  };
}

export function loadPricesError(message: string) {
  return {
    type: LOAD_PRICES_ERROR,
    error: {
      message
    }
  };
}

export function loadBuyCoin(payload: BuyCoinPayload) {
  return {
    type: LOAD_BUY_COIN,
    payload
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function loadBuyCoinSuccess(payload: Object) {
  return {
    type: LOAD_BUY_COIN_SUCCESS,
    payload
  };
}

export function loadBuyCoinError(message: string) {
  return {
    type: LOAD_BUY_COIN_ERROR,
    error: {
      message
    }
  };
}

export function clearBuyCoinError() {
  return {
    type: CLEAR_BUY_COIN_ERROR
  };
}

export function loadRecentSwaps() {
  return {
    type: LOAD_RECENT_SWAPS
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function loadRecentSwapsCoin(payload: Object) {
  return {
    type: LOAD_RECENT_SWAPS_COIN,
    payload
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function loadRecentSwapsDataFromWebsocket(payload: Object) {
  return {
    type: LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
    payload
  };
}

export function loadRecentSwapsError(message: string) {
  return {
    type: LOAD_RECENT_SWAPS_ERROR,
    error: {
      message
    }
  };
}

export function checkTimeoutEvent() {
  return {
    type: CHECK_TIMEOUT_EVENT
  };
}

export function checkUpdateSwapEvent() {
  return {
    type: CHECK_UPDATE_SWAP_EVENT
  };
}

export function timeoutSwap(payload: TimeoutPayload) {
  return {
    type: SWAP_TIMEOUT,
    payload
  };
}

export function makeANewSwap() {
  return {
    type: SWAP_MAKE_A_NEW
  };
}

export function openDetailModal(uuid?: string) {
  return {
    type: SWAP_DETAIL_MODAL_OPEN,
    payload: {
      uuid
    }
  };
}

export function closeDetailModal() {
  return {
    type: SWAP_DETAIL_MODAL_CLOSE
  };
}

export function openSelectCoinModal() {
  return {
    type: SELECT_COIN_MODAL_OPEN
  };
}

export function closeSelectCoinModal() {
  return {
    type: SELECT_COIN_MODAL_CLOSE
  };
}

export function clickSelectCoinModal(payload: SelectCoinPayload) {
  return {
    type: SELECT_COIN_MODAL_CLICK,
    payload
  };
}

export function searchSelectCoinModal(input: string) {
  return {
    type: SELECT_COIN_MODAL_SEARCH,
    payload: {
      input
    }
  };
}

export function searchSelectCoinModalSuccess(payload) {
  return {
    type: SELECT_COIN_MODAL_SEARCH_SUCCESS,
    payload
  };
}

export function setupSearchApiForSelectCoinModal() {
  return {
    type: SELECT_COIN_MODAL_SETUP_SEARCH_API
  };
}

export function setupSearchApiForSelectCoinModalSuccess(payload) {
  return {
    type: SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
    payload
  };
}

export function selectCoinPayment(payload: SelectCoinPayload) {
  return {
    type: COIN_PAYMENT_SELECT,
    payload
  };
}

export function skipSearchStateCreation() {
  return {
    type: SEARCH_STATE_SKIP_CREATION
  };
}

export function openJoyride() {
  return {
    type: JOYRIDE_OPEN
  };
}

export function closeJoyride() {
  return {
    type: JOYRIDE_CLOSE
  };
}

export function loadOrderbook() {
  return {
    type: ORDERBOOK_LOAD
  };
}

export function loadOrderbookSuccess(payload) {
  return {
    type: ORDERBOOK_LOAD_SUCCESS,
    payload
  };
}

export function loadOrderbookError(error: ErrorType) {
  return {
    type: ORDERBOOK_LOAD_ERROR,
    error
  };
}