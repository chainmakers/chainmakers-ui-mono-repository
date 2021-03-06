/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';
// import logger from '../../logger';
import {
  // NEGOTIATED_SWAPS_STATE,
  STARTED_SWAPS_STATE,
  TAKER_PAYMENT_SENT_SWAPS_STATE,
  TAKER_FEE_SENT_SWAPS_STATE,
  MAKER_PAYMENT_RECEIVED_SWAPS_STATE,
  MAKER_PAYMENT_SPENT_SWAPS_STATE,
  TAKER_PAYMENT_SPENT_SWAPS_STATE,
  FINISHED_SWAPS_STATE,
  STATE_FAILED_SWAPS,
  STATE_FAILED_SWAPS_MESSAGE
} from '../../constants';

import {
  LOAD_PRICES,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS,
  // LOAD_PRICES_ERROR,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_SUCCESS,
  LOAD_BUY_COIN_ERROR,
  CLEAR_BUY_COIN_ERROR,
  LOAD_RECENT_SWAPS_COIN,
  LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET,
  // LOAD_RECENT_SWAPS_ERROR,
  SWAP_TIMEOUT,
  SWAP_MAKE_A_NEW,
  SWAP_DETAIL_MODAL_OPEN,
  SWAP_DETAIL_MODAL_CLOSE,
  SWAP_TX_DEFAULT,
  SELECT_COIN_MODAL_OPEN,
  SELECT_COIN_MODAL_CLOSE,
  SELECT_COIN_MODAL_CLICK,
  COIN_PAYMENT_SELECT,
  JOYRIDE_OPEN,
  JOYRIDE_CLOSE
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  prices: {
    loading: false,
    error: false,
    entities: {}
  },

  // This data struct answers those question:
  // Can I make another swap?
  // Did current swap timeout?
  buying: {
    loading: false,
    error: false
  },

  // This data struct answers those question:
  // How many are swap currently processing?
  // How many did swap finished?
  // Current swap?
  //
  swaps: {
    currentSwap: null,
    processingList: [],
    finishedList: [],
    entities: {}
  },

  swapDetailModal: {
    open: false,
    uuid: null
  },

  selectCoinModal: {
    open: false
  },

  currency: {
    name: null,
    symbol: null
    // amount: 0
  },

  payment: {
    name: null,
    symbol: null
    // amount: 0
  },

  joyride: {
    open: false
  }
});

