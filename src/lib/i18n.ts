import { appConfig } from '@/config/app';

/**
 * i18n utilities using app config
 */
export const i18n = {
  defaultLocale: appConfig.i18n.defaultLocale,
  locales: appConfig.i18n.locales,
  localeNames: appConfig.i18n.localeNames,
} as const;

export type Locale = (typeof i18n.locales)[number];

