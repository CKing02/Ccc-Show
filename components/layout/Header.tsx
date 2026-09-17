import Link from "next/link";
import { NavLinks } from "./NavLinks";
import type { Locale } from "@/lib/types";

interface HeaderProps {
  locale: Locale;
}

/**
 * 站头：Logo + 导航。Server Component。
 * 双语模式下品牌名/拉丁名对调。
 */
export function Header({ locale }: HeaderProps) {
  const primary = locale === "en" ? "Portfolio" : "展示台";
  const secondary = locale === "en" ? "展示台" : "Portfolio";

  return (
    <header className="border-b border-ink-faint">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 lg:px-16 lg:py-7">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl tracking-tight">{primary}</span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-ink-muted md:inline">
            {secondary}
          </span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}