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

export const LOAD_SWAP_SUCCESS = 'atomicapp/App/LOAD_SWAP_SUCCESS';

export const KMDICE_CHAIN_START = 'kmdice/App/KMDICE_CHAIN_START';
export const KMDICE_CHAIN_START_SUCCESS =
  'kmdice/App/KMDICE_CHAIN_START_SUCCESS';
export const KMDICE_CHAIN_START_ERROR = 'kmdice/App/KMDICE_CHAIN_START_ERROR';

export const KMDICE_CHAIN_GET_INFO = 'kmdice/App/KMDICE_CHAIN_GET_INFO';
export const KMDICE_CHAIN_GET_INFO_SUCCESS =
  'kmdice/App/KMDICE_CHAIN_GET_INFO_SUCCESS';
export const KMDICE_CHAIN_GET_INFO_ERROR =
  'kmdice/App/KMDICE_CHAIN_GET_INFO_ERROR';

export const KMDICE_CHAIN_STOP = 'kmdice/App/KMDICE_CHAIN_STOP';

// https://www.tutorialspoint.com/operating_system/os_processes.htm
// Operating System - Processes
export const KOMODOD_STATE_STARTED = 'kmdice/App/KOMODOD_STATE_STARTED';
export const KOMODOD_STATE_RUNNING = 'kmdice/App/KOMODOD_STATE_RUNNING';
export const KOMODOD_STATE_TERMINATED = 'kmdice/App/KOMODOD_STATE_TERMINATED';
