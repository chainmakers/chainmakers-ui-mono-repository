import { cloneDeep, last } from 'lodash';
import { fromJS } from 'immutable';
import buyReducer, { initialState } from '../reducer';
import {
  loadPrices,
  loadBuyCoin,
  loadBuyCoinSuccess,
  loadBuyCoinError,
  loadRecentSwapsDataFromWebsocket,
  loadRecentSwapsCoin,
  timeoutSwap,
  makeANewSwap,
  openSelectCoinModal,
  closeSelectCoinModal,
  clickSelectCoinModal,
  selectCoinPayment,
  skipSearchStateCreation,
  openJoyride,
  closeJoyride
} from '../actions';
import { SWAP_TX_DEFAULT, SEARCH_STATE_READY } from '../constants';
import {
  WEBSOCKET_STATE_ZERO,
  WEBSOCKET_STATE_ONE,
  WEBSOCKET_STATE_TWO,
  WEBSOCKET_STATE_THREE,
  WEBSOCKET_STATE_FOUR,
  WEBSOCKET_STATE_FIVE,
  WEBSOCKET_STATE_SIX,
  WEBSOCKET_STATE_SEVEN,
  SWAP_STATE_ZERO
  // LOAD_SWAP_SUCCESS
} from '../../__tests__/fake-data';
import SWAP_STATE_TEN from '../../__tests__/swap-status.json';
import BUY_STATE from '../../__tests__/buy.json';

