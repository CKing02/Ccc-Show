"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageFit } from "@/lib/types";

interface WorkCoverProps {
  src: string;
  alt: string;
  priority?: boolean;
  /**
   * 展示策略：
   *   - "cover"   填满容器并裁切（默认，适合横向）
   *   - "contain" 完整显示，限高不裁切（适合手机竖屏截图）
   */
  fit?: ImageFit;
}

/**
 * 项目封面 / 截图。自适应图片方向：
 * - 横向图：填满容器，主体居中
 * - 竖向图：限高不裁切，完整可见
 *
 * 加载失败时显示纯色占位 + 项目名（避免空白）。
 * 父元素需有 group class 才会触发 hover 缓动。
 */
export function WorkCover({ src, alt, priority = false, fit = "cover" }: WorkCoverProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex aspect-[16/10] w-full items-center justify-center bg-bg-paper p-8 text-center text-sm uppercase tracking-[0.2em] text-ink-faint"
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-bg-paper">
      {fit === "contain" ? (
        <div className="flex justify-center">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={2800}
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority={priority}
            onError={() => setFailed(true)}
            className="max-h-[640px] w-auto max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority={priority}
            onError={() => setFailed(true)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
    </div>
  );
}
