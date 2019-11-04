/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const APP_STATE_NAME = 'global';

export const LOGIN = 'dicoapp/App/LOGIN';
export const LOGIN_SUCCESS = 'dicoapp/App/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'dicoapp/App/LOGIN_ERROR';

export const LOGOUT = 'dicoapp/App/LOGOUT';

export const LOAD_BALANCE = 'dicoapp/App/LOAD_BALANCE';
export const LOAD_BALANCE_SUCCESS = 'dicoapp/App/LOAD_BALANCE_SUCCESS';
export const LOAD_COIN_BALANCE_SUCCESS =
  'dicoapp/App/LOAD_COIN_BALANCE_SUCCESS';
export const LOAD_BALANCE_ERROR = 'dicoapp/App/LOAD_BALANCE_ERROR';

export const LOAD_WITHDRAW = 'dicoapp/App/LOAD_WITHDRAW';
export const LOAD_WITHDRAW_SUCCESS = 'dicoapp/App/LOAD_WITHDRAW_SUCCESS';
export const LOAD_WITHDRAW_ERROR = 'dicoapp/App/LOAD_WITHDRAW_ERROR';

export const LOAD_SWAP_SUCCESS = 'dicoapp/App/LOAD_SWAP_SUCCESS';
