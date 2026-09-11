import clsx from "clsx";
import type { ReactNode } from "react";

type LabelTag = "span" | "div" | "p" | "h2" | "h3" | "h4";

interface LabelProps {
  children: ReactNode;
  className?: string;
  as?: LabelTag;
}

/**
 * 展签样式：全大写 + 字间距 0.2em + 极小字号。
 * 用于平台、年份、序号、Section 等元数据展示。
 */
export function Label({ children, className, as: Tag = "span" }: LabelProps) {
  return (
    <Tag
      className={clsx(
        "text-xs uppercase tracking-[0.2em] text-ink-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
