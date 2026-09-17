import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-faint">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 text-xs uppercase tracking-[0.2em] text-ink-muted md:flex-row md:items-center md:px-12 lg:py-10">
        <span>© {year} {locale === "en" ? "Portfolio" : "展示台"}</span>
        <span>{t(locale, "built_with")}</span>
      </div>
    </footer>
  );
}