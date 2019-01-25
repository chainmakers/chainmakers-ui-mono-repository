import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import startKMDiceChainSaga from '../startKMDiceChainSaga';
import {
  KMDICE_CHAIN_START,
  KMDICE_CHAIN_GET_INFO,
  KMDICE_CHAIN_START_SUCCESS
} from '../../constants';
import data from '../../../__tests__/app-state.json';

const TIMEOUT = 10 * 100;

describe('containers/App/saga/startKMDiceChainSaga', () => {
  it(
    'should handle startKMDiceChainSaga correctly',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        startKMDiceChainSaga,
        {
          payload: {
            type: KMDICE_CHAIN_START
          }
        }
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        { type: KMDICE_CHAIN_GET_INFO },
        { type: KMDICE_CHAIN_START_SUCCESS }
      ]);

      done();
    },
    TIMEOUT
  );
});
