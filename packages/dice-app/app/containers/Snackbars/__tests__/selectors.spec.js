// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import { selectSnackbars } from '../selectors';

describe('containers/Snackbars/selectors/selectSnackbars', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectSnackbars(mockedState)).toEqual(initialState);
  });
});