export default handleActions(
  {
    [LOAD_PRICES]: state =>
      state
        .setIn(['prices', 'loading'], true)
        .setIn(['prices', 'error'], false),

    [LOAD_BEST_PRICE]: (state, { payload }) => {
      const { rel } = payload;
      // step one: load entities
      const entities = state.getIn(['prices', 'entities']);
      // step two: update best price
      const c = entities.get(rel);
      const n = fromJS(payload);
      // if not found
      if (!c) {
        // step three: put it in coin
        n.set('createdAt', Date.now());
      } else {
        n.set('createdAt', c.get('createdAt'));
      }
      n.set('updatedAt', Date.now());
      return state.setIn(['prices', 'entities'], entities.set(rel, n));
    },

    [LOAD_PRICES_SUCCESS]: state => state.setIn(['prices', 'loading'], false),

    [LOAD_BUY_COIN]: state =>
      state
        .setIn(['buying', 'loading'], true)
        .setIn(['buying', 'error'], false),

    [LOAD_BUY_COIN_SUCCESS]: (state, { payload }) => {
      const {
        tradeid,
        uuid,
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
      } = payload;
      let processingList = state.getIn(['swaps', 'processingList']);
      const entities = state.getIn(['swaps', 'entities']);
      if (!processingList.includes(uuid)) {
        processingList = processingList.push(uuid);
      }

      // step one: update date
      return state
        .setIn(['swaps', 'processingList'], processingList)
        .setIn(['swaps', 'currentSwap'], uuid)
        .setIn(
          ['swaps', 'entities'],
          entities.set(
            uuid,
            fromJS({
              id: tradeid,
              bobsmartaddress,
              alicesmartaddress,
              requested,
              uuid,
              requestid,
              quoteid,
              expiration,
              bob,
              alice,
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
        )
        .setIn(['buying', 'loading'], true)
        .setIn(['buying', 'error'], false);
    },

    [LOAD_BUY_COIN_ERROR]: (state, { error }) =>
      state
        .setIn(['buying', 'error'], error)
        .setIn(['buying', 'loading'], false),

    [CLEAR_BUY_COIN_ERROR]: state =>
      state
        .setIn(['buying', 'error'], false)
        .setIn(['buying', 'loading'], false),

    [LOAD_RECENT_SWAPS_COIN]: (state, { payload }) => {
      const {
        result: { events, uuid }
      } = payload;
      // step one: update list
      let processingList = state.getIn(['swaps', 'processingList']);
      let finishedList = state.getIn(['swaps', 'finishedList']);

      // step two: update entities
      let entities = state.getIn(['swaps', 'entities']);
      let entity = entities.get(uuid);

      for (let i = 0; i < events.length; i += 1) {
        const { event } = events[i];
        // sentflags
        const sentf = entity.get('sentflags');

        // eslint-disable-next-line no-continue
        if (sentf.find(value => value === event.type)) continue;

        // expiration
        if (event.type === STARTED_SWAPS_STATE) {
          // first time enter this state
          entity = entity;
          entity = entity.set(
            'expiration',
            entity.get('expiration') + 120 * 60
          ); // + 120 mins
        }
        // if (event.type === NEGOTIATED_SWAPS_STATE) {

        // }
        if (event.type === TAKER_FEE_SENT_SWAPS_STATE) {
          // eslint-disable-next-line camelcase
          const { tx_hash } = event.data;
          // const { tx_hash, my_balance_change } = event.data;
          let myfee = entity.get('myfee');
          myfee = myfee.set('tx', tx_hash);
          myfee = myfee.set('coin', entity.get('alice'));
          // myfee = myfee.set('value', my_balance_change);
          entity = entity.set('myfee', myfee);
        }

        if (event.type === MAKER_PAYMENT_RECEIVED_SWAPS_STATE) {
          // eslint-disable-next-line camelcase
          const { tx_hash } = event.data;
          let bobdeposit = entity.get('bobdeposit');
          bobdeposit = bobdeposit.set('tx', tx_hash);
          bobdeposit = bobdeposit.set('coin', entity.get('bob'));
          entity = entity.set('bobdeposit', bobdeposit);
        }

        if (event.type === TAKER_PAYMENT_SENT_SWAPS_STATE) {
          // eslint-disable-next-line camelcase
          const { tx_hash } = event.data;
          // const { tx_hash, my_balance_change } = event.data;
          let alicepayment = entity.get('alicepayment');
          alicepayment = alicepayment.set('tx', tx_hash);
          alicepayment = alicepayment.set('coin', entity.get('alice'));
          // alicepayment = alicepayment.set('value', my_balance_change);
          entity = entity.set('alicepayment', alicepayment);
        }

        if (event.type === TAKER_PAYMENT_SPENT_SWAPS_STATE) {
          // eslint-disable-next-line camelcase
          const { tx_hash } = event.data.transaction;
          let alicespend = entity.get('alicespend');
          alicespend = alicespend.set('tx', tx_hash);
          alicespend = alicespend.set('coin', entity.get('alice'));
          entity = entity.set('alicespend', alicespend);
        }

        if (event.type === MAKER_PAYMENT_SPENT_SWAPS_STATE) {
          // eslint-disable-next-line camelcase
          const { tx_hash } = event.data;
          // const { tx_hash, my_balance_change } = event.data;
          let bobpayment = entity.get('bobpayment');
          bobpayment = bobpayment.set('tx', tx_hash);
          bobpayment = bobpayment.set('coin', entity.get('bob'));
          // bobpayment = alicepayment.set('value', my_balance_change);
          entity = entity.set('bobpayment', bobpayment);
        }

        // ERROR
        if (STATE_FAILED_SWAPS.indexOf(event.type) !== -1) {
          console.error(event.data.error);
          entity = entity.set(
            'error',
            fromJS({
              message: STATE_FAILED_SWAPS_MESSAGE[event.type]
            })
          );
        }

        if (event.type === FINISHED_SWAPS_STATE) {
          // first time enter this state
          processingList = processingList.filter(o => o !== uuid);
          finishedList = finishedList.push(uuid);
        }

        // update status
        if (entity.get('status') !== event.type) {
          entity = entity.set('status', event.type);
        }

        entity = entity.set('sentflags', sentf.push(event.type));

        entities = entities.set(uuid, entity);
      }

      return state
        .setIn(['swaps', 'processingList'], processingList)
        .setIn(['swaps', 'finishedList'], finishedList)
        .setIn(['swaps', 'entities'], entities);
    },

    [LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET]: (state, { payload }) => {
      const {
        uuid,
        name,
        coin,
        txid,
        amount,
        expiration,
        method,
        update,
        status,
        sentflags,
        paymentspent,
        txChain
      } = payload;
      let processingList = state.getIn(['swaps', 'processingList']);
      let finishedList = state.getIn(['swaps', 'finishedList']);

      // step one: find entity
      let entities = state.getIn(['swaps', 'entities']);
      let entity = entities.get(uuid);
      if (entity && entity.get('status') === 'finished') {
        // NOTE: stop update when a swap was finished
        return state;
      }

      // step two: update expiration
      if (expiration) {
        entity = entity.set('expiration', expiration);
      }

      // step three: update sentflags
      if (method === 'update') {
        let sentf = entity.get('sentflags');
        if (!sentf.includes(update)) {
          sentf = sentf.unshift(update);
          entity = entity.set('sentflags', sentf);
        }
      }

      if (method === 'tradestatus') {
        entity = entity.set('sentflags', fromJS(sentflags));
      }

      // step four: update status
      if (method === 'tradestatus') {
        entity = entity.set('status', status);
      }

      // step five: update tx
      if (
        name === 'myfee' &&
        SWAP_TX_DEFAULT === entity.getIn(['myfee', 'tx'])
      ) {
        entity = entity.set(
          'myfee',
          fromJS({
            coin,
            tx: txid,
            value: amount
          })
        );
      }

      if (
        name === 'bobdeposit' &&
        SWAP_TX_DEFAULT === entity.getIn(['bobdeposit', 'tx'])
      ) {
        entity = entity.set(
          'bobdeposit',
          fromJS({
            coin,
            tx: txid,
            value: amount
          })
        );
      }

      if (
        name === 'alicepayment' &&
        SWAP_TX_DEFAULT === entity.getIn(['alicepayment', 'tx'])
      ) {
        entity = entity.set(
          'alicepayment',
          fromJS({
            coin,
            tx: txid,
            value: amount
          })
        );
      }

      if (
        name === 'bobpayment' &&
        SWAP_TX_DEFAULT === entity.getIn(['bobpayment', 'tx'])
      ) {
        entity = entity.set(
          'bobpayment',
          fromJS({
            coin,
            tx: txid,
            value: amount
          })
        );
      }

      if (
        paymentspent &&
        paymentspent !== SWAP_TX_DEFAULT &&
        SWAP_TX_DEFAULT === entity.getIn(['alicespend', 'tx'])
      ) {
        const d = txChain.find(e => e.stage === 'alicespend');
        entity = entity.set(
          'alicespend',
          fromJS({
            coin: d.coin,
            tx: d.txid,
            value: d.amount
          })
        );
      }

      entities = entities.set(uuid, entity);

      if (status === 'finished' && processingList.contains(uuid)) {
        processingList = processingList.filter(o => o !== uuid);
        finishedList = finishedList.push(uuid);
        // logger.info({
        //   alice: entity.get('alice'),
        //   aliceamount: entity.get('aliceamount'),
        //   bob: entity.get('bob'),
        //   bobamount: entity.get('bobamount'),
        //   alicesmartaddress: entity.get('alicesmartaddress'),
        //   bobsmartaddress: entity.get('bobsmartaddress'),
        //   expiration: entity.get('expiration'),
        //   quoteid: entity.get('quoteid'),
        //   requestid: entity.get('requestid'),
        //   uuid: entity.get('uuid'),
        //   status: FINISHED_SWAPS_STATE
        // });
        return state
          .setIn(['swaps', 'processingList'], processingList)
          .setIn(['swaps', 'finishedList'], finishedList)
          .setIn(['swaps', 'entities'], entities);
      }
      return state.setIn(['swaps', 'entities'], entities);
    },

    // NOTE: FIXME
    // [LOAD_RECENT_SWAPS_ERROR]: (state, { error }) =>
    //   state.setIn(['swaps', 'error'], error).setIn(['swaps', 'loading'], false),

    [SWAP_MAKE_A_NEW]: state =>
      state
        .setIn(['buying', 'error'], false)
        .setIn(['buying', 'loading'], false)
        .setIn(['swaps', 'currentSwap'], null),

    [SWAP_TIMEOUT]: (state, { payload }) => {
      // NOTE: Todo
      // notification to user
      const { uuid } = payload;
      // step one: get data
      let processingList = state.getIn(['swaps', 'processingList']);
      let finishedList = state.getIn(['swaps', 'finishedList']);
      let entities = state.getIn(['swaps', 'entities']);
      let entity = entities.get(uuid);
      // step two: remove swap from processingList
      processingList = processingList.filter(o => o !== uuid);
      if (!finishedList.includes(uuid)) finishedList = finishedList.push(uuid);
      // step three: add error message and update swap's status
      if (entity) {
        entity = entity
          .set(
            'error',
            fromJS({
              message: 'Timeout'
            })
          )
          .set('status', FINISHED_SWAPS_STATE);
        entities = entities.set(uuid, entity);
        // logger.info({
        //   alice: entity.get('alice'),
        //   aliceamount: entity.get('aliceamount'),
        //   bob: entity.get('bob'),
        //   bobamount: entity.get('bobamount'),
        //   alicesmartaddress: entity.get('alicesmartaddress'),
        //   bobsmartaddress: entity.get('bobsmartaddress'),
        //   expiration: entity.get('expiration'),
        //   quoteid: entity.get('quoteid'),
        //   requestid: entity.get('requestid'),
        //   uuid: entity.get('uuid'),
        //   status: 'failed'
        // });
      }

      return state
        .setIn(['swaps', 'finishedList'], finishedList)
        .setIn(['swaps', 'processingList'], processingList)
        .setIn(['swaps', 'entities'], entities);
    },

    [SWAP_DETAIL_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['swapDetailModal', 'open'], true)
        .setIn(['swapDetailModal', 'uuid'], payload.uuid),

    [SWAP_DETAIL_MODAL_CLOSE]: state =>
      state.setIn(['swapDetailModal', 'open'], false),

    [SELECT_COIN_MODAL_OPEN]: state =>
      state.setIn(['selectCoinModal', 'open'], true),

    [SELECT_COIN_MODAL_CLOSE]: state =>
      state.setIn(['selectCoinModal', 'open'], false),

    [SELECT_COIN_MODAL_CLICK]: (state, { payload }) =>
      state
        .setIn(['selectCoinModal', 'open'], false)
        .setIn(['currency', 'name'], payload.name)
        .setIn(['currency', 'symbol'], payload.symbol)
        .setIn(['payment', 'name'], null)
        .setIn(['payment', 'symbol'], null),

    [COIN_PAYMENT_SELECT]: (state, { payload }) =>
      state
        .setIn(['payment', 'name'], payload.name)
        .setIn(['payment', 'symbol'], payload.symbol),

    [JOYRIDE_OPEN]: state => state.setIn(['joyride', 'open'], true),

    [JOYRIDE_CLOSE]: state => state.setIn(['joyride', 'open'], false),

    [LOGOUT]: () => initialState
  },
  initialState
);

/* eslint-enable no-case-declarations, no-param-reassign */
