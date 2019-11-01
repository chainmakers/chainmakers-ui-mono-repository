// @flow

import { take, put } from 'redux-saga/effects';
import { openSnackbars } from '../../../Snackbars/actions';
import handlingBettingError from '../handlingBettingError';
import { startKmdiceBettingError } from '../../actions';
import { KMDICE_BETTING_START_ERROR } from '../../constants';

describe('containers/DicePage/saga/handlingBettingError', () => {
  const errorRPCType = {
    context: {
      action: 'rpc:call',
      params: []
    },
    type: 'komodod',
    message: 'no message',
    ok: 'failed'
  };
  it('should handle handlingBettingError correctly', done => {
    const gen = handlingBettingError();

    expect(gen.next().value).toEqual(take(KMDICE_BETTING_START_ERROR));

    expect(gen.next(startKmdiceBettingError(errorRPCType)).value).toEqual(
      put(openSnackbars(errorRPCType.message))
    );

    done();
  });
});
