import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import { syncKMDiceChainInfoFunc } from '../syncKMDiceChainInfo';
import { KMDICE_CHAIN_GET_INFO_SUCCESS } from '../../constants';
import data from '../../../__tests__/app-state.json';

const TIMEOUT = 20 * 1000;

describe('containers/App/saga/syncKMDiceChainInfoFunc', () => {
  it(
    'should handle syncKMDiceChainInfoFunc correctly',
    async done => {
      const dispatched = [];
      const store = fromJS(data);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        syncKMDiceChainInfoFunc,
        1
      ).done;
      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        {
          payload: { action: 'getinfo' },
          type: KMDICE_CHAIN_GET_INFO_SUCCESS
        }
      ]);

      done();
    },
    TIMEOUT
  );
});
