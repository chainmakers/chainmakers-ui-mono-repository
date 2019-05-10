import { sha256 } from 'js-sha256';
import { fromBuffer } from 'bigi';
import { ECPair } from'bitgo-utxo-lib';
import wordlist from './wordlist';
import { choice } from './random';

const network = {
  kmd: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip44: 141,
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb,
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationTimestamp: 1544835600,
    kmdInterest: true,
  }
};

export function generateSeed() {
  let seed = '';
  for (let i = 0; i < 14; i += 1) {
    const buf = choice(wordlist);
    if(seed.search(buf) === -1) {
      seed += `${buf} `;
    }
    else {
      i -= 1;
    }
  }

  return seed.trim();
}

export function generateWif(seed) {
  const sha256Obj = sha256.create();
  const bytes = sha256Obj.update(seed.trim()).array();

  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;

  const d = fromBuffer(bytes);
  const key = new ECPair(d, null, {
    network: network.kmd
  });

  // const keys = {
  //   priv: key.toWIF(),
  //   pub: key.getAddress(),
  //   pubHex: key.getPublicKeyBuffer().toString('hex'),
  // };

  return key.toWIF();
}
