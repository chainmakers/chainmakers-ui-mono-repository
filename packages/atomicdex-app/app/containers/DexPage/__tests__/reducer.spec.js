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
  skipSearchStateCreation
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
  SWAP_STATE_ZERO,
  SWAP_STATE_ONE,
  SWAP_STATE_TWO,
  SWAP_STATE_THREE,
  SWAP_STATE_FOUR,
  SWAP_STATE_FIVE
  // LOAD_SWAP_SUCCESS
} from '../../__tests__/fake-data';

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
  } = SWAP_STATE_ZERO;
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
    const d1 = SWAP_STATE_ONE.txChain.find(e => e.stage === 'myfee');
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_ONE.sentflags))
      .set('expiration', SWAP_STATE_ONE.expiration)
      .set('requestid', SWAP_STATE_ONE.requestid)
      .set('quoteid', SWAP_STATE_ONE.quoteid)
      .set('bobamount', SWAP_STATE_ONE.srcamount)
      .set('aliceamount', SWAP_STATE_ONE.destamount)
      .set(
        'myfee',
        fromJS({
          coin: d1.coin,
          tx: d1.txid,
          value: d1.amount
        })
      );
    let expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);

    store = expectedResult;
    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    const d2 = SWAP_STATE_TWO.txChain.find(e => e.stage === 'bobdeposit');
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_TWO.sentflags))
      .set('expiration', SWAP_STATE_TWO.expiration)
      .set('requestid', SWAP_STATE_TWO.requestid)
      .set('quoteid', SWAP_STATE_TWO.quoteid)
      .set('bobamount', SWAP_STATE_TWO.srcamount)
      .set('aliceamount', SWAP_STATE_TWO.destamount)
      .set(
        'bobdeposit',
        fromJS({
          coin: d2.coin,
          tx: d2.txid,
          value: d2.amount
        })
      );
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
