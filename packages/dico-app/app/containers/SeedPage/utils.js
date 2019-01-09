/* eslint-disable */
import bs58 from 'bs58';
import shajs from 'sha.js';
import { choice } from '../../utils/random';
import wordlist from './wordlist';

const debug = require('debug')('dicoapp:containers:SeedPage:utils');

function toHexString(byteArray) {
  return Array.from(byteArray, byte =>
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

  debug(`generateSeed: ${seed}`);
  return seed.trim();
}

export function generateWif(seed) {
  let seedhash = shajs('sha256')
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

  const doublesha = shajs('sha256')
    .update(
      toByteArray(
        shajs('sha256')
          .update(hash)
          .digest('hex')
      )
    )
    .digest('hex');
  const priv = toHexString(hash) + doublesha.substr(0, 8);
  const wif = bs58.encode(Buffer.from(toByteArray(priv)));
  debug(`generateWif: ${wif}`);
  return wif;
}
