import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { appConfig } from '@/config/app';
import '../globals.css';
import { ToasterProvider } from '@/components/providers/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: appConfig.name,
  description: 'Comprehensive platform for pet services businesses',
};

export function generateStaticParams() {
  return appConfig.i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Note: Locale validation is handled by next-intl middleware/proxy
  // Invalid locales will be redirected automatically

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToasterProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

