// @flow
import {
  BETTING_STATUS_PENDING,
  BETTING_STATUS_WIN,
  BETTING_STATUS_LOSS
} from './constants';

type StartKmdiceBettingPayload = {
  numberToBet: number,
  amount: number
};

type StartKmdiceBettingSuccessPayload = {
  numberToBet: number,
  amount: number,
  bettxid: string
};

type InsertKmdiceBettingPayload = {
  id: string,
  time: Date,
  amount: number,
  numberToBet: number
};

type SyncKmdiceBettingPayload = {
  bettxid: string,
  id: number
};

type BettingResult =
  | BETTING_STATUS_PENDING
  | BETTING_STATUS_WIN
  | BETTING_STATUS_LOSS;

type SyncKmdiceBettingSuccessPayload = {
  bettxid: string,
  id: number,
  status: BettingResult
};

type BettingType = {
  id: string,
  bettxid: string,
  time: Date,
  amount: number,
  numberToBet: number,
  balanceBeforeBetting: number,
  status: BettingResult
};

type ErrorRPCType = {
  context: {
    action: string,
    params: Object
  },
  type: string,
  message: string,
  ok: string
};

export type {
  BettingType,
  ErrorRPCType,
  InsertKmdiceBettingPayload,
  StartKmdiceBettingPayload,
  SyncKmdiceBettingSuccessPayload,
  StartKmdiceBettingSuccessPayload,
  SyncKmdiceBettingPayload
};
