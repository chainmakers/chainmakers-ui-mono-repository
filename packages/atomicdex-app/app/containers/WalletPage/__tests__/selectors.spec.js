import { fromJS } from 'immutable';
import each from 'lodash/each';
import take from 'lodash/take';
import concat from 'lodash/concat';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectWallet,
  makeSelectTransactionsLoading,
  makeSelectTransactionsCoins,
  makeSelectLatestTransactions,
  makeSelectJoyride,
  makeSelectJoyrideOpenState,
  makeSelectAssetModal,
  makeSelectCoinAssetModal,
  makeSelectLoadingAssetModal,
  makeSelectTabAssetModal,
  makeSelectErrorAssetModal
} from '../selectors';
import data from '../../__tests__/app-state.json';

describe('containers/WalletPage/selectors/selectWallet', () => {
  it('should select the wallet state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectWallet(mockedState)).toEqual(initialState);
  });
});

describe('containers/WalletPage/selectors/makeSelectTransactionsLoading', () => {
  it('should select the withdrawModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectTransactionsLoading = makeSelectTransactionsLoading();
    expect(selectTransactionsLoading(mockedState)).toEqual(
      initialState.getIn(['transactions', 'loading'])
    );
  });
});

describe('containers/WalletPage/selectors/makeSelectTransactionsCoins', () => {
  it('should select the TransactionsCoins state', () => {
    const mockedState = fromJS(data);
    const expected = fromJS(data.wallet.transactions.coins);
    const selectTransactionsCoins = makeSelectTransactionsCoins();
    expect(selectTransactionsCoins(mockedState)).toEqual(expected);
  });
});

describe('containers/WalletPage/selectors/makeSelectLatestTransactions', () => {
  it('should select the TransactionsCoins state', () => {
    const mockedState = fromJS(data);
    let expected = [];

    each(data.wallet.transactions.coins, v => {
      let lastTx = take(v.list, 10);
      lastTx = lastTx.map(e => v.entities[e]);
      expected = concat(expected, lastTx);
    });
    const selectTransactionsCoins = makeSelectLatestTransactions();
    expect(selectTransactionsCoins(mockedState)).toEqual(fromJS(expected));
  });
});

describe('containers/WalletPage/selectors/makeSelectJoyride', () => {
  it('should select the joyride state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectJoyride = makeSelectJoyride();
    expect(selectJoyride(mockedState)).toEqual(initialState.get('joyride'));
  });
});

describe('containers/WalletPage/selectors/makeSelectJoyrideOpenState', () => {
  it('should select the joyride state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectJoyrideOpenState = makeSelectJoyrideOpenState();
    expect(selectJoyrideOpenState(mockedState)).toEqual(false);
  });
});

describe('containers/WalletPage/selectors/makeSelectAssetModal', () => {
  it('should select the assetModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectAssetModal = makeSelectAssetModal();
    expect(selectAssetModal(mockedState)).toEqual(
      initialState.get('assetModal')
    );
  });
});

describe('containers/WalletPage/selectors/makeSelectCoinAssetModal', () => {
  const coin = 'KMD';
  it('should select the coin from assetModal state', () => {
    let mockedState = fromJS(data);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'assetModal', 'coin'],
      coin
    );

    const selectCoinAssetModal = makeSelectCoinAssetModal();
    expect(selectCoinAssetModal(mockedState)).toEqual(coin);
  });
});

describe('containers/WalletPage/selectors/makeSelectLoadingAssetModal', () => {
  it('should select the assetModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectLoadingAssetModal = makeSelectLoadingAssetModal();
    expect(selectLoadingAssetModal(mockedState)).toEqual(false);
  });
});

describe('containers/WalletPage/selectors/makeSelectTabAssetModal', () => {
  it('should select the assetModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectTabAssetModal = makeSelectTabAssetModal();
    expect(selectTabAssetModal(mockedState)).toEqual(1);
  });
});

describe('containers/WalletPage/selectors/makeSelectErrorAssetModal', () => {
  it('should select the withdrawModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectErrorAssetModal = makeSelectErrorAssetModal();
    expect(selectErrorAssetModal(mockedState)).toEqual(false);
  });
});
