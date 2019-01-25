import { fromJS } from 'immutable';
import data from '../../__tests__/app-state.json';
import {
  selectGlobal,
  makeSelectLocation,
  makeSelectBlockchainInfo,
  makeSelectBalance,
  makeSelectKomodod,
  makeSelectKomododState
} from '../selectors';
import { initialState } from '../reducer';
import { APP_STATE_NAME, KOMODOD_STATE_STARTED } from '../constants';

describe('containers/App/selectors/selectGlobal', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectGlobal(mockedState)).toEqual(initialState);
  });
});

describe('containers/App/selectors/makeSelectLocation', () => {
  it('should select the location state', () => {
    const mockedState = fromJS(data);
    const selectLocation = makeSelectLocation();
    expect(selectLocation(mockedState)).toEqual({
      hash: '',
      pathname: '/buy',
      search: ''
    });
  });
});

describe('containers/App/selectors/makeSelectBlockchainInfo', () => {
  it('should select the blockchain state', () => {
    const mockedState = fromJS(data);
    const selectBlockchainInfo = makeSelectBlockchainInfo();
    expect(selectBlockchainInfo(mockedState)).toEqual(
      fromJS({
        blocks: 123,
        longestchain: 123,
        balance: 10.123
      })
    );
  });
});

describe('containers/App/selectors/makeSelectBalance', () => {
  it('should select the balance state', () => {
    const mockedState = fromJS(data);
    const selectBalance = makeSelectBalance();
    expect(selectBalance(mockedState)).toEqual(10.123);
  });
});

describe('containers/App/selectors/makeSelectKomodod', () => {
  it('should select the komodo state', () => {
    const mockedState = fromJS(data);
    const selectKomodod = makeSelectKomodod();
    expect(selectKomodod(mockedState)).toEqual(
      fromJS({
        state: KOMODOD_STATE_STARTED
      })
    );
  });
});

describe('containers/App/selectors/makeSelectBalance', () => {
  it('should select the komodo state', () => {
    const mockedState = fromJS(data);
    const selectKomododState = makeSelectKomododState();
    expect(selectKomododState(mockedState)).toEqual(KOMODOD_STATE_STARTED);
  });
});
