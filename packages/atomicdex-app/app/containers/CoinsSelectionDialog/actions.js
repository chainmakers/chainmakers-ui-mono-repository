// @flow
import {
  SELECT_COIN_MODAL_SEARCH,
  SELECT_COIN_MODAL_SEARCH_SUCCESS,
  SELECT_COIN_MODAL_SETUP_SEARCH_API,
  SELECT_COIN_MODAL_SETUP_SEARCH_API_SUCCESS,
  SEARCH_STATE_SKIP_CREATION
} from './constants';

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

export function skipSearchStateCreation() {
  return {
    type: SEARCH_STATE_SKIP_CREATION
  };
}
