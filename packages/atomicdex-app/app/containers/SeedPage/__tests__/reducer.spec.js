// @flow
import walletReducer, { initialState } from '../reducer';
import {
  generatePassphrase,
  generateWif,
  openWifExpansion,
  closeWifExpansion
} from '../actions';
import type { GeneratePassphrasePayload } from '../schema';

describe('containers/SeedPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(walletReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/SeedPage/reducers/generatePassphrase', () => {
  const payload: GeneratePassphrasePayload = {
    passphrase: 'passphrase'
  };

  it('should handle the generatePassphrase action correctly', () => {
    const expectedResult = initialState.set('passphrase', payload.passphrase);

    expect(walletReducer(initialState, generatePassphrase(payload))).toEqual(
      expectedResult
    );
  });
});

describe('containers/SeedPage/reducers/generateWif', () => {
  const wif = 'wif';

  it('should handle the generateWif action correctly', () => {
    const expectedResult = initialState.set('wif', wif);

    expect(walletReducer(initialState, generateWif(wif))).toEqual(
      expectedResult
    );
  });
});

describe('containers/SeedPage/reducers/openWifExpansion', () => {
  it('should handle the openWifExpansion action correctly', () => {
    const expectedResult = initialState.set('wifExpansion', true);

    expect(walletReducer(initialState, openWifExpansion())).toEqual(
      expectedResult
    );
  });
});

describe('containers/SeedPage/reducers/closeWifExpansion', () => {
  it('should handle the closeWifExpansion action correctly', () => {
    const expectedResult = initialState.set('wifExpansion', true);

    expect(walletReducer(expectedResult, closeWifExpansion())).toEqual(
      initialState
    );
  });
});
