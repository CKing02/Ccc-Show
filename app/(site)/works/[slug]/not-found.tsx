import Link from "next/link";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/i18n";

export default async function ProjectNotFound() {
  const locale = await getLocale();

  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
        {t(locale, "not_found_label")}
      </p>
      <h1 className="mt-4 text-6xl">{t(locale, "not_found")}</h1>
      <Link
        href="/works"
        className="mt-8 inline-block border-b border-ink pb-1 text-sm uppercase tracking-[0.2em]"
      >
        {t(locale, "works_title")}
      </Link>
    </main>
  );
}