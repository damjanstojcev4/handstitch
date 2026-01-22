// app/[locale]/layout.tsx
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

// Type definitions
type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // params is now a Promise
};

export default async function LocaleLayout({ children, params }: Props) {
  // Await the params to get the locale
  const { locale } = await params;

  // Validate locale
  if (!["en", "mk"].includes(locale)) {
    notFound();
  }

  // Get messages
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (e) {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}