describe('containers/DexPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(buyReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/DexPage/reducers/loadPrices', () => {
  it('should handle the loadPrices action correctly', () => {
    const expectedResult = initialState
      .setIn(['prices', 'loading'], true)
      .setIn(['prices', 'error'], false);

    expect(buyReducer(initialState, loadPrices())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/loadBuyCoin', () => {
  it('should handle the loadBuyCoin action correctly', () => {
    const expectedResult = initialState
      .setIn(['buying', 'loading'], true)
      .setIn(['buying', 'error'], false);

    expect(
      buyReducer(
        initialState,
        loadBuyCoin({
          basecoin: 'BTC',
          paymentcoin: 'KMD',
          amount: 10.123
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/loadBuyCoinError', () => {
  it('should handle the loadBuyCoinError action correctly', () => {
    const message = 'Not enough balance!';
    const expectedResult = initialState
      .setIn(['buying', 'loading'], false)
      .setIn(['buying', 'error'], {
        message
      });

    expect(buyReducer(initialState, loadBuyCoinError(message))).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/loadRecentSwapsDataFromWebsocket', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue,
    bobsmartaddress,
    alicesmartaddress
  } = WEBSOCKET_STATE_ZERO;
  let store = initialState
    .setIn(['swaps', 'processingList'], fromJS([uuid]))
    .setIn(
      ['swaps', 'entities'],
      fromJS({
        [uuid]: {
          id: tradeid,
          uuid,
          requestid,
          quoteid,
          expiration,
          bob,
          alice,
          bobsmartaddress,
          alicesmartaddress,
          bobamount: basevalue,
          aliceamount: relvalue,
          sentflags: [],
          status: 'pending',
          myfee: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          bobdeposit: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          alicepayment: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          bobpayment: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          alicespend: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          }
        }
      })
    );

  it('should handle the loadRecentSwapsDataFromWebsocket action correctly', () => {
    let entities = store.getIn(['swaps', 'entities']);
    let entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(['myfee']))
      .set('expiration', WEBSOCKET_STATE_ONE.result.expiration)
      .set(
        'myfee',
        fromJS({
          coin: WEBSOCKET_STATE_ONE.result.coin,
          tx: WEBSOCKET_STATE_ONE.result.txid,
          value: WEBSOCKET_STATE_ONE.result.amount
        })
      );
    let expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_ONE.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_TWO.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_THREE.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_THREE.result.expiration)
      .set(
        'bobdeposit',
        fromJS({
          coin: WEBSOCKET_STATE_THREE.result.coin,
          tx: WEBSOCKET_STATE_THREE.result.txid,
          value: WEBSOCKET_STATE_THREE.result.amount
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_THREE.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_THREE.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_FOUR.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_FOUR.result.expiration)
      .set(
        'alicepayment',
        fromJS({
          coin: WEBSOCKET_STATE_FOUR.result.coin,
          tx: WEBSOCKET_STATE_FOUR.result.txid,
          value: WEBSOCKET_STATE_FOUR.result.amount
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FOUR.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FOUR.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity.set('expiration', WEBSOCKET_STATE_FIVE.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_SIX.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_SIX.result.expiration)
      .set(
        'bobpayment',
        fromJS({
          coin: WEBSOCKET_STATE_SIX.result.coin,
          tx: WEBSOCKET_STATE_SIX.result.txid,
          value: WEBSOCKET_STATE_SIX.result.amount
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    const d = WEBSOCKET_STATE_SEVEN.result.txChain.find(
      e => e.stage === 'alicespend'
    );
    entity = entity
      .set('sentflags', fromJS(WEBSOCKET_STATE_SEVEN.result.sentflags))
      .set('expiration', WEBSOCKET_STATE_SEVEN.result.expiration)
      .set('status', 'finished')
      .set(
        'alicespend',
        fromJS({
          coin: d.coin,
          tx: d.txid,
          value: d.amount
        })
      );
    expectedResult = store
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]))
      .setIn(['swaps', 'entities'], entities.set(uuid, entity));
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SEVEN.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SEVEN.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
    );
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/loadRecentSwapsCoin', () => {
  const {
    result: { events }
  } = SWAP_STATE_TEN;

  const { length } = events;

  const SWAP_STATE_NINE = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_NINE.result.events = events.slice(0, length - 1);
  // console.log(JSON.stringify(SWAP_STATE_NINE), 'SWAP_STATE_NINE');

  const SWAP_STATE_EIGHT = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_EIGHT.result.events = events.slice(0, length - 2);

  const SWAP_STATE_SEVEN = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_SEVEN.result.events = events.slice(0, length - 3);

  const SWAP_STATE_SIX = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_SIX.result.events = events.slice(0, length - 4);

  const SWAP_STATE_FIVE = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_FIVE.result.events = events.slice(0, length - 5);

  const SWAP_STATE_FOUR = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_FOUR.result.events = events.slice(0, length - 6);

  const SWAP_STATE_THREE = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_THREE.result.events = events.slice(0, length - 7);

  const SWAP_STATE_TWO = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_TWO.result.events = events.slice(0, length - 8);

  const SWAP_STATE_ONE = cloneDeep(SWAP_STATE_TEN);
  SWAP_STATE_ONE.result.events = events.slice(0, length - 9);

  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue,
    bobsmartaddress,
    alicesmartaddress
  } = BUY_STATE.pending;
  let store = initialState
    .setIn(['swaps', 'processingList'], fromJS([uuid]))
    .setIn(
      ['swaps', 'entities'],
      fromJS({
        [uuid]: {
          id: tradeid,
          uuid,
          requestid,
          quoteid,
          expiration,
          bob,
          alice,
          bobsmartaddress,
          alicesmartaddress,
          bobamount: basevalue,
          aliceamount: relvalue,
          sentflags: [],
          status: 'pending',
          myfee: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          bobdeposit: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          alicepayment: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          bobpayment: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          },
          alicespend: {
            tx: SWAP_TX_DEFAULT,
            value: 0
          }
        }
      })
    );

  it('should handle the loadRecentSwapsCoin action correctly', () => {
    let entities = store.getIn(['swaps', 'entities']);
    let entity = entities.get(uuid);
    let lastEvent = last(SWAP_STATE_ONE.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type)
      .set('expiration', 1556263774);
    let expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_TWO.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_THREE.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type)
      .set(
        'myfee',
        fromJS({
          coin: entity.get('alice'),
          tx: lastEvent.event.data.tx_hash,
          value: 0
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_FOUR.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type)
      .set(
        'bobdeposit',
        fromJS({
          coin: entity.get('bob'),
          tx: lastEvent.event.data.tx_hash,
          value: 0
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_FIVE.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_SIX.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SIX));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_SEVEN.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type)
      .set(
        'alicepayment',
        fromJS({
          coin: entity.get('alice'),
          tx: lastEvent.event.data.tx_hash,
          value: 0
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SEVEN));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SIX));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_EIGHT.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type)
      .set(
        'alicespend',
        fromJS({
          coin: entity.get('alice'),
          tx: lastEvent.event.data.transaction.tx_hash,
          value: 0
        })
      );

    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_EIGHT));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SEVEN));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SIX));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_NINE.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type)
      .set(
        'bobpayment',
        fromJS({
          coin: entity.get('bob'),
          tx: lastEvent.event.data.tx_hash,
          value: 0
        })
      );

    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_NINE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_EIGHT));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SEVEN));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SIX));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    lastEvent = last(SWAP_STATE_TEN.result.events);
    entity = entity
      .set('sentflags', entity.get('sentflags').push(lastEvent.event.type))
      .set('status', lastEvent.event.type);

    expectedResult = store
      .setIn(['swaps', 'entities'], entities.set(uuid, entity))
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]));
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TEN));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_NINE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_EIGHT));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SEVEN));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_SIX));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    /**
    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    const d3 = SWAP_STATE_THREE.txChain.find(e => e.stage === 'alicepayment');
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_THREE.sentflags))
      .set('expiration', SWAP_STATE_THREE.expiration)
      .set('requestid', SWAP_STATE_THREE.requestid)
      .set('quoteid', SWAP_STATE_THREE.quoteid)
      .set('bobamount', SWAP_STATE_THREE.srcamount)
      .set('aliceamount', SWAP_STATE_THREE.destamount)
      .set(
        'alicepayment',
        fromJS({
          coin: d3.coin,
          tx: d3.txid,
          value: d3.amount
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    const d4 = SWAP_STATE_FOUR.txChain.find(e => e.stage === 'bobpayment');
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_FOUR.sentflags))
      .set('expiration', SWAP_STATE_FOUR.expiration)
      .set('requestid', SWAP_STATE_FOUR.requestid)
      .set('quoteid', SWAP_STATE_FOUR.quoteid)
      .set('bobamount', SWAP_STATE_FOUR.srcamount)
      .set('aliceamount', SWAP_STATE_FOUR.destamount)
      .set(
        'bobpayment',
        fromJS({
          coin: d4.coin,
          tx: d4.txid,
          value: d4.amount
        })
      );
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    const d5 = SWAP_STATE_FIVE.txChain.find(e => e.stage === 'alicespend');
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_FIVE.sentflags))
      .set('expiration', SWAP_STATE_FIVE.expiration)
      .set('requestid', SWAP_STATE_FIVE.requestid)
      .set('quoteid', SWAP_STATE_FIVE.quoteid)
      .set('bobamount', SWAP_STATE_FIVE.srcamount)
      .set('aliceamount', SWAP_STATE_FIVE.destamount)
      .set('status', 'finished')
      .set(
        'alicespend',
        fromJS({
          coin: d5.coin,
          tx: d5.txid,
          value: d5.amount
        })
      );
    expectedResult = store
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]))
      .setIn(['swaps', 'entities'], entities.set(uuid, entity));
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);
    */
  });
});

