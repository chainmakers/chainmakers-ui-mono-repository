// eslint-disable-next-line import/prefer-default-export
export const APP_STATE_NAME = 'order';
export const AUTO_HIDE_SNACKBAR_TIME = 6000;
export const TIME_LOOP = 5 * 1000;

export const WAITING_SWAPS_STATE = 'WaitingTheConfirmation';
export const STARTED_SWAPS_STATE = 'Started';
export const NEGOTIATED_SWAPS_STATE = 'Negotiated';
export const TAKER_FEE_SENT_SWAPS_STATE = 'TakerFeeSent';
export const MAKER_PAYMENT_RECEIVED_SWAPS_STATE = 'MakerPaymentReceived';
export const MAKER_PAYMENT_WAIT_CONFIRM_STARTED_SWAPS_STATE =
  'MakerPaymentWaitConfirmStarted';
export const MAKER_PAYMENT_VALIDATED_AND_CONFIRMED_SWAPS_STATE =
  'MakerPaymentValidatedAndConfirmed';
export const TAKER_PAYMENT_SENT_SWAPS_STATE = 'TakerPaymentSent';
export const TAKER_PAYMENT_SPENT_SWAPS_STATE = 'TakerPaymentSpent';
export const MAKER_PAYMENT_SPENT_SWAPS_STATE = 'MakerPaymentSpent';
export const FINISHED_SWAPS_STATE = 'Finished';
export const STATE_SWAPS = [
  WAITING_SWAPS_STATE,
  STARTED_SWAPS_STATE,
  NEGOTIATED_SWAPS_STATE,
  TAKER_FEE_SENT_SWAPS_STATE,
  MAKER_PAYMENT_RECEIVED_SWAPS_STATE,
  MAKER_PAYMENT_WAIT_CONFIRM_STARTED_SWAPS_STATE,
  MAKER_PAYMENT_VALIDATED_AND_CONFIRMED_SWAPS_STATE,
  TAKER_PAYMENT_SENT_SWAPS_STATE,
  TAKER_PAYMENT_SPENT_SWAPS_STATE,
  MAKER_PAYMENT_SPENT_SWAPS_STATE,
  FINISHED_SWAPS_STATE
];

// https://github.com/KomodoPlatform/Documentation/blob/master/docs/source/barterDEX/MarketmakerErrors.rst#marketmaker-error-codes
export const SWAP_TX_DEFAULT =
  '0000000000000000000000000000000000000000000000000000000000000000';

export const SWAP_DETAIL_MODAL_OPEN =
  'atomicapp/OrderPage/SWAP_DETAIL_MODAL_OPEN';
export const SWAP_DETAIL_MODAL_CLOSE =
  'atomicapp/OrderPage/SWAP_DETAIL_MODAL_CLOSE';

export const NA = 'N/A';

export const DEXFEE = 777;
export const NUMCOIN = 100000000;
export const BUFF_PRICES = 1.05 * NUMCOIN; // 5%
// export const BUFF_PRICES = 1.0 * NUMCOIN; // 0%

// Joyride actions
export const JOYRIDE_OPEN = 'atomicapp/OrderPage/JOYRIDE_OPEN';
export const JOYRIDE_CLOSE = 'atomicapp/OrderPage/JOYRIDE_CLOSE';

// Orderbook actions
export const ORDERBOOK_RELOAD = 'atomicapp/OrdersPage/ORDERBOOK_RELOAD';
export const ORDERBOOK_RELOAD_SUCCESS =
  'atomicapp/OrdersPage/ORDERBOOK_RELOAD_SUCCESS';
export const ORDERBOOK_LOAD = 'atomicapp/OrdersPage/ORDERBOOK_LOAD';
export const ORDERBOOK_LOAD_SKIP = 'atomicapp/OrdersPage/ORDERBOOK_LOAD_SKIP';
export const ORDERBOOK_LOAD_SUCCESS =
  'atomicapp/OrdersPage/ORDERBOOK_LOAD_SUCCESS';
export const ORDERBOOK_LOAD_ERROR = 'atomicapp/OrdersPage/ORDERBOOK_LOAD_ERROR';

// Deposit Coin Modal actions
export const DEPOSIT_COIN_MODAL_OPEN =
  'atomicapp/OrdersPage/DEPOSIT_COIN_MODAL_OPEN';
export const DEPOSIT_COIN_MODAL_CLOSE =
  'atomicapp/OrdersPage/DEPOSIT_COIN_MODAL_CLOSE';
export const DEPOSIT_COIN_SELECT = 'atomicapp/OrdersPage/DEPOSIT_COIN_SELECT';

// Recevie Coin Modal actions
export const RECEVIE_COIN_MODAL_OPEN =
  'atomicapp/OrdersPage/RECEVIE_COIN_MODAL_OPEN';
export const RECEVIE_COIN_MODAL_CLOSE =
  'atomicapp/OrdersPage/RECEVIE_COIN_MODAL_CLOSE';
export const RECEVIE_COIN_SELECT = 'atomicapp/OrdersPage/RECEVIE_COIN_SELECT';

// New order
export const NEW_ORDER_SET = 'atomicapp/OrdersPage/NEW_ORDER_SET';
export const NEW_ORDER_SET_SKIP = 'atomicapp/OrdersPage/NEW_ORDER_SET_SKIP';
export const NEW_ORDER_SET_SUCCESS =
  'atomicapp/OrdersPage/NEW_ORDER_SET_SUCCESS';
export const NEW_ORDER_SET_ERROR = 'atomicapp/OrdersPage/NEW_ORDER_SET_ERROR';
export const NEW_ORDER_CANCEL = 'atomicapp/OrdersPage/NEW_ORDER_CANCEL';
export const NEW_ORDER_CANCEL_SUCCESS =
  'atomicapp/OrdersPage/NEW_ORDER_CANCEL_SUCCESS';

// Confirm New Order Modal
export const CONFIRM_NEW_ORDER_MODAL_OPEN =
  'atomicapp/OrdersPage/CONFIRM_NEW_ORDER_MODAL_OPEN';
export const CONFIRM_NEW_ORDER_MODAL_CLOSE =
  'atomicapp/OrdersPage/CONFIRM_NEW_ORDER_MODAL_CLOSE';

export const ORDER_BOB_SIDE = 'ORDER_BOB_SIDE';
export const ORDER_ALICE_SIDE = 'ORDER_ALICE_SIDE';

// Canceling Order Modal
export const CANCELING_ORDER_MODAL_OPEN =
  'atomicapp/OrdersPage/CANCELING_ORDER_MODAL_OPEN';
export const CANCELING_ORDER_MODAL_CLOSE =
  'atomicapp/OrdersPage/CANCELING_ORDER_MODAL_CLOSE';
