import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  Inter,
  Noto_Serif_SC,
  Noto_Sans_SC,
} from "next/font/google";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { getLocale } from "@/lib/i18n-server";
import { siteUrl } from "@/lib/site";
import { JsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  weight: ["400", "500"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  weight: ["400", "500"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "展示台 · Portfolio",
  description: "个人作品集 / Portfolio",
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "展示台 · Portfolio" },
      ],
    },
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${notoSerif.variable} ${inter.variable} ${notoSans.variable}`}
    >
      <body className="bg-bg text-ink antialiased">
        <JsonLd data={websiteJsonLd(locale)} />
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
