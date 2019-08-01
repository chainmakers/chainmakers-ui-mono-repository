import {
  openApplicationDialog,
  closeApplicationDialog,
  openMM2Dialog,
  closeMM2Dialog,
  switchTab
} from '../actions';
import {
  APPLICATION_DIALOG_OPEN,
  APPLICATION_DIALOG_CLOSE,
  MM2_DIALOG_OPEN,
  MM2_DIALOG_CLOSE,
  TAB_SWITCH
} from '../constants';

describe('containers/SettingsPage/actions/openApplicationDialog', () => {
  it('should openApplicationDialog should create openApplicationDialog action', () => {
    expect(openApplicationDialog()).toMatchSnapshot();
  });

  it('should return the correct type', () => {
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

  it('should return the correct type', () => {
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

  it('should return the correct type', () => {
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

  it('should return the correct type', () => {
    const expectedResult = {
      type: MM2_DIALOG_CLOSE
    };

    expect(closeMM2Dialog()).toEqual(expectedResult);
  });
});

describe('containers/SettingsPage/actions/switchTab', () => {
  it('should switchTab should create switchTab action', () => {
    expect(switchTab()).toMatchSnapshot();
  });

  it('should return the correct type', () => {
    const expectedResult = {
      type: TAB_SWITCH,
      payload: {
        tab: 0
      }
    };

    expect(switchTab()).toEqual(expectedResult);
  });

  it('should return the correct type and tab', () => {
    const expectedResult = {
      type: TAB_SWITCH,
      payload: {
        tab: 3
      }
    };

    expect(switchTab(3)).toEqual(expectedResult);
  });
});
