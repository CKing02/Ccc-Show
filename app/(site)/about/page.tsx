import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";
import { pickLocalized, t } from "@/lib/i18n";
import { about } from "@/lib/about";
import { site } from "@/lib/site";
import { Label } from "@/components/ui/Label";
import { SectionRule } from "@/components/layout/SectionRule";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, personJsonLd } from "@/lib/structured-data";

const TOTAL_SECTIONS = 3;

export const metadata: Metadata = {
  title: "关于 · About",
  description:
    "产品经理，专注 AI 应用的产品化。主导内部 RAG 知识助手从 v0.1.0 到 v0.4.0；日常与 Claude Code 协作。",
};

export default async function AboutPage() {
  const locale = await getLocale();
  const skillsLabel = t(locale, "about_skills");
  const timelineLabel = t(locale, "about_timeline");

  return (
    <article>
      <JsonLd data={personJsonLd(locale)} />
      {/* ── Section 01: Hero ─────────────────────────────────── */}
      <header className="border-b border-ink-faint">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <Reveal>
            <Label>{pickLocalized(locale, about.kicker)}</Label>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-8 font-serif text-6xl leading-[1.05] tracking-tight md:text-9xl">
              {t(locale, "about_title")}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-12 max-w-3xl font-serif text-xl leading-relaxed text-ink-muted md:text-3xl">
              {pickLocalized(locale, about.subtitle)}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Section 02: Skills ───────────────────────────────── */}
      <SectionRule index={2} total={TOTAL_SECTIONS} label={skillsLabel} />
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-12 md:px-12 md:py-20">
          <div className="md:col-span-3">
            <Reveal>
              <Label>{skillsLabel}</Label>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {about.skills.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <Label className="block">
                    {pickLocalized(locale, s.category)}
                  </Label>
                  <ul className="mt-6 space-y-2 font-serif text-lg md:text-xl">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 03: Timeline ─────────────────────────────── */}
      <SectionRule index={3} total={TOTAL_SECTIONS} label={timelineLabel} />
      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-12 md:px-12 md:py-20">
          <div className="md:col-span-3">
            <Reveal>
              <Label>{timelineLabel}</Label>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <ol className="divide-y divide-ink-faint border-t border-b border-ink-faint">
              {about.timeline.map((e, i) => (
                <Reveal as="li" key={i} delay={i * 60}>
                  <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-3">
                      <Label className="text-ink">{e.year}</Label>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="font-serif text-2xl md:text-3xl">
                        {pickLocalized(locale, e.title)}
                      </h3>
                      <p className="mt-3 text-ink-muted">
                        {pickLocalized(locale, e.detail)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Footer note ──────────────────────────────────────── */}
      <section className="border-t border-ink-faint">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <Reveal>
            <Label>{t(locale, "home_contact_label")}</Label>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-8 font-serif text-2xl leading-relaxed md:text-3xl">
              {locale === "en"
                ? "Always happy to hear from you — collaboration, questions, or just a hello."
                : "欢迎来信——合作、提问、或者只是想打个招呼都可以。"}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block border-b border-ink pb-1 font-serif text-xl transition-opacity hover:opacity-60 md:text-2xl"
            >
              {site.email}
            </a>
          </Reveal>
        </div>
      </section>
    </article>
  );
}