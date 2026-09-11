import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/i18n";

export default async function Loading() {
  const locale = await getLocale();

  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
        {t(locale, "loading")}
      </p>
    </main>
  );
}