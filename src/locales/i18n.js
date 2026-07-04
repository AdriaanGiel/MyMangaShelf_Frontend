import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./en.json";
import nl from "./nl.json";
import es from "./es.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const language = Localization.getLocales()?.[0]?.languageCode || "en";
const APP_LANG_KEY = "app_lang";

const resources = {
  en: { translation: en },
  nl: { translation: nl },
  es: { translation: es },
};

export const initI18n = async () => {
  const savedLanguage = await AsyncStorage.getItem(APP_LANG_KEY);

  const deviceLanguage = Localization.getLocales()?.[0]?.languageCode || "en";

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || deviceLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (language) => {
  await AsyncStorage.setItem(APP_LANG_KEY, language);
  await i18n.changeLanguage(language);
};

export default i18n;
