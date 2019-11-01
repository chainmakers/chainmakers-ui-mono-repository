import { CHANGE_LOCALE } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}
