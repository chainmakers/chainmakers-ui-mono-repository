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
  LOAD_WITHDRAW,
  LOAD_WITHDRAW_SUCCESS,
  LOAD_WITHDRAW_ERROR,
  LOAD_SWAP_SUCCESS,
  KMDICE_CHAIN_START,
  KMDICE_CHAIN_START_SUCCESS,
  // KMDICE_CHAIN_START_ERROR,
  KMDICE_CHAIN_GET_INFO,
  KMDICE_CHAIN_GET_INFO_SUCCESS,
  KMDICE_CHAIN_STOP
} from './constants';
import type { BlockchainInfoPayload } from './schema';

export function login(passphrase: string) {
  return {
    type: LOGIN,
    payload: {
      passphrase
    }
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
}

export function loginError(error) {
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

export function loadWithdraw(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: LOAD_WITHDRAW,
    payload
  };
}

export function loadWithdrawSuccess(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: LOAD_WITHDRAW_SUCCESS,
    payload
  };
}

export function loadWithdrawError(
  payload: {
    amount: number,
    address: string,
    coin: string
  },
  message: string
) {
  return {
    type: LOAD_WITHDRAW_ERROR,
    payload,
    error: {
      message
    }
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

export function startKMDiceChain(pubkey?: string) {
  const payload = {};
  if (pubkey) {
    payload.pubkey = pubkey;
  }
  return {
    type: KMDICE_CHAIN_START,
    payload
  };
}

export function startKMDiceChainSuccess() {
  return {
    type: KMDICE_CHAIN_START_SUCCESS
  };
}

export function getInfoKMDiceChain() {
  return {
    type: KMDICE_CHAIN_GET_INFO
  };
}

export function getInfoKMDiceChainSuccess(payload: BlockchainInfoPayload) {
  return {
    type: KMDICE_CHAIN_GET_INFO_SUCCESS,
    payload
  };
}

export function stopKMDiceChain() {
  return {
    type: KMDICE_CHAIN_STOP
  };
}
