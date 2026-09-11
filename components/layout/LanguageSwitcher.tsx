"use client";

import { useLocale } from "@/components/i18n/I18nProvider";
import { Label } from "@/components/ui/Label";

/**
 * 顶部语言切换器：zh / en 互切。
 * 当前 locale 在 zh 时显示 "EN"，提示可切换。
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggle = () => {
    setLocale(locale === "zh" ? "en" : "zh");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60"
    >
      <Label className="text-ink">{locale === "zh" ? "EN" : "中"}</Label>
    </button>
  );
}
