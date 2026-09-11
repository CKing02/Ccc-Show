"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";
import { setLocaleCookie } from "@/app/actions/locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "zh",
  setLocale: () => {},
});

interface I18nProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

/**
 * 客户端 locale 状态 + cookie 同步。
 * - initialLocale 由 RootLayout 从 cookie 读出后传入，避免水合不一致
 * - 切换语言：写 cookie（server action）+ router.refresh() 触发整页服务端重渲染
 * - 仍写入 localStorage 作为兜底，方便用户在隐私模式下保留偏好
 */
export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  // 同步 html lang + localStorage 兜底
  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // 忽略
    }
  }, [locale]);

  const setLocale = useCallback(
    async (next: Locale) => {
      if (next === locale) return;
      setLocaleState(next);
      try {
        await setLocaleCookie(next);
        router.refresh();
      } catch {
        // 失败时至少客户端状态已更新，不阻塞 UI
      }
    },
    [locale, router],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>{children}</I18nContext.Provider>
  );
}

export function useLocale() {
  return useContext(I18nContext);
}