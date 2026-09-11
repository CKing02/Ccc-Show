import Link from "next/link";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

interface AboutTeaserProps {
  locale: Locale;
}

export function AboutTeaser({ locale }: AboutTeaserProps) {
  return (
    <section className="border-t border-ink-faint">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-12 md:py-32">
        <div className="md:col-span-4">
          <Reveal>
            <Label>{t(locale, "home_about_label")}</Label>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={80}>
            <p className="font-serif text-2xl leading-relaxed md:text-3xl">
              {locale === "en" ? (
                <>
                  Independent developer, focused on bringing restrained aesthetics and
                  considered interaction to everyday tools.
                  <br />
                  Good software should be like an exhibit — worth pausing for, worth a
                  second look.
                </>
              ) : (
                <>
                  独立开发者，专注于为日常工具注入克制的美感与深思熟虑的交互。
                  <br />
                  相信好的软件应该像一件展品——值得驻足，值得再看一遍。
                </>
              )}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link
              href="/about"
              className="mt-12 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
            >
              {t(locale, "home_about_view")} →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}