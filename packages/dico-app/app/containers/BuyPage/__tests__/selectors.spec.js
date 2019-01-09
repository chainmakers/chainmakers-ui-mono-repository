// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectBuying,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectCurrentSwap,
  makeSelectCurrentSwaps,
  makeSelectFinishedSwaps,
  makeSelectSwapInDetailModal,
  makeSelectSwapDetailModal
} from '../selectors';

describe('containers/BuyPage/selectors/selectBuy', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectBuy(mockedState)).toEqual(initialState);
  });
});

describe('containers/BuyPage/selectors/makeSelectPrices', () => {
  it('should select the prices state', () => {
    const mockedState = fromJS({
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
  });
});

describe('containers/BuyPage/selectors/makeSelectBuying', () => {
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

describe('containers/BuyPage/selectors/makeSelectSwaps', () => {
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

describe('containers/BuyPage/selectors/makeSelectSwapDetailModal', () => {
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
