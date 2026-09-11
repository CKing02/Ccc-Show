// 服务端专用：从 cookie 读 locale。
// 只能在 Server Component / Server Action 里调用。

import { cookies } from "next/headers";
import type { Locale } from "./types";

export const LOCALE_COOKIE = "locale";

/**
 * Server Component：从 cookie 读 locale。
 * 未设置或非法值时回落到 'zh'。
 */
export async function getLocale(): Promise<Locale> {
  const c = (await cookies()).get(LOCALE_COOKIE);
  return c?.value === "en" ? "en" : "zh";
}