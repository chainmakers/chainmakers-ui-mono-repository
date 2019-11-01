import { changeLocale } from '../actions';
import { CHANGE_LOCALE } from '../constants';

describe('containers/LanguageProvider/actions/changeLocale', () => {
  it('has a type of CHANGE_LOCALE', () => {
    const expected = {
      type: CHANGE_LOCALE,
      locale: 'de'
    };
    expect(changeLocale('de')).toEqual(expected);
  });
});
