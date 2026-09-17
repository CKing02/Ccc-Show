import Link from "next/link";
import clsx from "clsx";
import type { Locale, ProjectMeta } from "@/lib/types";
import { Label } from "@/components/ui/Label";
import { pickLocalized, t } from "@/lib/i18n";

interface ProjectNavProps {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
  locale: Locale;
}

/**
 * 详情页底部的上一个 / 下一个项目导航 + 返回展厅。
 * 文案跟随 locale。
 */
export function ProjectNav({ prev, next, locale }: ProjectNavProps) {
  return (
    <nav className="border-t border-ink-faint">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        <NavItem project={prev} direction="prev" locale={locale} />
        <NavItem
          project={next}
          direction="next"
          locale={locale}
          className="md:border-l md:border-ink-faint"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center md:px-12">
        <Link
          href="/works"
          className="inline-block pb-1 text-xs uppercase tracking-[0.2em] text-ink-muted transition-opacity hover:opacity-60"
        >
          {t(locale, "project_back_to_works")} →
        </Link>
      </div>
    </nav>
  );
}

function NavItem({
  project,
  direction,
  locale,
  className,
}: {
  project: ProjectMeta | null;
  direction: "prev" | "next";
  locale: Locale;
  className?: string;
}) {
  if (!project) {
    return <div className={clsx("px-6 py-12 md:px-12 lg:px-16", className)} />;
  }

  const isPrev = direction === "prev";
  const label = isPrev ? t(locale, "project_prev") : t(locale, "project_next");

  return (
    <Link
      href={`/works/${project.slug}`}
      className={clsx(
        "group block px-6 py-12 transition-colors hover:bg-bg-paper md:px-12 lg:px-16",
        className,
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-3",
          isPrev ? "" : "justify-end",
        )}
      >
        {isPrev && <span className="text-xl">←</span>}
        <Label>{label}</Label>
      </div>
      <div
        className={clsx(
          "mt-4 font-serif text-2xl md:text-3xl lg:text-4xl",
          isPrev ? "" : "text-right",
        )}
      >
        {pickLocalized(locale, project.title)}
      </div>
    </Link>
  );
}