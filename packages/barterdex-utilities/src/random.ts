import { randomBytes, pseudoRandomBytes } from 'crypto';

export function hexString(digits = 8) {
  const numBytes = Math.ceil(digits / 2);
  let bytes;
  // Try to get cryptographically strong randomness. Fall back to
  // non-cryptographically strong if not available.
  try {
    bytes = randomBytes(numBytes);
  } catch (e) {
    // XXX should re-throw any error except insufficient entropy
    bytes = pseudoRandomBytes(numBytes);
  }
  const result = bytes.toString('hex');
  // If the number of digits is odd, we'll have generated an extra 4 bits
  // of randomness, so we need to trim the last digit.
  return result.substring(0, digits);
}

export function fraction() {
  const numerator = parseInt(hexString(8), 16);
  return numerator * 2.3283064365386963e-10; // 2^-32
}

export function choice(arrayOrString) {
  const index = Math.floor(fraction() * arrayOrString.length);
  if (typeof arrayOrString === 'string') {
    return arrayOrString.substr(index, 1);
  }

  return arrayOrString[index];
}

export default {
  choice,
  fraction,
  hexString
};
