// @flow

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
          type: KMDICE_CHAIN_START,
          payload: {}
        }
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        { type: KMDICE_CHAIN_GET_INFO },
        {
          type: KMDICE_CHAIN_START_SUCCESS,
          payload: {
            pubkey: null
          }
        }
      ]);

      done();
    },
    TIMEOUT
  );

  it(
    'should handle startKMDiceChainSaga correctly with pubkey option',
    async done => {
      const pubkey = 'pubkey';
      const dispatched = [];
      const store = fromJS(data);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        startKMDiceChainSaga,
        {
          type: KMDICE_CHAIN_START,
          payload: {
            pubkey
          }
        }
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        { type: KMDICE_CHAIN_GET_INFO },
        {
          type: KMDICE_CHAIN_START_SUCCESS,
          payload: {
            pubkey
          }
        }
      ]);

      done();
    },
    TIMEOUT
  );
});
