// app/[locale]/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

// Type definitions
type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // params is now a Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const content = {
    en: {
      title: "Handstitch",
      description: "Discover handcrafted leather wallets, crafted for durability and style. Handstitch offers premium, unique leather accessories made with artisanal passion.",
      keywords: "leather wallets, handcrafted wallets, artisanal leather, premium accessories, Handstitch"
    },
    mk: {
      title: "Handstitch",
      description: "Откријте рачно изработени кожни паричници, создадени за издржливост и стил. Handstitch нуди премиум, уникатни кожни додатоци изработени со занаетчиска страст.",
      keywords: "кожни паричници, рачна изработка, кожни производи, занаетчиство, Handstitch"
    }
  };

  const seo = content[locale as keyof typeof content] || content.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    icons: {
      icon: "/images/H.png",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: locale === 'mk' ? 'mk_MK' : 'en_US',
      type: 'website',
      siteName: 'Handstitch',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/images/logo.png'],
      creator: '@handstitch',
    },
    other: {
      'apple-mobile-web-app-title': 'Handstitch',
    }
  };
}

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
    <html lang={locale} className="scroll-smooth">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}