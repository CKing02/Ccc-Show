"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Route } from "next";
import clsx from "clsx";
import { useLocale } from "@/components/i18n/I18nProvider";
import { t } from "@/lib/i18n";
import type { Platform } from "@/lib/types";

const allPlatforms: Platform[] = ["android", "web", "pc"];

const labelKeys: Record<Platform | "all", keyof typeof import("@/i18n/zh").default> = {
  all: "works_filter_all",
  android: "works_filter_android",
  web: "works_filter_web",
  pc: "works_filter_pc",
};

/**
 * 平台筛选 Tab（URL-based）。
 * 当前筛选写入 ?platform=xxx，分享链接 / SEO 友好。
 * 标签文案跟随 I18nProvider 中的 locale。
 */
export function PlatformFilter() {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("platform") as Platform | null;

  const setFilter = (platform: Platform | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (platform === null) {
      params.delete("platform");
    } else {
      params.set("platform", platform);
    }
    const query = params.toString();
    // pathname 是 typedRoutes 已知的 Route，附加 query 后类型仍是 Route
    const url = (query ? `${pathname}?${query}` : pathname) as Route;
    router.push(url, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={locale === "en" ? "Filter by platform" : "按平台筛选"}
      className="flex flex-wrap items-center gap-3"
    >
      {(["all", ...allPlatforms] as const).map((p) => {
        const isActive = p === "all" ? current === null : current === p;
        return (
          <button
            key={p}
            onClick={() => setFilter(p === "all" ? null : p)}
            aria-pressed={isActive}
            className={clsx(
              "cursor-pointer border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors",
              isActive
                ? "border-ink bg-ink text-bg"
                : "border-ink-faint text-ink-muted hover:border-ink hover:text-ink",
            )}
          >
            {t(locale, labelKeys[p])}
          </button>
        );
      })}
    </div>
  );
}