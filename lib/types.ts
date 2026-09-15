// 共享类型定义

export type Locale = "zh" | "en";

export type Localized<T> = { zh: T; en: T };

export type Platform = "android" | "web" | "pc";

export type ProjectStatus = "shipped" | "ongoing" | "archived";

export interface Download {
  label: Localized<string>;
  platform: Platform;
  url: string;
}

export type LinkType = "github" | "demo" | "website";

export interface Link {
  type: LinkType;
  url: string;
}

/**
 * 封面/配图展示策略：
 *   - "cover"    填满容器并裁切（默认，适合横向设计稿/桌面截图）
 *   - "contain"  完整显示图片，限高不裁切（适合手机竖屏截图，0.45 比例）
 */
export type ImageFit = "cover" | "contain";

export interface ProjectMeta {
  title: Localized<string>;
  slug: string;
  date: string; // ISO 8601
  platform: Platform[];
  role: Localized<string>;
  status: ProjectStatus;
  featured: boolean;
  cover: string;
  /** 封面图展示策略，默认 "cover" */
  coverFit?: ImageFit;
  gallery: string[];
  summary: Localized<string>;
  tech: string[];
  downloads?: Download[];
  links?: Link[];
}

export interface Project extends ProjectMeta {
  content: string; // 原始 markdown
  html: string; // 渲染后的 HTML
}

export interface SiteMeta {
  name: string;
  tagline: Localized<string>;
  email: string;
  social: {
    github?: string;
    wechat?: string;
    twitter?: string;
  };
}
