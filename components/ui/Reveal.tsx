"use client";

import clsx from "clsx";
import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

/**
 * 入场动画：滚动到视口时 fade + 上移 12px。
 * - prefers-reduced-motion 用户直接显示
 * - 一次性触发，进入后 disconnect
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 检查用户偏好
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  // Cast: ref 类型随 Tag 变化
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  return (
    <Tag ref={setRef as never} className={clsx("reveal", className)}>
      {children}
    </Tag>
  );
}
