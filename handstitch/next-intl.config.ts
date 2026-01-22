// next-intl.config.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'mk'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined, otherwise use default
  const validLocale = locale && locales.includes(locale as any)
    ? locale
    : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
    timeZone: 'Europe/Skopje',
  };
});
