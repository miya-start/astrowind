const DEFAULT_LOCALE = "ja";

const locales = {
  [DEFAULT_LOCALE]: {
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

function isLocaleKey(locale: unknown): locale is LocaleKey {
  return (
    typeof locale === "string" && (localeKeys as string[]).includes(locale)
  );
}

export function getLocaleKey(locale: unknown): LocaleKey {
  if (isLocaleKey(locale)) return locale;
  return DEFAULT_LOCALE;
}

export type TranslationContents = Record<string, Record<LocaleKey, string>>;
export const getTranslation =
  (content: TranslationContents, locale: LocaleKey) => (key: string) =>
    content[key]?.[locale] ?? key;
