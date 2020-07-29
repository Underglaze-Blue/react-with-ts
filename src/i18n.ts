import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import common from './locales/common'

const resources = {
  'zh-CN': {
    translation: {
      'Welcome to React': '欢迎来到 React 和 react-i18next',
      ...common
    }
  },
  'en': {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
      'loading': 'Loading...'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'zh',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }

  })

export default i18n
