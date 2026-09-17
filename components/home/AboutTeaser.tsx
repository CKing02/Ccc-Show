import Link from "next/link";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { pickLocalized, t } from "@/lib/i18n";
import { about } from "@/lib/about";
import type { Locale } from "@/lib/types";

interface AboutTeaserProps {
  locale: Locale;
}

export function AboutTeaser({ locale }: AboutTeaserProps) {
  return (
    <section className="border-t border-ink-faint">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28 lg:px-12 lg:py-36">
        <div className="md:col-span-4">
          <Reveal>
            <Label>{t(locale, "home_about_label")}</Label>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={80}>
            <p className="font-serif text-2xl leading-relaxed md:text-3xl lg:text-4xl">
              {locale === "en" ? (
                <>
                  Product Manager focused on AI productization — currently shipping
                  an internal RAG knowledge assistant (v0.1.0 → v0.4.0) with a
                  feedback → BadCase → auto-Prompt-Patch loop.
                  <br />
                  {pickLocalized(locale, about.subtitle)}
                </>
              ) : (
                <>
                  产品经理，专注 AI 应用的产品化——近期在主导内部 RAG 知识助手从
                  v0.1.0 迭代到 v0.4.0，搭了「反馈 → BadCase →
                  Prompt 补丁自动注入」的闭环。
                  <br />
                  {pickLocalized(locale, about.subtitle)}
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