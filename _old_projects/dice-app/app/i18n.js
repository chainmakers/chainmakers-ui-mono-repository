const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const viLocaleData = require('react-intl/locale-data/vi');

const enTranslationMessages = require('./translations/en.json');
const viTranslationMessages = require('./translations/vi.json');

addLocaleData(enLocaleData);
addLocaleData(viLocaleData);

export const DEFAULT_LOCALE = 'en';

// prettier-ignore
export const appLocales = [
  'en',
  'vi',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  vi: formatTranslationMessages('vi', viTranslationMessages)
};
