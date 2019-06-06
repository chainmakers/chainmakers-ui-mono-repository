// @flow
import {
  SWAP_DETAIL_MODAL_OPEN,
  SWAP_DETAIL_MODAL_CLOSE,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  ORDERBOOK_LOAD,
  ORDERBOOK_RELOAD,
  ORDERBOOK_RELOAD_SUCCESS,
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
  CONFIRM_NEW_ORDER_MODAL_OPEN,
  CONFIRM_NEW_ORDER_MODAL_CLOSE
} from './constants';

import type { SelectCoinPayload, NewOrderSuccessPayload } from './schema';

import type { ErrorType } from '../schema';

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

export function reloadOrderbook() {
  return {
    type: ORDERBOOK_RELOAD
  };
}

export function reloadOrderbookSuccess() {
  return {
    type: ORDERBOOK_RELOAD_SUCCESS
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

export function setNewOrder(price: number) {
  return {
    type: NEW_ORDER_SET,
    payload: {
      price
    }
  };
}

export function skipNewOrder() {
  return {
    type: NEW_ORDER_SET_SKIP
  };
}

export function setNewOrderSuccess(payload: NewOrderSuccessPayload) {
  return {
    type: NEW_ORDER_SET_SUCCESS,
    payload
  };
}

export function setNewOrderError(error: ErrorType) {
  return {
    type: NEW_ORDER_SET_ERROR,
    error
  };
}

export function openConfirmNewOrderModal() {
  return {
    type: CONFIRM_NEW_ORDER_MODAL_OPEN
  };
}

export function closeConfirmNewOrderModal() {
  return {
    type: CONFIRM_NEW_ORDER_MODAL_CLOSE
  };
}
