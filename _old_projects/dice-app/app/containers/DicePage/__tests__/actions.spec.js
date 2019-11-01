// @flow

import {
  startKmdiceBetting,
  insertKmdiceBetting,
  startKmdiceBettingSuccess,
  startKmdiceBettingError,
  syncKmdiceBetting
} from '../actions';
import {
  KMDICE_BETTING_START,
  KMDICE_BETTING_INSERT,
  KMDICE_BETTING_START_SUCCESS,
  KMDICE_BETTING_START_ERROR,
  KMDICE_BETTING_SYNC
} from '../constants';
import type { StartKmdiceBettingSuccessPayload, ErrorRPCType } from '../schema';

const time = new Date('1995-12-17T03:24:00');

describe('containers/DicePage/actions/startKmdiceBetting', () => {
  const startKmdiceBettingPayload = {
    numberToBet: 23,
    amount: 0.1
  };

  it('should startKmdiceBetting should create startKmdiceBetting action', () => {
    expect(startKmdiceBetting(startKmdiceBettingPayload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_BETTING_START,
      payload: startKmdiceBettingPayload
    };

    expect(startKmdiceBetting(startKmdiceBettingPayload)).toEqual(
      expectedResult
    );
  });
});

describe('containers/DicePage/actions/insertKmdiceBetting', () => {
  const insertKmdiceBettingPayload = {
    id: 1,
    time,
    numberToBet: 23,
    amount: 0.1
  };

  it('should insertKmdiceBetting should create insertKmdiceBetting action', () => {
    expect(insertKmdiceBetting(insertKmdiceBettingPayload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_BETTING_INSERT,
      payload: insertKmdiceBettingPayload
    };

    expect(insertKmdiceBetting(insertKmdiceBettingPayload)).toEqual(
      expectedResult
    );
  });
});

describe('containers/DicePage/actions/startKmdiceBettingSuccess', () => {
  const startKmdiceBettingSuccessPayload: StartKmdiceBettingSuccessPayload = {
    bettxid: 'bettxid',
    id: 1,
    status: 'PENDING'
  };

  it('should startKmdiceBettingSuccess should create startKmdiceBettingSuccess action', () => {
    expect(
      startKmdiceBettingSuccess(startKmdiceBettingSuccessPayload)
    ).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_BETTING_START_SUCCESS,
      payload: startKmdiceBettingSuccessPayload
    };

    expect(startKmdiceBettingSuccess(startKmdiceBettingSuccessPayload)).toEqual(
      expectedResult
    );
  });
});

describe('containers/DicePage/actions/startKmdiceBettingError', () => {
  const errorRPCType: ErrorRPCType = {
    context: {
      action: 'rpc:call',
      params: []
    },
    type: 'komodod',
    message: 'no message',
    ok: 'failed'
  };

  it('should startKmdiceBettingError should create startKmdiceBettingError action', () => {
    expect(startKmdiceBettingError(errorRPCType)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_BETTING_START_ERROR,
      payload: errorRPCType
    };

    expect(startKmdiceBettingError(errorRPCType)).toEqual(expectedResult);
  });
});

describe('containers/DicePage/actions/syncKmdiceBetting', () => {
  const syncKmdiceBettingPayload: SyncKmdiceBettingPayload = {
    bettxid: 'bettxid',
    id: 1
  };

  it('should syncKmdiceBetting should create syncKmdiceBetting action', () => {
    expect(syncKmdiceBetting(syncKmdiceBettingPayload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: KMDICE_BETTING_SYNC,
      payload: syncKmdiceBettingPayload
    };

    expect(syncKmdiceBetting(syncKmdiceBettingPayload)).toEqual(expectedResult);
  });
});
