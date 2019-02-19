// @flow
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import { selectElectrumState, makeSelectElectrumState } from '../selectors';
import data from '../../__tests__/app-state.json';

describe('containers/ElectrumDialog/selectors/selectElectrumState', () => {
  it('should select the logoutDialog state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectElectrumState(mockedState)).toEqual(initialState);
  });
});

describe('containers/ElectrumDialog/selectors/makeSelectElectrumState', () => {
  it('should select the logoutDialog state', () => {
    const mockedState = fromJS(data);
    const select = makeSelectElectrumState();
    expect(select(mockedState)).toEqual(false);
  });
});
