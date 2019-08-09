// eslint-disable-next-line import/prefer-default-export
export const APP_STATE_NAME = 'dex';
export const LOAD_PRICES = 'atomicapp/DexPage/LOAD_PRICES';
export const LOAD_PRICES_SUCCESS = 'atomicapp/DexPage/LOAD_PRICES_SUCCESS';
export const LOAD_PRICES_ERROR = 'atomicapp/DexPage/LOAD_PRICES_ERROR';
export const LOAD_PRICE = 'atomicapp/DexPage/LOAD_PRICE';
export const LOAD_BEST_PRICE = 'atomicapp/DexPage/LOAD_BEST_PRICE';
export const LOAD_BUY_COIN = 'atomicapp/DexPage/LOAD_BUY_COIN';
export const LOAD_BUY_COIN_SUCCESS = 'atomicapp/DexPage/LOAD_BUY_COIN_SUCCESS';
export const LOAD_BUY_COIN_ERROR = 'atomicapp/DexPage/LOAD_BUY_COIN_ERROR';
export const CLEAR_BUY_COIN_ERROR = 'atomicapp/DexPage/CLEAR_BUY_COIN_ERROR';
export const LOAD_RECENT_SWAPS = 'atomicapp/DexPage/LOAD_RECENT_SWAPS';
export const LOAD_RECENT_SWAPS_COIN =
  'atomicapp/DexPage/LOAD_RECENT_SWAPS_COIN';
export const LOAD_RECENT_SWAPS_SUCCESS =
  'atomicapp/DexPage/LOAD_RECENT_SWAPS_SUCCESS';
export const LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET =
  'atomicapp/DexPage/LOAD_SWAP_DATA_FROM_WEBSOCKET';
export const LOAD_RECENT_SWAPS_ERROR =
  'atomicapp/DexPage/LOAD_RECENT_SWAPS_ERROR';
export const CHECK_TIMEOUT_EVENT = 'atomicapp/DexPage/CHECK_TIMEOUT_EVENT';
export const CHECK_UPDATE_SWAP_EVENT =
  'atomicapp/DexPage/CHECK_UPDATE_SWAP_EVENT';
export const AUTO_HIDE_SNACKBAR_TIME = 6000;
export const TIME_LOOP = 5 * 1000;

// https://github.com/KomodoPlatform/Documentation/blob/master/docs/source/barterDEX/MarketmakerErrors.rst#marketmaker-error-codes
export const SWAP_TX_DEFAULT =
  '0000000000000000000000000000000000000000000000000000000000000000';

export const SWAP_TIMEOUT = 'atomicapp/DexPage/SWAP_TIMEOUT';
export const SWAP_MAKE_A_NEW = 'atomicapp/DexPage/SWAP_MAKE_A_NEW';
export const SWAP_DETAIL_MODAL_OPEN =
  'atomicapp/DexPage/SWAP_DETAIL_MODAL_OPEN';
export const SWAP_DETAIL_MODAL_CLOSE =
  'atomicapp/DexPage/SWAP_DETAIL_MODAL_CLOSE';

export const SELECT_COIN_MODAL_OPEN =
  'atomicapp/DexPage/SELECT_COIN_MODAL_OPEN';
export const SELECT_COIN_MODAL_CLOSE =
  'atomicapp/DexPage/SELECT_COIN_MODAL_CLOSE';
export const SELECT_COIN_MODAL_CLICK =
  'atomicapp/DexPage/SELECT_COIN_MODAL_CLICK';

export const COIN_PAYMENT_SELECT = 'atomicapp/DexPage/COIN_PAYMENT_SELECT';

export const NA = 'N/A';

export const DEXFEE = 777;
export const NUMCOIN = 100000000;
export const BUFF_PRICES = 1.01 * NUMCOIN; // 1%
// export const BUFF_PRICES = 1.0 * NUMCOIN; // 0%

// SEARCH STATUS
export const SEARCH_STATE_NULL = 'atomicapp/DexPage/SEARCH_STATE_NULL';
export const SEARCH_STATE_CREATE = 'atomicapp/DexPage/SEARCH_STATE_CREATE';
export const SEARCH_STATE_READY = 'atomicapp/DexPage/SEARCH_STATE_READY';

// Joyride actions
export const JOYRIDE_OPEN = 'atomicapp/DexPage/JOYRIDE_OPEN';
export const JOYRIDE_CLOSE = 'atomicapp/DexPage/JOYRIDE_CLOSE';
