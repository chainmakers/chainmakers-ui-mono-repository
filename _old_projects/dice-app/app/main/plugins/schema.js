// @flow

type ErrorRPCType = {
  context: {
    action: string, // eg: COIN_TRANSACTIONS_LOAD
    params: Object
  },
  type: string, // eg: ApiError
  message: string,
  ok: string
};

export type { ErrorRPCType };
