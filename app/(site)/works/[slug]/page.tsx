import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  getAllSlugs,
  getAdjacentProjects,
} from "@/lib/content";
import { WorkDetailHero } from "@/components/works/WorkDetailHero";
import { ProjectNav } from "@/components/works/ProjectNav";
import { Gallery } from "@/components/ui/Gallery";
import { DownloadList } from "@/components/ui/DownloadList";
import { CommentPlaceholder } from "@/components/ui/CommentPlaceholder";
import { Label } from "@/components/ui/Label";
import { Prose } from "@/components/ui/Prose";
import { formatYear } from "@/lib/date";
import { getLocale } from "@/lib/i18n-server";
import { pickLocalized, t } from "@/lib/i18n";
import {
  JsonLd,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
} from "@/lib/structured-data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const statusKeys = {
  shipped: "project_status_shipped",
  ongoing: "project_status_ongoing",
  archived: "project_status_archived",
} as const;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);
    const locale = await getLocale();
    return {
      title: `${pickLocalized(locale, project.title)} · ${pickLocalized(locale, project.title)}`,
      description: pickLocalized(locale, project.summary),
      openGraph: {
        title: pickLocalized(locale, project.title),
        description: pickLocalized(locale, project.summary),
        type: "article",
        // opengraph-image.tsx in same segment is auto-detected
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(slug);
  const statusKey = statusKeys[project.status] ?? null;

  return (
    <article>
      <JsonLd data={creativeWorkJsonLd(project, locale)} />
      <JsonLd data={breadcrumbJsonLd(project, locale)} />
      <WorkDetailHero project={project} locale={locale} />

      {/* Header */}
      <header className="border-b border-ink-faint">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
          <div className="flex flex-wrap items-baseline gap-4">
            <Label>
              {project.platform.map((p) => p.toUpperCase()).join(" · ")}
            </Label>
            <Label className="text-ink-faint">{formatYear(project.date)}</Label>
          </div>
          <h1 className="mt-8 font-serif text-4xl leading-tight md:text-6xl lg:text-7xl xl:text-8xl">
            {pickLocalized(locale, project.title)}
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-ink-muted md:text-2xl">
            {pickLocalized(locale, project.summary)}
          </p>
        </div>
      </header>

      {/* Meta grid */}
      <section className="border-b border-ink-faint">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:px-10 lg:px-12">
          <div>
            <Label>{t(locale, "project_role")}</Label>
            <p className="mt-2 font-serif">{pickLocalized(locale, project.role)}</p>
          </div>
          <div>
            <Label>{t(locale, "project_status")}</Label>
            <p className="mt-2 font-serif">
              {statusKey ? t(locale, statusKey) : project.status}
            </p>
          </div>
          <div className="col-span-2">
            <Label>{t(locale, "project_tech")}</Label>
            <p className="mt-2 font-serif">{project.tech.join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
          <Prose>
            <div dangerouslySetInnerHTML={{ __html: project.html }} />
          </Prose>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="border-t border-ink-faint">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
            <Label>{t(locale, "project_gallery")}</Label>
            <div className="mt-12">
              <Gallery
                images={project.gallery}
                altPrefix={pickLocalized(locale, project.title)}
              />
            </div>
          </div>
        </section>
      )}

      {/* Downloads */}
      {project.downloads && project.downloads.length > 0 && (
        <section className="border-t border-ink-faint">
          <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
            <DownloadList downloads={project.downloads} locale={locale} />
          </div>
        </section>
      )}

      <CommentPlaceholder locale={locale} />

      <ProjectNav prev={prev} next={next} locale={locale} />
    </article>
  );
}