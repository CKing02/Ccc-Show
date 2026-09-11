import { Label } from "@/components/ui/Label";
import type { Download, Locale } from "@/lib/types";
import { pickLocalized } from "@/lib/i18n";

interface DownloadListProps {
  downloads: Download[];
  locale?: Locale;
}

const platformLabels: Record<string, { zh: string; en: string }> = {
  android: { zh: "Android", en: "Android" },
  web: { zh: "Web", en: "Web" },
  pc: { zh: "桌面端", en: "Desktop" },
};

/**
 * 下载按钮列表：每个平台一个按钮，新窗口打开 GitHub Releases。
 */
export function DownloadList({ downloads, locale = "zh" }: DownloadListProps) {
  if (downloads.length === 0) return null;

  return (
    <div>
      <Label>下载 · Download</Label>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {downloads.map((d, i) => {
          const labels = platformLabels[d.platform] ?? {
            zh: d.platform,
            en: d.platform,
          };
          return (
            <a
              key={i}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-ink bg-bg px-6 py-5 transition-colors hover:bg-ink hover:text-bg"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-ink-muted group-hover:text-bg/60">
                  {labels[locale]}
                </span>
                <div className="mt-1 font-serif text-lg">
                  {pickLocalized(locale, d.label)}
                </div>
              </div>
              <span className="text-2xl transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
