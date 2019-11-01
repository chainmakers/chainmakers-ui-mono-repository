// @flow
import snackbarsReducer, { initialState } from '../reducer';
import { logout } from '../../App/actions';
import { openSnackbars, closeSnackbars } from '../actions';

describe('containers/Snackbars/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(snackbarsReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/Snackbars/reducers/logout', () => {
  it('should handle the logout action correctly', () => {
    const state = initialState.set('message', 'no message');

    expect(snackbarsReducer(state, logout())).toEqual(initialState);
  });
});

describe('containers/Snackbars/reducers/closeSnackbars', () => {
  it('should handle the closeSnackbars action correctly', () => {
    const state = initialState.set('open', true);

    expect(snackbarsReducer(state, closeSnackbars())).toEqual(initialState);
  });
});

describe('containers/Snackbars/reducers/openSnackbars', () => {
  const message = 'no message';
  it('should handle the openSnackbars action correctly', () => {
    const expected = initialState.set('message', message).set('open', true);

    expect(snackbarsReducer(initialState, openSnackbars(message))).toEqual(
      expected
    );
  });
});
