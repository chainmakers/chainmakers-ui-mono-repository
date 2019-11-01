// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type UTXOType = {
  height: number,
  tx_hash: string,
  tx_pos: number,
  value: number
};

type BalancePayload = {
  address: string,
  balance: number,
  coin: string,
  fee: number
  // utxo: Array<UTXOType>
};

export type { UTXOType, BalancePayload };
