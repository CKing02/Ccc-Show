import Link from "next/link";
import type { Locale, ProjectMeta } from "@/lib/types";
import { Label } from "@/components/ui/Label";
import { formatYear } from "@/lib/date";
import { pickLocalized, t } from "@/lib/i18n";

interface WorkMetaProps {
  project: ProjectMeta;
  locale: Locale;
}

/**
 * 展签区：平台 · 年份 · 标题 · 摘要 · 技术栈 · 查看链接
 */
export function WorkMeta({ project, locale }: WorkMetaProps) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3">
        <Label>
          {project.platform.map((p) => p.toUpperCase()).join(" · ")}
        </Label>
        <Label className="text-ink-faint">{formatYear(project.date)}</Label>
      </div>

      <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
        {pickLocalized(locale, project.title)}
      </h2>

      <p className="mt-4 text-ink-muted">{pickLocalized(locale, project.summary)}</p>

      {project.tech.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted">
          {project.tech.slice(0, 5).map((tk, i) => (
            <span key={tk}>
              {tk}
              {i < Math.min(project.tech.length, 5) - 1 && " ·"}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/works/${project.slug}`}
        className="mt-8 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
      >
        {t(locale, "works_view")} →
      </Link>
    </div>
  );
}