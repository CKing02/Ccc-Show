"use client";

import { useEffect, useRef, useState } from "react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (i: number) => void;
  altPrefix: string;
  onClose: () => void;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 5;

function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * 全屏图片查看器。
 * - 初始按"fit to viewport"缩放并居中
 * - 滚轮缩放：围绕鼠标所在位置
 * - 拖拽平移（仅在 zoom > 1 时启用，光标 grab/grabbing）
 * - 左右箭头切换上下张（循环，键盘 ←/→ 同效）
 * - 点黑色背景或按 Esc 关闭
 * - 锁定 body 滚动
 *
 * 通过 `key={currentIndex}` 在外部 remount，每次切换图都重置 zoom/pan。
 */
export function Lightbox({
  images,
  currentIndex,
  onIndexChange,
  altPrefix,
  onClose,
}: LightboxProps) {
  const src = images[currentIndex];
  const alt = `${altPrefix} - ${currentIndex + 1}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);
  // 单独追踪本次按下→松开是否移动过；click 触发时读它来判断是"点击"还是"拖拽"
  const movedRef = useRef(false);

  const showArrows = images.length > 1;

  function goPrev() {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }

  function goNext() {
    onIndexChange((currentIndex + 1) % images.length);
  }

  // Esc 关闭，← / → 切换
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (showArrows && e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (showArrows && e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, showArrows]);

  // 锁定 body 滚动
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // 根据图片自然尺寸 + 容器尺寸，计算 fit-to-viewport 初始 zoom 和居中 pan
  function initFromImage(img: HTMLImageElement, cont: HTMLDivElement) {
    if (img.naturalWidth === 0 || img.naturalHeight === 0) return;
    const cw = cont.clientWidth;
    const ch = cont.clientHeight;
    // 取"完全装下"的最小缩放，绝不大于 1（即不超过自然尺寸）
    const fitZoom = Math.min(cw / img.naturalWidth, ch / img.naturalHeight, 1);
    const dw = img.naturalWidth * fitZoom;
    const dh = img.naturalHeight * fitZoom;
    setZoom(fitZoom);
    setPan({ x: (cw - dw) / 2, y: (ch - dh) / 2 });
    setReady(true);
  }

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (containerRef.current) {
      initFromImage(e.currentTarget, containerRef.current);
    }
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // 对数缩放：每次滚轮按固定因子调整 zoom
    const factor = Math.exp(-e.deltaY * 0.0015);
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * factor));
    if (newZoom === zoom) return;

    // 缩放到鼠标位置：保持鼠标下那一点的屏幕坐标不变
    const localX = (cx - pan.x) / zoom;
    const localY = (cy - pan.y) / zoom;
    const newPan = {
      x: cx - localX * newZoom,
      y: cy - localY * newZoom,
    };
    setZoom(newZoom);
    setPan(newPan);
  }

  function handleMouseDown(e: React.MouseEvent) {
    // 仅在图片上按下时开始拖拽（在背景或按钮上按下留给关闭/导航）
    if ((e.target as HTMLElement).tagName !== "IMG") return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    movedRef.current = false;
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    // 位移超过阈值才算拖拽，否则是点击
    if (!movedRef.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      movedRef.current = true;
    }
    setPan({
      x: dragRef.current.panX + dx,
      y: dragRef.current.panY + dy,
    });
  }

  function handleMouseUp() {
    dragRef.current = null;
  }

  function handleClick(e: React.MouseEvent) {
    // 点背景 → 关闭
    if (e.target === e.currentTarget) {
      onClose();
      return;
    }
    // 单击图片（未拖拽）→ 关闭
    if ((e.target as HTMLElement).tagName === "IMG" && !movedRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      className="fixed inset-0 z-50 overflow-hidden bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onLoad={handleImageLoad}
        onDragStart={(e) => e.preventDefault()}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          opacity: ready ? 1 : 0,
          transition: "opacity 150ms ease-out",
          cursor: dragRef.current
            ? "grabbing"
            : zoom > 1
              ? "grab"
              : "default",
          userSelect: "none",
          maxWidth: "none",
          maxHeight: "none",
        }}
      />

      {/* 关闭 */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-60 backdrop-blur transition-[opacity,background-color] duration-200 ease-out hover:bg-white/20 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="关闭"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* 上一张 */}
      {showArrows && (
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-60 backdrop-blur transition-[opacity,background-color] duration-200 ease-out hover:bg-white/20 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="上一张"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* 下一张 */}
      {showArrows && (
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-60 backdrop-blur transition-[opacity,background-color] duration-200 ease-out hover:bg-white/20 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="下一张"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
