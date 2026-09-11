"use server";

import { cookies } from "next/headers";
import type { Locale } from "@/lib/types";

/**
 * 写入用户语言偏好到 cookie。
 * 由 I18nProvider 在切换语言时调用，触发整页重新渲染。
 */
export async function setLocaleCookie(locale: Locale): Promise<void> {
  (await cookies()).set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}