// @flow

type ErrorType = {
  context: {
    action: string, // eg: COIN_TRANSACTIONS_LOAD
    // eslint-disable-next-line flowtype/no-weak-types
    params: Object
  },
  type: string, // eg: ApiError
  message: string,
  ok: string
};

export type { ErrorType };
