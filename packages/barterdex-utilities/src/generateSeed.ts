import { encode } from 'bs58';
import { sha256 } from 'sha.js';
import wordlist from './wordlist';
import { choice } from './random';

const sha256Obj = new sha256();

function toHexString(byteArray) {
  return Array.from(byteArray, (byte: any) =>
    `0${(byte & 0xff).toString(16)}`.slice(-2)
  ).join('');
}

function toByteArray(hexString) {
  const result = [];
  while (hexString.length >= 2) {
    result.push(parseInt(hexString.substring(0, 2), 16));
    // eslint-disable-next-line no-param-reassign
    hexString = hexString.substring(2, hexString.length);
  }
  return result;
}

export function generateSeed() {
  let seed = '';
  for (let i = 0; i < 14; i += 1) {
    const buf = choice(wordlist);
    seed += seed.search(buf) < 0 ? `${buf} ` : '';
  }

  return seed.trim();
}

export function generateWif(seed) {
  let seedhash = sha256Obj
    .update(seed.trim())
    .digest('hex');
  const result = [];

  while (seedhash.length >= 2) {
    result.push(parseInt(seedhash.substring(0, 2), 16));
    seedhash = seedhash.substring(2, seedhash.length);
  }

  result[0] &= 248;
  result[31] &= 127;
  result[31] |= 64;

  const pre2 = 0xff & 188;
  // eslint-disable-next-line no-unused-vars
  const pre = pre2.toString(16);

  const hash = [];
  for (let i = 0; i < result.length + 2; i += 1) {
    hash[i] =
      // eslint-disable-next-line no-nested-ternary
      i === 0 ? 0xff & 188 : i === result.length + 1 ? 0xff & 1 : result[i - 1];
  }

  const doublesha = sha256Obj
    .update(
      toByteArray(
        sha256Obj
          .update(hash)
          .digest('hex')
      )
    )
    .digest('hex');
  const priv = toHexString(hash) + doublesha.substr(0, 8);
  const wif = encode(Buffer.from(toByteArray(priv)));
  return wif;
}
