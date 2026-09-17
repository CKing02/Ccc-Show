import { Label } from "@/components/ui/Label";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/i18n";

export default async function WorksLoading() {
  const locale = await getLocale();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-40">
      <Label>{t(locale, "loading")}</Label>
    </div>
  );
}