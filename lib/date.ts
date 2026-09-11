// 日期格式化

/**
 * "2026-08-15" → "2026 年 8 月" 或 "Aug 2026"
 */
export function formatDate(locale: "zh" | "en", dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  if (locale === "zh") {
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月`;
  }
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

/**
 * 仅年份。
 */
export function formatYear(dateStr: string): string {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? dateStr : String(d.getFullYear());
}
