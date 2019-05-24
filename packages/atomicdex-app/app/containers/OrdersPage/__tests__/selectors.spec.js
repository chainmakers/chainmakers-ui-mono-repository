// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectOrder,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectPriceEntities,
  makeSelectBuying,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectCurrentSwap,
  makeSelectCurrentSwaps,
  makeSelectFinishedSwaps,
  makeSelectSwapInDetailModal,
  makeSelectSwapDetailModal,
  makeSelectCoinModal,
  makeSelectCurrency,
  makeSelectPayment,
  makeSelectOrderbook,
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie,
  makeSelectOrderbookAsks,
  makeSelectOrderbookBids,
  makeSelectOrderbookFetchStatus
} from '../selectors';

describe('containers/OrderPage/selectors/selectOrder', () => {
  it('should select the order state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectOrder(mockedState)).toEqual(initialState);
  });
});

describe('containers/DexPage/selectors/makeSelectPrices', () => {
  it('should select the prices state', () => {
    let mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectSelectPrices = makeSelectPrices();
    expect(selectSelectPrices(mockedState)).toEqual(initialState.get('prices'));

    const selectSelectPricesLoading = makeSelectPricesLoading();
    expect(selectSelectPricesLoading(mockedState)).toEqual(
      initialState.getIn(['prices', 'loading'])
    );

    const selectSelectPricesError = makeSelectPricesError();
    expect(selectSelectPricesError(mockedState)).toEqual(
      initialState.getIn(['prices', 'error'])
    );

    const selectSelectPricesEntities = makeSelectPricesEntities();
    expect(selectSelectPricesEntities(mockedState)).toEqual(
      initialState.getIn(['prices', 'entities'])
    );

    const selectSelectPriceEntities = makeSelectPriceEntities();
    expect(selectSelectPriceEntities(mockedState)).toEqual(null);
    const KMD = {
      hello: 'wold'
    };
    mockedState = fromJS({
      [APP_STATE_NAME]: initialState
        .setIn(['payment', 'name'], 'Komodo')
        .setIn(['payment', 'symbol'], 'KMD')
        .setIn(
          ['prices', 'entities'],
          fromJS({
            KMD
          })
        )
    });
    expect(selectSelectPriceEntities(mockedState)).toEqual(fromJS(KMD));
  });
});

describe('containers/DexPage/selectors/makeSelectBuying', () => {
  it('should select the prices state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectSelectBuying = makeSelectBuying();
    expect(selectSelectBuying(mockedState)).toEqual(initialState.get('buying'));

    const selectSelectBuyingLoading = makeSelectBuyingLoading();
    expect(selectSelectBuyingLoading(mockedState)).toEqual(
      initialState.getIn(['buying', 'loading'])
    );

    const selectSelectBuyingError = makeSelectBuyingError();
    expect(selectSelectBuyingError(mockedState)).toEqual(
      initialState.getIn(['buying', 'error'])
    );
  });
});

describe('containers/DexPage/selectors/makeSelectSwaps', () => {
  it('should select the swaps state', () => {
    const uuid = 'uuid';
    let store = initialState;
    let processingList = store.getIn(['swaps', 'processingList']);
    let entities = initialState.getIn(['swaps', 'entities']);
    processingList = processingList.push(uuid);
    const entity = fromJS({
      uuid
    });
    const expectedResult = fromJS([entity]);
    entities = entities.set(uuid, entity);
    store = store
      .setIn(['swaps', 'processingList'], processingList)
      .setIn(['swaps', 'entities'], entities);

    let mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectCurrentSwaps = makeSelectCurrentSwaps();
    expect(selectCurrentSwaps(mockedState)).toEqual(expectedResult);

    const selectFinishedSwaps = makeSelectFinishedSwaps();
    expect(selectFinishedSwaps(mockedState)).toEqual(fromJS([]));

    const selectCurrentSwap = makeSelectCurrentSwap();
    expect(selectCurrentSwap(mockedState)).toEqual(null);

    mockedState = fromJS({
      [APP_STATE_NAME]: store.setIn(['swaps', 'currentSwap'], uuid)
    });
    expect(selectCurrentSwap(mockedState)).toEqual(entity);
  });
});

