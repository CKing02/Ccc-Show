import type { Locale, ProjectMeta } from "@/lib/types";
import { WorkEntry } from "./WorkEntry";
import { SectionRule } from "@/components/layout/SectionRule";

interface WorkGalleryProps {
  projects: ProjectMeta[];
  locale: Locale;
}

const pad = (n: number) => n.toString().padStart(2, "0");

/**
 * 展厅：每个项目独占一行，左右交错排列。
 * 项目之间用 SectionRule 分隔（极细线 + "Section NN" 序号）。
 */
export function WorkGallery({ projects, locale }: WorkGalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center text-ink-muted md:px-12">
        {locale === "en" ? "No works in this category yet." : "该分类下暂无作品"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      {projects.map((p, i) => (
        <div key={p.slug}>
          <SectionRule
            index={i + 1}
            total={projects.length}
            label={`Section ${pad(i + 1)}`}
          />
          <WorkEntry project={p} reversed={i % 2 === 1} locale={locale} />
        </div>
      ))}
      <div className="h-16" />
    </div>
  );
}