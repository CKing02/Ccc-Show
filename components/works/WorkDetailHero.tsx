"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale, ProjectMeta } from "@/lib/types";
import { pickLocalized } from "@/lib/i18n";

interface WorkDetailHeroProps {
  project: ProjectMeta;
  locale: Locale;
}

/**
 * 详情页封面：自适应图片方向。
 * - 横向图（cover）：固定 16:9 容器，主体居中裁切，配 Ken Burns 缓动
 * - 竖向手机截图（contain）：限高不裁切，完整可见
 *
 * 加载失败时显示纯色占位 + 项目名。
 */
export function WorkDetailHero({ project, locale }: WorkDetailHeroProps) {
  const [failed, setFailed] = useState(false);
  const fit = project.coverFit ?? "cover";
  const title = pickLocalized(locale, project.title);

  if (failed) {
    return (
      <div
        className="flex aspect-[16/9] w-full items-center justify-center bg-bg-paper text-sm uppercase tracking-[0.2em] text-ink-faint"
        role="img"
        aria-label={title}
      >
        {title}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-bg-paper">
      {fit === "contain" ? (
        <div className="flex justify-center">
          <Image
            src={project.cover}
            alt={title}
            width={1200}
            height={2800}
            sizes="100vw"
            priority
            onError={() => setFailed(true)}
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full max-h-[80vh]">
          <Image
            src={project.cover}
            alt={title}
            fill
            priority
            sizes="100vw"
            onError={() => setFailed(true)}
            className="ken-burns object-cover"
          />
        </div>
      )}
    </div>
  );
}
