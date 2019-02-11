// @flow
import {
  generatePassphrase,
  generateWif,
  openWifExpansion,
  closeWifExpansion
} from '../actions';
import { GENERATE_PASSPHRASE, GENERATE_WIF } from '../constants';
import type { GeneratePassphrasePayload } from '../schema';

describe('containers/SeedPage/actions/generatePassphrase', () => {
  const payload: GeneratePassphrasePayload = {
    passphrase: 'passphrase'
  };
  it('should generatePassphrase should generatePassphrase action', () => {
    expect(generatePassphrase(payload)).toMatchSnapshot();
  });

  it('should return the correct payload', () => {
    const expectedResult = {
      type: GENERATE_PASSPHRASE,
      payload
    };

    expect(generatePassphrase(payload)).toEqual(expectedResult);
  });
});

describe('containers/SeedPage/actions/generateWif', () => {
  const wif = 'wif';
  it('should generateWif should generateWif action', () => {
    expect(generateWif(wif)).toMatchSnapshot();
  });

  it('should return the correct payload', () => {
    const expectedResult = {
      type: GENERATE_WIF,
      payload: {
        wif
      }
    };

    expect(generateWif(wif)).toEqual(expectedResult);
  });
});

describe('containers/SeedPage/actions/openWifExpansion', () => {
  it('should openWifExpansion should generateWif action', () => {
    expect(openWifExpansion()).toMatchSnapshot();
  });
});

describe('containers/SeedPage/actions/closeWifExpansion', () => {
  it('should closeWifExpansion should closeWifExpansion action', () => {
    expect(closeWifExpansion()).toMatchSnapshot();
  });
});
