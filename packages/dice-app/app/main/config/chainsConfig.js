export const def = {
  coin: 'KMDICE',
  args: {
    ac_supply: 10500000,
    ac_reward: 2500000000,
    ac_halving: 210000,
    ac_cc: 2,
    addressindex: 1,
    spentindex: 1,
    pubkey: process.env.PUBKEY
    // addnode: '144.76.217.232'
  }
};

export default function loadChainsConfig(config) {
  return config.set('chains', def);
}
