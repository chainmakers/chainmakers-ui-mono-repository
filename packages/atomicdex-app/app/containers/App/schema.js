// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type UTXOType = {
  height: number,
  tx_hash: string,
  tx_pos: number,
  value: number
};

type LoginPayload = {
  passphrase: string
};

type EelectrumServerType = {
  host: string,
  port: number
};

type CoinConfigType = {
  id: string,
  coin: string,
  name: string,
  electrumServers: Array<EelectrumServerType>,
  marketCap: number,
  active: number
};

type AddElectrumPayload = {
  txversion: number,
  urls: Array<string>,
  coin: string
};

type AddElectrumSuccessPayload = {
  address: string,
  balance: number,
  coin: string,
  fee: number
};

type LoadbalacePayload = {
  coin: string
};

type LoadBalanceSuccessPayload = {
  address: string,
  balance: number,
  coin: string,
  fee: number
};

export type {
  UTXOType,
  LoginPayload,
  CoinConfigType,
  AddElectrumPayload,
  AddElectrumSuccessPayload,
  LoadbalacePayload,
  LoadBalanceSuccessPayload
};
