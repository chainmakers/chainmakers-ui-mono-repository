import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { APP_STATE_NAME } from './constants';

const selectLanguage = state => state.get(APP_STATE_NAME, initialState);

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.get('locale'));

export { selectLanguage, makeSelectLocale };
