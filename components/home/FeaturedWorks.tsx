import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { FeaturedWorkCard } from "./FeaturedWorkCard";

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
            <FeaturedWorkCard
              key={p.slug}
              project={p}
              locale={locale}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
