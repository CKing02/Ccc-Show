// 站点元数据（集中管理，方便全局修改）

import type { SiteMeta } from "./types";

export const site: SiteMeta = {
  name: "展示台",
  tagline: {
    zh: "作品 · 思想 · 制作过程",
    en: "Works · Thoughts · Process",
  },
  email: "a2794343661@163.com",
  social: {
    github: "https://github.com/yourname",
  },
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
