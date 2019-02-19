import { showElectrumDialog, hideElectrumDialog } from '../actions';
import { ELECTRUM_DIALOG_SHOW, ELECTRUM_DIALOG_HIDE } from '../constants';

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
