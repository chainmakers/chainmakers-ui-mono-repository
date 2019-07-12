import { floor } from 'barterdex-utilities';
import { DEXFEE } from './constants';

const MONTH_NAMES = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

export function getMonth(date) {
  return MONTH_NAMES[date.getMonth()];
}

// if dexfee is below 0.0001, then the fee is 0.0001
// also, if KMD then dexfee *= 0.9
export function calculateDexfee(base, sell, amount) {
  let fee = floor(amount / DEXFEE, 8);
  fee = fee < 0.0001 ? 0.0001 : fee;

  if (base === 'KMD' || sell === 'KMD') {
    fee *= 0.9;
  }
  return fee;
}
