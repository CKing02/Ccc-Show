"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { formatYear } from "@/lib/date";
import { pickLocalized } from "@/lib/i18n";
import type { Locale, ProjectMeta } from "@/lib/types";

interface FeaturedWorkCardProps {
  project: ProjectMeta;
  locale: Locale;
  delay: number;
}

/**
 * 首页精选项目卡片：自适应图片方向 + 加载失败 fallback
 */
export function FeaturedWorkCard({ project, locale, delay }: FeaturedWorkCardProps) {
  const [failed, setFailed] = useState(false);
  const fit = project.coverFit ?? "cover";
  const title = pickLocalized(locale, project.title);

  return (
    <Reveal delay={delay}>
      <Link href={`/works/${project.slug}`} className="group block">
        <div className="relative overflow-hidden bg-bg-paper">
          {failed ? (
            <div
              className="flex aspect-[16/10] w-full items-center justify-center p-8 text-center text-sm uppercase tracking-[0.2em] text-ink-faint"
              role="img"
              aria-label={title}
            >
              {title}
            </div>
          ) : fit === "contain" ? (
            <div className="flex justify-center">
              <Image
                src={project.cover}
                alt={title}
                width={1200}
                height={2800}
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
                onError={() => setFailed(true)}
                className="max-h-[560px] md:max-h-[600px] lg:max-h-[720px] xl:max-h-[840px] w-auto max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          ) : (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.cover}
                alt={title}
                fill
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
                onError={() => setFailed(true)}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl">{title}</h3>
          <Label className="shrink-0">{formatYear(project.date)}</Label>
        </div>
        <p className="mt-2 text-ink-muted">{pickLocalized(locale, project.summary)}</p>
        <div className="mt-4 flex gap-3">
          {project.platform.map((pl) => (
            <Label key={pl} className="text-ink-faint">
              {pl.toUpperCase()}
            </Label>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}
