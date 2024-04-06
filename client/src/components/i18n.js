import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationZH from './locales/zh/translation.json';
import translationES from './locales/es/translation.json';
import translationAR from './locales/ar/translation.json';
import translationDE from './locales/de/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  zh: {
    translation: translationZH
  },
  es: {
    translation: translationES
  },
  ar: {
    translation: translationAR
  },
  de: {
    translation: translationDE
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en", // when specified language translations are unavailable
    interpolation: {
      escapeValue: false // prevents XSS attacks
    }
  });

export default i18n;
