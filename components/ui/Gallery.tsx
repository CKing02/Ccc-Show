"use client";

import { useState } from "react";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  images: string[];
  altPrefix: string;
}

type Orientation = "horizontal" | "vertical";

function GalleryItem({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      setOrientation(
        img.naturalWidth >= img.naturalHeight ? "horizontal" : "vertical",
      );
    }
  };

  if (failed) {
    return (
      <div
        className="flex aspect-[3/2] w-full items-center justify-center bg-bg-paper text-sm uppercase tracking-[0.2em] text-ink-faint"
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-bg-paper">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        onLoad={handleLoad}
        onClick={onClick}
        className={
          orientation === "vertical"
            ? "max-h-[800px] lg:max-h-[960px] w-auto max-w-full cursor-zoom-in"
            : "max-w-full h-auto cursor-zoom-in"
        }
      />
    </div>
  );
}

/**
 * 项目内图片走廊：每张图按自然方向自动选择渲染策略。
 * - 横屏：原图等比缩放到容器宽度，高度自适应（max-w-full + h-auto），不裁切不限高
 * - 竖屏：限高 800px + 自适应宽度（max-h + w-auto），不裁切
 *
 * 点击图片打开 Lightbox，支持滚轮缩放（围绕光标）+ 拖拽平移。
 */
export function Gallery({ images, altPrefix }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="space-y-12">
        {images.map((src, i) => (
          <GalleryItem
            key={src}
            src={src}
            alt={`${altPrefix} - ${i + 1}`}
            onClick={() => setOpenIndex(i)}
          />
        ))}
      </div>
      {openIndex !== null && (
        <Lightbox
          key={openIndex}
          images={images}
          currentIndex={openIndex}
          onIndexChange={setOpenIndex}
          altPrefix={altPrefix}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
