import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from "./locales/common";

const resources = {
  zh_CN: {
    translations: {...common}

  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'zh_CN',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
