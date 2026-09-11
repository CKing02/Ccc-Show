import clsx from "clsx";
import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/**
 * Markdown 正文容器。配套 app/globals.css 中的 .prose 样式。
 */
export function Prose({ children, className }: ProseProps) {
  return <div className={clsx("prose", className)}>{children}</div>;
}
