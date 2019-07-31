import {
  openApplicationDialog,
  closeApplicationDialog,
  openMM2Dialog,
  closeMM2Dialog
} from '../actions';
import {
  APPLICATION_DIALOG_OPEN,
  APPLICATION_DIALOG_CLOSE,
  MM2_DIALOG_OPEN,
  MM2_DIALOG_CLOSE
} from '../constants';

describe('containers/SettingsPage/actions/openApplicationDialog', () => {
  it('should openApplicationDialog should create openApplicationDialog action', () => {
    expect(openApplicationDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: APPLICATION_DIALOG_OPEN
    };

    expect(openApplicationDialog()).toEqual(expectedResult);
  });
});

describe('containers/SettingsPage/actions/closeApplicationDialog', () => {
  it('should closeApplicationDialog should create closeApplicationDialog action', () => {
    expect(closeApplicationDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: APPLICATION_DIALOG_CLOSE
    };

    expect(closeApplicationDialog()).toEqual(expectedResult);
  });
});

describe('containers/SettingsPage/actions/openMM2Dialog', () => {
  it('should openMM2Dialog should create openMM2Dialog action', () => {
    expect(openMM2Dialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: MM2_DIALOG_OPEN
    };

    expect(openMM2Dialog()).toEqual(expectedResult);
  });
});

describe('containers/SettingsPage/actions/closeMM2Dialog', () => {
  it('should closeMM2Dialog should create closeMM2Dialog action', () => {
    expect(closeMM2Dialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: MM2_DIALOG_CLOSE
    };

    expect(closeMM2Dialog()).toEqual(expectedResult);
  });
});
