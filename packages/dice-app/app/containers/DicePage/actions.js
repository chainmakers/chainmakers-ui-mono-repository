// @flow

import {
  KMDICE_BETTING_START,
  KMDICE_BETTING_INSERT,
  KMDICE_BETTING_START_SUCCESS,
  KMDICE_BETTING_START_ERROR,
  KMDICE_BETTING_SYNC,
  KMDICE_BETTING_SYNC_SUCCESS
} from './constants';

import type {
  ErrorRPCType,
  StartKmdiceBettingPayload,
  InsertKmdiceBettingPayload,
  StartKmdiceBettingSuccessPayload,
  SyncKmdiceBettingPayload
} from './schema';

export function startKmdiceBetting(payload: StartKmdiceBettingPayload) {
  return {
    type: KMDICE_BETTING_START,
    payload
  };
}

export function insertKmdiceBetting(payload: InsertKmdiceBettingPayload) {
  return {
    type: KMDICE_BETTING_INSERT,
    payload
  };
}

export function startKmdiceBettingSuccess(
  payload: StartKmdiceBettingSuccessPayload
) {
  return {
    type: KMDICE_BETTING_START_SUCCESS,
    payload
  };
}

export function startKmdiceBettingError(payload: ErrorRPCType) {
  return {
    type: KMDICE_BETTING_START_ERROR,
    payload
  };
}

export function syncKmdiceBetting(payload: SyncKmdiceBettingPayload) {
  return {
    type: KMDICE_BETTING_SYNC,
    payload
  };
}

export function syncKmdiceBettingSuccess(
  payload: SyncKmdiceBettingSuccessPayload
) {
  return {
    type: KMDICE_BETTING_SYNC_SUCCESS,
    payload
  };
}
