"use client";

import { useLocale } from "@/components/i18n/I18nProvider";
import { t } from "@/lib/i18n";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLocale();

  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
        {t(locale, "error_label")}
      </p>
      <h1 className="mt-4 text-4xl">{t(locale, "error_title")}</h1>
      <p className="mt-6 text-ink-muted">{error.message}</p>
      <button
        onClick={reset}
        className="mt-8 border-b border-ink pb-1 text-sm uppercase tracking-[0.2em]"
      >
        {t(locale, "retry")}
      </button>
    </main>
  );
}