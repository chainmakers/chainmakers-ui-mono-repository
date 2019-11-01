import { openSnackbars, closeSnackbars } from '../actions';

import { SNACKBARS_OPEN, SNACKBARS_CLOSE } from '../constants';

describe('containers/BuyPage/actions/openSnackbars', () => {
  const message = 'message';
  it('should openSnackbars should create openSnackbars action', () => {
    expect(openSnackbars(message)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SNACKBARS_OPEN,
      payload: {
        message
      }
    };

    expect(openSnackbars(message)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/closeSnackbars', () => {
  it('should closeSnackbars should create closeSnackbars action', () => {
    expect(closeSnackbars()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: SNACKBARS_CLOSE
    };

    expect(closeSnackbars()).toEqual(expectedResult);
  });
});
