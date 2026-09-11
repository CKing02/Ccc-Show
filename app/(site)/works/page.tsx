import { Suspense } from "react";
import { getAllProjects } from "@/lib/content";
import { WorkGallery } from "@/components/works/WorkGallery";
import { PlatformFilter } from "@/components/works/PlatformFilter";
import { Label } from "@/components/ui/Label";
import { getLocale } from "@/lib/i18n-server";
import { t, format } from "@/lib/i18n";
import type { Platform } from "@/lib/types";

interface WorksPageProps {
  searchParams: Promise<{ platform?: Platform }>;
}

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const params = await searchParams;
  const locale = await getLocale();
  const allProjects = await getAllProjects();
  const filtered = params.platform
    ? allProjects.filter((p) => p.platform.includes(params.platform!))
    : allProjects;

  return (
    <div>
      <header className="border-b border-ink-faint">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <Label>{t(locale, "works_title_en")}</Label>
          <h1 className="mt-6 font-serif text-5xl leading-tight md:text-7xl">
            {t(locale, "works_title")}
          </h1>
          <p className="mt-6 text-ink-muted">
            {format(t(locale, "works_count"), { n: filtered.length })}
          </p>
          <div className="mt-12">
            <Suspense>
              <PlatformFilter />
            </Suspense>
          </div>
        </div>
      </header>
      <WorkGallery projects={filtered} locale={locale} />
    </div>
  );
}