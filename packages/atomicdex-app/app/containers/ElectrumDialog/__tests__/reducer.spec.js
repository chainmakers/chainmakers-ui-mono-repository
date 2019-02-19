import electrumDialogReducer, { initialState } from '../reducer';
import { showElectrumDialog, hideElectrumDialog } from '../actions';

describe('containers/ElectrumDialog/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(electrumDialogReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/ElectrumDialog/reducers/showElectrumDialog', () => {
  it('should handle the showElectrumDialog action correctly', () => {
    const expectedResult = initialState.set('show', true);

    expect(electrumDialogReducer(initialState, showElectrumDialog())).toEqual(
      expectedResult
    );
  });
});

describe('containers/ElectrumDialog/reducers/hideElectrumDialog', () => {
  it('should handle the hideElectrumDialog action correctly', () => {
    const expectedResult = initialState.set('show', false);

    expect(electrumDialogReducer(initialState, hideElectrumDialog())).toEqual(
      expectedResult
    );
  });
});
