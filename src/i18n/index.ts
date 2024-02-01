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

export type LocaleKey = keyof typeof locales;
export const localeKeys = Object.keys(locales) as LocaleKey[];

export const getTranslation =
  (path: string, locale: LocaleKey) => (key: string) => {
    const translations = yaml.load(
      fs.readFileSync(`src/i18n/contents/${path}.yaml`, "utf8")
    ) as Record<string, Record<LocaleKey, string>>;
    return translations[key]?.[locale] ?? key;
  };
