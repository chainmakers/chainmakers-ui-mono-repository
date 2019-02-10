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

export const LOGIN = 'atomicapp/App/LOGIN';
export const LOGIN_SUCCESS = 'atomicapp/App/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'atomicapp/App/LOGIN_ERROR';

export const LOGOUT = 'atomicapp/App/LOGOUT';

export const LOAD_WITHDRAW = 'atomicapp/App/LOAD_WITHDRAW';
export const LOAD_WITHDRAW_SUCCESS = 'atomicapp/App/LOAD_WITHDRAW_SUCCESS';
export const LOAD_WITHDRAW_ERROR = 'atomicapp/App/LOAD_WITHDRAW_ERROR';

export const LOAD_SWAP_SUCCESS = 'atomicapp/App/LOAD_SWAP_SUCCESS';

// electrum actions
export const ELECTRUM_LOAD = 'atomicapp/App/ELECTRUM_LOAD';
export const ELECTRUM_ADD = 'atomicapp/App/ELECTRUM_ADD';
export const ELECTRUM_ADD_SUCCESS = 'atomicapp/App/ELECTRUM_ADD_SUCCESS';
export const ELECTRUM_ADD_ERROR = 'atomicapp/App/ELECTRUM_ADD_ERROR';

// balance
export const BALANCE_LOAD_ALL = 'atomicapp/App/BALANCE_LOAD_ALL';
export const BALANCE_LOAD = 'atomicapp/App/BALANCE_LOAD';
export const BALANCE_LOAD_SUCCESS = 'atomicapp/App/BALANCE_LOAD_SUCCESS';
export const BALANCE_LOAD_ERROR = 'atomicapp/App/BALANCE_LOAD_ERROR';
