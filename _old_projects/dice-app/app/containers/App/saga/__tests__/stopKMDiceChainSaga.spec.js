// @flow

import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import stopKMDiceChainSaga from '../stopKMDiceChainSaga';
import { KMDICE_CHAIN_STOP } from '../../constants';
import data from '../../../__tests__/app-state.json';

const TIMEOUT = 10 * 100;

describe('containers/App/saga/stopKMDiceChainSaga', () => {
  it(
    'should handle stopKMDiceChainSaga correctly',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        stopKMDiceChainSaga,
        {
          payload: {
            type: KMDICE_CHAIN_STOP
          }
        }
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([]);

      done();
    },
    TIMEOUT
  );
});
