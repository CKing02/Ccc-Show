// i18n 工具：纯函数，服务端 / 客户端均可使用。
// 不要在这里 import "next/headers"，否则会被客户端组件打包时炸掉。

import type { Locale, Localized } from "./types";
import zh from "@/i18n/zh";
import en from "@/i18n/en";

const dict = { zh, en } as const;

export type DictKey = keyof typeof zh;

/**
 * 查 UI 文案字典。
 */
export function t(locale: Locale, key: DictKey): string {
  return dict[locale][key] ?? zh[key] ?? key;
}

/**
 * 从 {zh, en} 对象中按 locale 取值。
 */
export function pickLocalized<T>(locale: Locale, v: Localized<T>): T {
  return v[locale] ?? v.zh;
}

/**
 * 简易字符串模板替换："{n} 件" → "3 件"
 */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}