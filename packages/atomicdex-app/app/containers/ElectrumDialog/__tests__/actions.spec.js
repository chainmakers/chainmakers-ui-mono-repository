import {
  showElectrumDialog,
  hideElectrumDialog,
  addElectrum,
  removeElectrum
} from '../actions';
import {
  ELECTRUM_DIALOG_SHOW,
  ELECTRUM_DIALOG_HIDE,
  ELECTRUM_ADD,
  ELECTRUM_REMOVE
} from '../constants';

describe('containers/ElectrumDialog/actions/showElectrumDialog', () => {
  it('should showElectrumDialog should create showElectrumDialog action', () => {
    expect(showElectrumDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_DIALOG_SHOW
    };

    expect(showElectrumDialog()).toEqual(expectedResult);
  });
});

describe('containers/ElectrumDialog/actions/hideElectrumDialog', () => {
  it('should hideElectrumDialog should create hideElectrumDialog action', () => {
    expect(hideElectrumDialog()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_DIALOG_HIDE
    };

    expect(hideElectrumDialog()).toEqual(expectedResult);
  });
});

describe('containers/ElectrumDialog/actions/addElectrum', () => {
  const payload = {
    coins: ['KMD', 'BTC']
  };
  it('should addElectrum should create addElectrum action', () => {
    expect(addElectrum(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_ADD,
      payload
    };

    expect(addElectrum(payload)).toEqual(expectedResult);
  });
});

describe('containers/ElectrumDialog/actions/removeElectrum', () => {
  const payload = {
    coins: ['KMD', 'BTC']
  };
  it('should removeElectrum should create removeElectrum action', () => {
    expect(removeElectrum(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: ELECTRUM_REMOVE,
      payload
    };

    expect(removeElectrum(payload)).toEqual(expectedResult);
  });
});
