import fs from "fs";
import yaml from "js-yaml";

const locales = {
  ja: {
    labelSimple: "JP",
    labelDetail: "日本語",
  },
  en: {
    labelSimple: "EN",
    labelDetail: "English",
  },
} as const;

type Locale = keyof typeof locales;

export const getTranslation =
  (path: string, locale: Locale) => (key: string) => {
    const translations = yaml.load(
      fs.readFileSync(`src/i18n/contents/${path}.yaml`, "utf8")
    ) as Record<string, Record<Locale, string>>;
    return translations[key]?.[locale] ?? key;
  };
