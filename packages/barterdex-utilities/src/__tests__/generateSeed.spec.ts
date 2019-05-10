import { generateSeed, generateWif } from '../generateSeed';

describe('packages/barterdex-utilities/src/generateSeed', () => {
  it('should generateSeed should create seed correctly', () => {
    const s = generateSeed();
    expect(s.split(' ').length).toEqual(14);
  });

  it('should generateWif should create wif correctly', () => {
    let s = 'bob passphrase';
    let wif = generateWif(s);
    expect(wif).toEqual('UvCjJf4dKSs2vFGVtCnUTAhR5FTZGdg43DDRa9s7s5DV1sSDX14g');

    s = 'chief banner equal chuckle scout earth worry before moment scene door adult stove wife';
    wif = generateWif(s);
    expect(wif).toEqual('UvT7mh1tuQTvLTPSqezNuyRFNTcfEiCqnu6UF8k1RPgzuMxotPo4');

    s = 'lobster glass tonight lion unusual slam suit piece visa salt bus honey';
    wif = generateWif(s);
    expect(wif).toEqual('Ux5W8CCFkgkujmBam1CwUcet4rkq668Xa7yA5xtvaDnhRkutD6yE');
  });
});
