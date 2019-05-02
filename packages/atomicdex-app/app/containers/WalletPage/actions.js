// @flow
import {
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  TRANSACTIONS_LOAD,
  COIN_TRANSACTIONS_LOAD,
  COIN_TRANSACTIONS_SUCCESS,
  ACTION_RETRY,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE,
  WITHDRAW_LOAD,
  WITHDRAW_LOAD_SUCCESS,
  WITHDRAW_LOAD_ERROR,
  WITHDRAW_TAB,
  DEPOSIT_TAB,
  TAB_ASSET_INFO_SWITCH,
  ASSET_MODAL_OPEN,
  ASSET_MODAL_CLOSE
} from './constants';
import type {
  CoinTransactionsLoadPayload,
  CoinTransactionsSuccessPayload,
  RetryActionPayload,
  OpenAssetModalPayload
} from './schema';
import type { ErrorType } from '../schema';

export function loadTransactionsSuccess() {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS
  };
}

export function loadTransactionsError(message: string) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error: {
      message
    }
  };
}

export function loadTransactions() {
  return {
    type: TRANSACTIONS_LOAD
  };
}

export function loadCoinTransactions(payload: CoinTransactionsLoadPayload) {
  return {
    type: COIN_TRANSACTIONS_LOAD,
    payload
  };
}

export function loadCoinTransactionsSuccess(
  payload: CoinTransactionsSuccessPayload
) {
  return {
    type: COIN_TRANSACTIONS_SUCCESS,
    payload
  };
}

export function retryAction(payload: RetryActionPayload) {
  return {
    type: ACTION_RETRY,
    payload
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

// -- //

export function loadWithdraw(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: WITHDRAW_LOAD,
    payload
  };
}

export function loadWithdrawSuccess(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: WITHDRAW_LOAD_SUCCESS,
    payload
  };
}

export function loadWithdrawError(error: ErrorType) {
  return {
    type: WITHDRAW_LOAD_ERROR,
    error
  };
}

export function switchTabAssetInfo(tab: string) {
  return {
    type: TAB_ASSET_INFO_SWITCH,
    payload: {
      tab
    }
  };
}

export function openAssetModal(payload: OpenAssetModalPayload) {
  return {
    type: ASSET_MODAL_OPEN,
    payload
  };
}

export function closeAssetModal() {
  return {
    type: ASSET_MODAL_CLOSE
  };
}