describe('containers/DexPage/selectors/makeSelectSwapDetailModal', () => {
  it('should select the SwapDetailModal state', () => {
    const uuid = 'uuid';
    let store = initialState;
    let processingList = store.getIn(['swaps', 'processingList']);
    let entities = initialState.getIn(['swaps', 'entities']);
    processingList = processingList.push(uuid);
    const entity = fromJS({
      uuid
    });
    entities = entities.set(uuid, entity);
    store = store
      .setIn(['swaps', 'processingList'], processingList)
      .setIn(['swaps', 'entities'], entities)
      .set(
        'swapDetailModal',
        fromJS({
          open: false,
          uuid: null
        })
      );
    let mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectSwapDetailModal = makeSelectSwapDetailModal();
    expect(selectSwapDetailModal(mockedState)).toEqual(
      store.get('swapDetailModal')
    );

    const selectSwapInDetailModal = makeSelectSwapInDetailModal();
    expect(selectSwapInDetailModal(mockedState)).toEqual(null);

    store = store
      .setIn(['swaps', 'processingList'], processingList)
      .setIn(['swaps', 'entities'], entities)
      .set(
        'swapDetailModal',
        fromJS({
          open: false,
          uuid
        })
      );
    mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    expect(selectSwapDetailModal(mockedState)).toEqual(
      store.get('swapDetailModal')
    );
    expect(selectSwapInDetailModal(mockedState)).toEqual(entity);
  });
});

describe('containers/DexPage/selectors/makeSelectCoinModal', () => {
  it('should select the selectCoinModal state', () => {
    let store = initialState;
    store = store.set(
      'selectCoinModal',
      fromJS({
        open: false,
        uuid: null
      })
    );
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectCoinModal = makeSelectCoinModal();
    expect(selectCoinModal(mockedState)).toEqual(store.get('selectCoinModal'));
  });
});

describe('containers/DexPage/selectors/makeSelectCurrency', () => {
  it('should select the makeSelectCurrency state', () => {
    const store = initialState;
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectCurrency = makeSelectCurrency();
    expect(selectCurrency(mockedState)).toEqual(store.get('currency'));
  });
});

describe('containers/DexPage/selectors/makeSelectPayment', () => {
  it('should select the makeSelectPayment state', () => {
    const store = initialState;
    const mockedState = fromJS({
      [APP_STATE_NAME]: store
    });
    const selectPayment = makeSelectPayment();
    expect(selectPayment(mockedState)).toEqual(store.get('payment'));
  });
});

describe('containers/OrderPage/selectors/makeSelectOrderbook', () => {
  it('should select the orderbook state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectOrderbook = makeSelectOrderbook();
    expect(selectOrderbook(mockedState)).toEqual(initialState.get('orderbook'));

    const selectOrderbookDeposit = makeSelectOrderbookDeposit();
    expect(selectOrderbookDeposit(mockedState)).toEqual('BTC');

    const selectOrderbookRecevie = makeSelectOrderbookRecevie();
    expect(selectOrderbookRecevie(mockedState)).toEqual('KMD');

    const selectOrderbookAsks = makeSelectOrderbookAsks();
    expect(selectOrderbookAsks(mockedState)).toEqual(
      fromJS([
        {
          zcredits: 0,
          pubkey:
            '90f44b66caae7e0d842a1a3e4f0b50e09d251a300987d85a9a7b136485744c09',
          depth: 0,
          price: 0.00015103,
          avevolume: 0,
          coin: 'KMD',
          address: 'RV6YDG8pe8EaqTFUSs41QUF5obm2rqZuBb',
          numutxos: 0,
          maxvolume: 50.46521858,
          age: 2
        },
        {
          zcredits: 0,
          pubkey:
            'bab6ad2eebe1e666369cab504d4622b22c1f1ef718ef388e88020f30a1573e01',
          depth: 0,
          price: 0.00015103,
          avevolume: 0,
          coin: 'KMD',
          address: 'RT9MpMyucqXiX8bZLimXBnrrn2ofmdGNKd',
          numutxos: 0,
          maxvolume: 36.40686108,
          age: 10
        }
      ])
    );

    const selectOrderbookBids = makeSelectOrderbookBids();
    expect(selectOrderbookBids(mockedState)).toEqual(
      fromJS([
        {
          zcredits: 0,
          pubkey:
            'bab6ad2eebe1e666369cab504d4622b22c1f1ef718ef388e88020f30a1573e01',
          depth: 0,
          price: 0.00014923,
          avevolume: 0,
          coin: 'BTC',
          address: '1JsAjr6d21j9T8EMsYnQ6GXf1mM523JAv1',
          numutxos: 0,
          maxvolume: 0.02620853,
          age: 10
        },
        {
          zcredits: 0,
          pubkey:
            '90f44b66caae7e0d842a1a3e4f0b50e09d251a300987d85a9a7b136485744c09',
          depth: 0,
          price: 0.00014923,
          avevolume: 0,
          coin: 'BTC',
          address: '1LpM8kFY3JS1mStGyh4tJwut3LJS8opQiw',
          numutxos: 0,
          maxvolume: 0.01812016,
          age: 2
        }
      ])
    );
    const selectOrderbookFetchStatus = makeSelectOrderbookFetchStatus();
    expect(selectOrderbookFetchStatus(mockedState)).toEqual(null);
  });
});
