import loginDialogReducer, { initialState } from '../reducer';
import {
  showLoginDialog,
  cancelLoginDialog,
  agreeLoginDialog
} from '../actions';

describe('containers/LoginDialog/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(loginDialogReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/LoginDialog/reducers/showLoginDialog', () => {
  it('should handle the showLoginDialog action correctly', () => {
    const expectedResult = initialState.set('show', true);

    expect(loginDialogReducer(initialState, showLoginDialog())).toEqual(
      expectedResult
    );
  });
});

describe('containers/LoginDialog/reducers/cancelLoginDialog', () => {
  it('should handle the cancelLoginDialog action correctly', () => {
    const expectedResult = initialState.set('show', false);

    expect(loginDialogReducer(initialState, cancelLoginDialog())).toEqual(
      expectedResult
    );
  });
});

describe('containers/LoginDialog/reducers/agreeLoginDialog', () => {
  it('should handle the agreeLoginDialog action correctly', () => {
    const expectedResult = initialState.set('show', false);

    expect(loginDialogReducer(initialState, agreeLoginDialog())).toEqual(
      expectedResult
    );
  });
});
