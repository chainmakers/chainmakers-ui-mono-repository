// @flow
/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * https://github.com/redux-utilities/flux-standard-action
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOAD_WITHDRAW_SUCCESS,
  LOAD_SWAP_SUCCESS,
  ELECTRUM_LOAD,
  ELECTRUM_ADD,
  ELECTRUM_ADD_SUCCESS,
  ELECTRUM_ADD_ERROR,
  ELECTRUM_REMOVE,
  BALANCE_LOAD_ALL,
  BALANCE_LOAD,
  BALANCE_LOAD_SUCCESS,
  BALANCE_LOAD_ERROR,
  DATA_FROM_DB_LOAD,
  DATA_FROM_DB_LOAD_SUCCESS,
  DATA_FROM_DB_LOAD_ERROR
} from './constants';
import type {
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadbalacePayload,
  LoadBalanceSuccessPayload
} from './schema';
import type { ErrorType, LoginPayload } from '../schema';

export function login(payload: LoginPayload) {
  return {
    type: LOGIN,
    payload
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginError(error: ErrorType) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function loadWithdrawBalanceSuccess(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: LOAD_WITHDRAW_SUCCESS,
    payload
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function loadSwapSuccess(payload: Object) {
  return {
    type: LOAD_SWAP_SUCCESS,
    payload
  };
}

// -- //

export function loadElectrums() {
  return {
    type: ELECTRUM_LOAD
  };
}

export function addElectrum(payload: AddElectrumPayload) {
  return {
    type: ELECTRUM_ADD,
    payload
  };
}

export function removeElectrum(coin: string) {
  return {
    type: ELECTRUM_REMOVE,
    payload: {
      coin
    }
  };
}

export function addElectrumSuccess(payload: AddElectrumSuccessPayload) {
  return {
    type: ELECTRUM_ADD_SUCCESS,
    payload
  };
}

export function addElectrumError(error: ErrorType) {
  return {
    type: ELECTRUM_ADD_ERROR,
    error
  };
}

export function loadAllBalance() {
  return {
    type: BALANCE_LOAD_ALL
  };
}

export function loadBalance(payload: LoadbalacePayload) {
  return {
    type: BALANCE_LOAD,
    payload
  };
}

export function loadBalanceSuccess(payload: LoadBalanceSuccessPayload) {
  return {
    type: BALANCE_LOAD_SUCCESS,
    payload
  };
}

export function loadBalanceError(error: ErrorType) {
  return {
    type: BALANCE_LOAD_ERROR,
    error
  };
}

export function loadDataFromDB() {
  return {
    type: DATA_FROM_DB_LOAD
  };
}

export function loadDataFromDBSuccess(payload: Array<string>) {
  return {
    type: DATA_FROM_DB_LOAD_SUCCESS,
    payload
  };
}

export function loadDataFromDBError() {
  return {
    type: DATA_FROM_DB_LOAD_ERROR
  };
}
