import { getRequestConfig } from 'next-intl/server';
import { appConfig } from '@/config/app';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid or undefined, use default locale
  const validLocale =
    locale && appConfig.i18n.locales.includes(locale as any)
      ? locale
      : appConfig.i18n.defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});

