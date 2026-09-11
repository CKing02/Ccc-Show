import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { formatYear } from "@/lib/date";
import { pickLocalized, t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

interface FeaturedWorksProps {
  locale: Locale;
}

export async function FeaturedWorks({ locale }: FeaturedWorksProps) {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <section className="border-t border-ink-faint">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <Label>{t(locale, "home_featured_label")}</Label>
            <Link
              href="/works"
              className="text-xs uppercase tracking-[0.2em] text-ink-muted transition-opacity hover:opacity-60"
            >
              {t(locale, "home_featured_view_all")} →
            </Link>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link href={`/works/${p.slug}`} className="group block">
                <div className="overflow-hidden bg-bg-paper">
                  <Image
                    src={p.cover}
                    alt={pickLocalized(locale, p.title)}
                    width={1200}
                    height={675}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl md:text-3xl">
                    {pickLocalized(locale, p.title)}
                  </h3>
                  <Label className="shrink-0">{formatYear(p.date)}</Label>
                </div>
                <p className="mt-2 text-ink-muted">{pickLocalized(locale, p.summary)}</p>
                <div className="mt-4 flex gap-3">
                  {p.platform.map((pl) => (
                    <Label key={pl} className="text-ink-faint">
                      {pl.toUpperCase()}
                    </Label>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}