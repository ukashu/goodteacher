import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { getLocales } from 'expo-localization';
import en from './translations/en.json'
import pl from './translations/pl.json'

const languageDetector = {
  type: 'languageDetector',
  async: false, // flags below detection to be async
  detect: () => {
    const items = getLocales()
    return items[0].languageCode
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export const resources = {
  en: { translation: en },
  pl: { translation: pl }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector as any)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

  export default i18n;