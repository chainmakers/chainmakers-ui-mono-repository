// eslint-disable-next-line import/prefer-default-export
export const APP_STATE_NAME = 'dice';

export const MAXODDS = 1000;
export const MINODDS = 0;
export const MINBET = 0.001;
export const MAXBET = 1000;

export const FUNDINGTXID =
  '5be49570c56d036abb08b6d084da93a8a86f58fc48db4a1086be95540d752d6f';

export const BETTING_STATUS_PENDING = 'PENDING';
export const BETTING_STATUS_WIN = 'WIN';
export const BETTING_STATUS_LOSS = 'LOSS';

// betting
export const KMDICE_BETTING_START = 'kmdice/DicePage/KMDICE_BETTING_START';
export const KMDICE_BETTING_INSERT = 'kmdice/DicePage/KMDICE_BETTING_INSERT';
export const KMDICE_BETTING_START_SUCCESS =
  'kmdice/DicePage/KMDICE_BETTING_START_SUCCESS';
export const KMDICE_BETTING_START_ERROR =
  'kmdice/DicePage/KMDICE_BETTING_START_ERROR';

// syncing
export const KMDICE_BETTING_SYNC = 'kmdice/DicePage/KMDICE_BETTING_SYNC';
export const KMDICE_BETTING_SYNC_SUCCESS =
  'kmdice/DicePage/KMDICE_BETTING_SYNC_SUCCESS';
export const KMDICE_BETTING_SYNC_ERROR =
  'kmdice/DicePage/KMDICE_BETTING_SYNC_ERROR';

// ./komodo-cli -ac_name=KMDICE diceinfo 5be49570c56d036abb08b6d084da93a8a86f58fc48db4a1086be95540d752d6f
// {
//   "result": "success",
//   "fundingtxid": "5be49570c56d036abb08b6d084da93a8a86f58fc48db4a1086be95540d752d6f",
//   "name": "KMDICE",
//   "sbits": 76155294338379,
//   "minbet": "0.00100000",
//   "maxbet": "1000.00000000",
//   "maxodds": 1500,
//   "timeoutblocks": 600,
//   "funding": "5508707.57809912",
//   "entropytxs": 8751
// }