describe('containers/DexPage/reducers/loadBuyCoinSuccess', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue,
    bobsmartaddress,
    alicesmartaddress,
    requested
  } = SWAP_STATE_ZERO;
  it('should handle the loadBuyCoinSuccess action correctly', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    const entities = initialState.getIn(['swaps', 'entities']);
    const expectedResult = initialState
      .setIn(['buying', 'loading'], true)
      .setIn(['buying', 'error'], false)
      .setIn(['swaps', 'currentSwap'], uuid)
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        entities.set(
          uuid,
          fromJS({
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobsmartaddress,
            alicesmartaddress,
            requested,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending',
            myfee: {
              tx: SWAP_TX_DEFAULT,
              value: 0
            },
            bobdeposit: {
              tx: SWAP_TX_DEFAULT,
              value: 0
            },
            alicepayment: {
              tx: SWAP_TX_DEFAULT,
              value: 0
            },
            bobpayment: {
              tx: SWAP_TX_DEFAULT,
              value: 0
            },
            alicespend: {
              tx: SWAP_TX_DEFAULT,
              value: 0
            }
          })
        )
      );
    let store = buyReducer(initialState, loadBuyCoinSuccess(SWAP_STATE_ZERO));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadBuyCoinSuccess(SWAP_STATE_ZERO));
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/timeoutSwap', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  it('should handle the timeoutSwap action correctly', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    let store = initialState
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          }
        })
      );

    const expectedResult = store
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            error: {
              message: 'Timeout'
            },
            status: 'finished'
          }
        })
      );

    const payload = {
      id: tradeid,
      uuid,
      requestid,
      quoteid,
      bob,
      alice
    };
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
  });

  it('should not remove uuid in processingList', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    let store = initialState
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          }
        })
      );

    const expectedResult = store.setIn(
      ['swaps', 'finishedList'],
      fromJS(['uuid'])
    );

    const payload = {
      id: tradeid,
      uuid: 'uuid',
      requestid,
      quoteid,
      bob,
      alice
    };
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/makeANewSwap', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  it('should handle the makeANewSwap action correctly', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    let store = initialState
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          }
        })
      );

    const expectedResult = store
      .setIn(['buying', 'error'], false)
      .setIn(['buying', 'loading'], false)
      .setIn(['swaps', 'currentSwap'], null);

    store = buyReducer(store, makeANewSwap());
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, makeANewSwap());
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/openSelectCoinModal', () => {
  it('should handle the openSelectCoinModal action correctly', () => {
    const expectedResult = initialState.setIn(
      ['selectCoinModal', 'open'],
      true
    );

    expect(buyReducer(initialState, openSelectCoinModal())).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/closeSelectCoinModal', () => {
  it('should handle the closeSelectCoinModal action correctly', () => {
    const expectedResult = initialState.setIn(
      ['selectCoinModal', 'open'],
      false
    );

    expect(buyReducer(initialState, closeSelectCoinModal())).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/clickSelectCoinModal', () => {
  const name = 'Komodo';
  const symbol = 'KMD';
  it('should handle the clickSelectCoinModal action correctly', () => {
    const store = initialState
      .setIn(['selectCoinModal', 'open'], false)
      .setIn(['currency', 'name'], name)
      .setIn(['currency', 'symbol'], symbol)
      .setIn(['payment', 'name'], name)
      .setIn(['payment', 'symbol'], symbol);
    const expectedResult = initialState
      .setIn(['selectCoinModal', 'open'], false)
      .setIn(['currency', 'name'], name)
      .setIn(['currency', 'symbol'], symbol);
    expect(
      buyReducer(
        store,
        clickSelectCoinModal({
          name,
          symbol
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/selectCoinPayment', () => {
  const name = 'Komodo';
  const symbol = 'KMD';
  it('should handle the selectCoinPayment action correctly', () => {
    const expectedResult = initialState
      .setIn(['payment', 'name'], name)
      .setIn(['payment', 'symbol'], symbol);
    expect(
      buyReducer(
        initialState,
        selectCoinPayment({
          name,
          symbol
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/skipSearchStateCreation', () => {
  it('should handle the skipSearchStateCreation action correctly', () => {
    const expectedResult = initialState.setIn(
      ['search', 'state'],
      SEARCH_STATE_READY
    );

    expect(buyReducer(initialState, skipSearchStateCreation())).toEqual(
      expectedResult
    );
  });
});

describe('containers/DexPage/reducers/openJoyride', () => {
  it('should handle the openJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(buyReducer(initialState, openJoyride())).toEqual(expectedResult);
  });
});

describe('containers/DexPage/reducers/closeJoyride', () => {
  it('should handle the closeJoyride action correctly', () => {
    const expectedResult = initialState.setIn(['joyride', 'open'], true);

    expect(buyReducer(expectedResult, closeJoyride())).toEqual(initialState);
  });
});
