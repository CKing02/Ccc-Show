"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLocale } from "@/components/i18n/I18nProvider";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavItem {
  href: "/works" | "/about";
  key: "nav_works" | "nav_about";
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/works", key: "nav_works" },
  { href: "/about", key: "nav_about" },
] as const;

/**
 * 导航链接 + 语言切换器。Client Component 以响应 locale 变化。
 * 当前路由用 aria-current="page" 标记，键盘 / SR 友好。
 */
export function NavLinks() {
  const { locale } = useLocale();
  const pathname = usePathname();

  return (
    <nav
      className="flex items-center gap-8"
      aria-label={locale === "en" ? "Primary" : "主导航"}
    >
      {NAV_ITEMS.map(({ href, key }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "text-sm transition-opacity hover:opacity-60",
              isActive && "opacity-100 underline underline-offset-[6px] decoration-1",
              !isActive && "opacity-70",
            )}
          >
            {t(locale, key)}
          </Link>
        );
      })}
      <LanguageSwitcher />
    </nav>
  );
}