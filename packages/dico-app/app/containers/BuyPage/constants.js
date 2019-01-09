// eslint-disable-next-line import/prefer-default-export
export const APP_STATE_NAME = 'buy';
export const LOAD_PRICES = 'dicoapp/BuyPage/LOAD_PRICES';
export const LOAD_PRICES_SUCCESS = 'dicoapp/BuyPage/LOAD_PRICES_SUCCESS';
export const LOAD_PRICES_ERROR = 'dicoapp/BuyPage/LOAD_PRICES_ERROR';
export const LOAD_PRICE = 'dicoapp/BuyPage/LOAD_PRICE';
export const LOAD_BEST_PRICE = 'dicoapp/BuyPage/LOAD_BEST_PRICE';
export const LOAD_BUY_COIN = 'dicoapp/BuyPage/LOAD_BUY_COIN';
export const LOAD_BUY_COIN_SUCCESS = 'dicoapp/BuyPage/LOAD_BUY_COIN_SUCCESS';
export const LOAD_BUY_COIN_ERROR = 'dicoapp/BuyPage/LOAD_BUY_COIN_ERROR';
export const CLEAR_BUY_COIN_ERROR = 'dicoapp/BuyPage/CLEAR_BUY_COIN_ERROR';
export const LOAD_RECENT_SWAPS = 'dicoapp/BuyPage/LOAD_RECENT_SWAPS';
export const LOAD_RECENT_SWAPS_COIN = 'dicoapp/BuyPage/LOAD_RECENT_SWAPS_COIN';
export const LOAD_RECENT_SWAPS_SUCCESS =
  'dicoapp/BuyPage/LOAD_RECENT_SWAPS_SUCCESS';
export const LOAD_RECENT_SWAPS_DATA_FROM_WEBSOCKET =
  'dicoapp/BuyPage/LOAD_SWAP_DATA_FROM_WEBSOCKET';
export const LOAD_RECENT_SWAPS_ERROR =
  'dicoapp/BuyPage/LOAD_RECENT_SWAPS_ERROR';
export const CHECK_TIMEOUT_EVENT = 'dicoapp/BuyPage/CHECK_TIMEOUT_EVENT';
export const CHECK_UPDATE_SWAP_EVENT =
  'dicoapp/BuyPage/CHECK_UPDATE_SWAP_EVENT';
export const AUTO_HIDE_SNACKBAR_TIME = 6000;
export const TIME_LOOP = 20 * 1000;
export const STATE_SWAPS = [
  'Confirming',
  'My Fee',
  'Bob Deposit',
  'Alice Payment',
  'Bob Payment',
  'Swap Finished' // 'Alice Spend'
];

// https://github.com/KomodoPlatform/Documentation/blob/master/docs/source/barterDEX/MarketmakerErrors.rst#marketmaker-error-codes
export const APPROPRIATE_ERROR_UTXOS =
  'cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade';
export const SWAP_TX_DEFAULT =
  '0000000000000000000000000000000000000000000000000000000000000000';

export const SWAP_TIMEOUT = 'dicoapp/BuyPage/SWAP_TIMEOUT';
export const SWAP_MAKE_A_NEW = 'dicoapp/BuyPage/SWAP_MAKE_A_NEW';
export const SWAP_DETAIL_MODAL_OPEN = 'dicoapp/BuyPage/SWAP_DETAIL_MODAL_OPEN';
export const SWAP_DETAIL_MODAL_CLOSE =
  'dicoapp/BuyPage/SWAP_DETAIL_MODAL_CLOSE';
