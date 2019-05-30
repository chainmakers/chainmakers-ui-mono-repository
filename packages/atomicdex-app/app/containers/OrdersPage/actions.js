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
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_LOAD_SUCCESS,
  ORDERBOOK_LOAD_SKIP,
  ORDERBOOK_LOAD_ERROR,
  DEPOSIT_COIN_MODAL_OPEN,
  DEPOSIT_COIN_MODAL_CLOSE,
  DEPOSIT_COIN_SELECT,
  RECEVIE_COIN_MODAL_OPEN,
  RECEVIE_COIN_MODAL_CLOSE,
  RECEVIE_COIN_SELECT,
  NEW_ORDER_SET,
  NEW_ORDER_SET_SKIP,
  NEW_ORDER_SET_SUCCESS,
  NEW_ORDER_SET_ERROR,
  NEW_ORDER_PRICE
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

export function skipOrderbook() {
  return {
    type: ORDERBOOK_LOAD_SKIP
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

export function openDepositCoinModal() {
  return {
    type: DEPOSIT_COIN_MODAL_OPEN
  };
}

export function closeDepositCoinModal() {
  return {
    type: DEPOSIT_COIN_MODAL_CLOSE
  };
}

export function selectCoinDeposit(payload: SelectCoinPayload) {
  return {
    type: DEPOSIT_COIN_SELECT,
    payload
  };
}

export function openRecevieCoinModal() {
  return {
    type: RECEVIE_COIN_MODAL_OPEN
  };
}

export function closeRecevieCoinModal() {
  return {
    type: RECEVIE_COIN_MODAL_CLOSE
  };
}

export function selectCoinRecevie(payload: SelectCoinPayload) {
  return {
    type: RECEVIE_COIN_SELECT,
    payload
  };
}

export function setNewOrder() {
  return {
    type: NEW_ORDER_SET
  };
}

export function skipNewOrder() {
  return {
    type: NEW_ORDER_SET_SKIP
  };
}

export function setNewOrderSuccess() {
  return {
    type: NEW_ORDER_SET_SUCCESS
  };
}

export function setNewOrderError(error: ErrorType) {
  return {
    type: NEW_ORDER_SET_ERROR,
    error
  };
}

export function setNewOrderPrice(price: number) {
  return {
    type: NEW_ORDER_PRICE,
    payload: {
      price
    }
  };
}
