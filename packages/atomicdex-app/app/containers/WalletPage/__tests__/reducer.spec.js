// @flow
import { fromJS } from 'immutable';
import walletReducer, {
  initialState,
  generateCoinTransactionRecord
} from '../reducer';
import { WITHDRAW_LOAD } from '../constants';
import {
  loadTransactions,
  loadCoinTransactions,
  loadCoinTransactionsSuccess,
  openJoyride,
  closeJoyride,
  loadWithdraw,
  loadWithdrawSuccess,
  loadWithdrawError,
  openAssetModal,
  closeAssetModal,
  openRemoveElectrumModal,
  closeRemoveElectrumModal
} from '../actions';
import type { ErrorType } from '../../schema';

describe('containers/WalletPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(walletReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/WalletPage/reducers/loadTransactions', () => {
  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = initialState.setIn(
      ['transactions', 'loading'],
      true
    );

    expect(walletReducer(initialState, loadTransactions())).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/loadWithdraw', () => {
  const payload = {
    amount: 0.1,
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    coin: 'BEER'
  };
  it('should handle the loadWithdraw action correctly', () => {
    const expectedResult = initialState
      .setIn(['assetModal', 'loading'], true)
      .setIn(['assetModal', 'error'], false);

    expect(walletReducer(initialState, loadWithdraw(payload))).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/loadWithdrawSuccess', () => {
  const payload = {
    amount: 0.1,
    address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
    coin: 'BEER'
  };
  it('should handle the loadWithdrawSuccess action correctly', () => {
    const store = initialState
      .setIn(['assetModal', 'loading'], true)
      .setIn(['assetModal', 'error'], false);

    expect(walletReducer(store, loadWithdrawSuccess(payload))).toEqual(
      initialState
    );
  });
});

describe('containers/WalletPage/reducers/loadWithdrawError', () => {
  const error: ErrorType = {
    context: {
      action: WITHDRAW_LOAD,
      params: {
        amount: 0.1,
        address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
        coin: 'BEER'
      }
    },
    type: 'RPC',
    message: "can't connect to electrum server"
  };
  it('should handle the loadWithdrawError action correctly', () => {
    const expectedResult = initialState
      .setIn(['assetModal', 'loading'], false)
      .setIn(['assetModal', 'error'], fromJS(error));

    expect(walletReducer(initialState, loadWithdrawError(error))).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/loadCoinTransactions', () => {
  const data = {
    result: 'success',
    status: 'queued',
    coin: 'KMD',
    queueId: 23
  };
  it('should handle the loadCoinTransactions action correctly', () => {
    const expectedResult = initialState
      .setIn(
        ['transactions', 'queueids'],
        fromJS({
          [data.queueId]: data.coin
        })
      )
      .setIn(
        ['transactions', 'coins'],
        fromJS({
          [data.coin]: generateCoinTransactionRecord()
        })
      );

    expect(walletReducer(initialState, loadCoinTransactions(data))).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/loadCoinTransactionsSuccess', () => {
  const data = {
    tx: [
      {
        blockindex: 113219,
        time: 1536044818,
        coin: 'EQL',
        amount: 0,
        blocktime: 1536044818,
        blockhash:
          '00199333193a4b497e87992ffd9ed77794bc4033018c54fe0ada0e24ec2f2a3b',
        category: 'send',
        confirmations: 59241,
        txid: '8fe21901c37c49b977b7468edac6956c33b5da7b17f8444e96b946f038a3f422'
      },
      {
        blockindex: 26807,
        time: 1529678697,
        coin: 'EQL',
        amount: 0.99369084,
        blocktime: 1529678697,
        blockhash:
          '009897e07d1148dbe462baaea6090625da53197e84aa93e1aad0057d7ad4649c',
        category: 'receive',
        confirmations: 145653,
        txid: 'ac87f71d5d67d66b5201bb75146f3c4d7558c79d907d35603ba44f242d2146ef'
      },
      {
        blockindex: 17670,
        time: 1528946187,
        coin: 'EQL',
        amount: 0.10431096,
        blocktime: 1528946187,
        blockhash:
          '002f9ea8d288d56733b637d0962d77c4af88ecf0a61261b270ab601d30f56081',
        category: 'receive',
        confirmations: 154790,
        txid: '8de739b6e1d065a370cb863ebb3798ac6143a80ea58152def783ed68bcfa5c1b'
      },
      {
        blockindex: 16099,
        time: 1528852157,
        coin: 'EQL',
        amount: 1.01315069,
        blocktime: 1528852157,
        blockhash:
          '02ca30ec3fc1f7eb06b1c2ded50f4cf9f8def2a4414a99c1f16f44025d8a2a10',
        category: 'receive',
        confirmations: 156361,
        txid: 'd5bbcbace5c21c0317f29e7a43dbce7540f34dd5872e74d9e47fb6417c74bfe0'
      }
    ],
    coin: 'EQL',
    queueId: '5'
  };

  it('should handle the loadCoinTransactionsSuccess action correctly', () => {
    let store = initialState.setIn(
      ['transactions', 'queueids'],
      fromJS({
        [data.queueId]: data.coin
      })
    );

    let coin = generateCoinTransactionRecord();
    store = store.setIn(['transactions', 'coins', data.coin], coin);
    let list = coin.get('list');
    let entities = coin.get('entities');
    for (let i = 0; i < data.tx.length; i += 1) {
      const t = data.tx[i];
      // step one: update list
      if (!list.find(e => e === t.txid)) {
        list = list.push(t.txid);
      }
      // step two: update entities
      if (!entities.get(t.txid)) {
        entities = entities.set(t.txid, fromJS(t));
      }
    }
    coin = coin.set('list', list).set('entities', entities);
    const expectedResult = store
      .setIn(['transactions', 'coins', data.coin], coin)
      .setIn(['transactions', 'queueids'], fromJS({}));

    expect(walletReducer(store, loadCoinTransactionsSuccess(data))).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/openJoyride', () => {
  it('should handle the openJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(walletReducer(initialState, openJoyride())).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/reducers/closeJoyride', () => {
  it('should handle the closeJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(walletReducer(expectedResult, closeJoyride())).toEqual(initialState);
  });
});

describe('containers/WalletPage/reducers/openAssetModal', () => {
  const payload = {
    coin: 'KMD',
    tab: 2
  };
  it('should handle the openAssetModal action correctly', () => {
    const expectedResult = initialState
      .setIn(['assetModal', 'open'], true)
      .setIn(['assetModal', 'coin'], payload.coin)
      .setIn(['assetModal', 'tab'], payload.tab);

    expect(walletReducer(initialState, openAssetModal(payload))).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/closeAssetModal', () => {
  it('should handle the closeAssetModal action correctly', () => {
    const expectedResult = initialState.setIn(['assetModal', 'open'], false);

    expect(walletReducer(initialState, closeAssetModal())).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/openRemoveElectrumModal', () => {
  const coin = 'KMD';

  it('should handle the openRemoveElectrumModal action correctly', () => {
    const expectedResult = initialState
      .setIn(['removingElectrumModal', 'open'], true)
      .setIn(['removingElectrumModal', 'coin'], coin);

    expect(walletReducer(initialState, openRemoveElectrumModal(coin))).toEqual(
      expectedResult
    );

    expect(walletReducer(expectedResult, closeRemoveElectrumModal())).toEqual(
      expectedResult.setIn(['removingElectrumModal', 'open'], false)
    );
  });
});
