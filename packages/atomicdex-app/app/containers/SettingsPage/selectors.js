export const selectApplicationState = settingsState =>
  settingsState.getIn(['applicationDialog', 'open']);

export const selectMM2State = settingsState =>
  settingsState.getIn(['mm2Dialog', 'open']);

export const selectCurrentTab = settingsState =>
  settingsState.get('currentTab');
