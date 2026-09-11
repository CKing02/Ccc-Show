import Link from "next/link";
import type { Locale, ProjectMeta } from "@/lib/types";
import { WorkCover } from "./WorkCover";
import { WorkMeta } from "./WorkMeta";

interface WorkEntryProps {
  project: ProjectMeta;
  reversed: boolean; // 偶数项图右文左
  locale: Locale;
}

/**
 * 展厅单项目块：封面 + 展签区，奇偶交错排布。
 */
export function WorkEntry({ project, reversed, locale }: WorkEntryProps) {
  return (
    <article className="group grid grid-cols-1 gap-8 py-12 lg:grid-cols-12 lg:gap-x-12 lg:py-20">
      <Link
        href={`/works/${project.slug}`}
        className={`block lg:col-span-7 ${
          reversed ? "lg:col-start-6 lg:order-2" : "lg:col-start-1 lg:order-1"
        }`}
      >
        <WorkCover src={project.cover} alt={project.title[locale]} />
      </Link>
      <div
        className={`self-center lg:col-span-4 ${
          reversed
            ? "lg:col-start-1 lg:order-1"
            : "lg:col-start-9 lg:order-2"
        }`}
      >
        <WorkMeta project={project} locale={locale} />
      </div>
    </article>
  );
}