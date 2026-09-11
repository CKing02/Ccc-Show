import { Label } from "@/components/ui/Label";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/i18n";

export default async function WorksLoading() {
  const locale = await getLocale();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <Label>{t(locale, "loading")}</Label>
    </div>
  );
}