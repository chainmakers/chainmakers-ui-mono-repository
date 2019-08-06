export const LOADING = 'LOADING';
export const LOADED = 'LOADED';
export const FAILED = 'FAILED';
export const ENABLE = 'ENABLE';
export const DISABLE = 'DISABLE';
export const SELECTED = 'SELECTED';
export const UNSELECTED = 'UNSELECTED';
export const INITIALIZATION = 'INITIALIZATION';
// BALANCE STATUS
// => INITIALIZATION => ENABLE <=> DISABLE
// https://www.tutorialspoint.com/operating_system/os_processes.htm
// Operating System - Processes
export const STATE_STARTED = 'STATE_STARTED';
export const STATE_RUNNING = 'STATE_RUNNING';
export const STATE_TERMINATED = 'STATE_TERMINATED';

export const routes = {
  HOME: '/',
  SEED: '/seed',
  BUY: '/buy',
  WALLET: '/wallet',
  HELP: '/help',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ORDER: '/order',
  SETTINGS: '/settings'
};

// SWAP STATUS

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

export const START_FAILED_SWAP_STATE = 'StartFailed';
export const TAKER_FEE_SEND_FAILED_SWAP_STATE = 'TakerFeeSendFailed';
export const TAKER_PAYMENT_TRANSACTION_FAILED_SWAP_STATE =
  'TakerPaymentTransactionFailed';
export const TAKER_PAYMENT_DATA_SEND_FAILED_SWAP_STATE =
  'TakerPaymentDataSendFailed';
export const TAKER_PAYMENT_WAIT_FOR_SPEND_FAILED_SWAP_STATE =
  'TakerPaymentWaitForSpendFailed';
export const TAKER_PAYMENT_REFUNDED_SWAP_STATE = 'TakerPaymentRefunded';
export const TAKER_PAYMENT_REFUND_FAILED_SWAP_STATE =
  'TakerPaymentRefundFailed';
export const MAKER_PAYMENT_VALIDATE_FAILED_SWAP_STATE =
  'MakerPaymentValidateFailed';
export const MAKER_PAYMENT_SPEND_FAILED_SWAP_STATE = 'MakerPaymentSpendFailed';

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

export const STATE_FAILED_SWAPS = [
  START_FAILED_SWAP_STATE,
  TAKER_FEE_SEND_FAILED_SWAP_STATE,
  TAKER_PAYMENT_TRANSACTION_FAILED_SWAP_STATE,
  TAKER_PAYMENT_DATA_SEND_FAILED_SWAP_STATE,
  TAKER_PAYMENT_WAIT_FOR_SPEND_FAILED_SWAP_STATE,
  TAKER_PAYMENT_REFUNDED_SWAP_STATE,
  TAKER_PAYMENT_REFUND_FAILED_SWAP_STATE,
  MAKER_PAYMENT_VALIDATE_FAILED_SWAP_STATE,
  MAKER_PAYMENT_SPEND_FAILED_SWAP_STATE
];

export const STATE_FAILED_SWAPS_MESSAGE = {
  [START_FAILED_SWAP_STATE]: 'Start Failed',
  [TAKER_FEE_SEND_FAILED_SWAP_STATE]: 'Taker Fee Send Failed',
  [TAKER_PAYMENT_TRANSACTION_FAILED_SWAP_STATE]:
    'Taker Payment Transaction Failed',
  [TAKER_PAYMENT_DATA_SEND_FAILED_SWAP_STATE]: 'Taker Payment Data Send Failed',
  [TAKER_PAYMENT_WAIT_FOR_SPEND_FAILED_SWAP_STATE]:
    'Taker Payment Wait For Spend Failed',
  [TAKER_PAYMENT_REFUNDED_SWAP_STATE]: 'Taker Payment Refunded',
  [TAKER_PAYMENT_REFUND_FAILED_SWAP_STATE]: 'Taker Payment Refund Failed',
  [MAKER_PAYMENT_VALIDATE_FAILED_SWAP_STATE]: 'Maker Payment Validate Failed',
  [MAKER_PAYMENT_SPEND_FAILED_SWAP_STATE]: 'Maker Payment Spend Failed'
};

export const NA = 'N/A';
