import Image from "next/image";
import type { Locale, ProjectMeta } from "@/lib/types";
import { pickLocalized } from "@/lib/i18n";

interface WorkDetailHeroProps {
  project: ProjectMeta;
  locale: Locale;
}

/**
 * 详情页封面：全宽 16:9，Ken Burns 缓慢放大 24 秒。
 */
export function WorkDetailHero({ project, locale }: WorkDetailHeroProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-paper">
      <Image
        src={project.cover}
        alt={pickLocalized(locale, project.title)}
        fill
        priority
        sizes="100vw"
        className="ken-burns object-cover"
      />
    </div>
  );
}