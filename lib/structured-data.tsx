// JSON-LD 结构化数据生成器。
// 输出 schema.org 类型，供页面以 <script type="application/ld+json"> 注入。
// 验证：https://search.google.com/test/rich-results

import type { Locale, ProjectMeta } from "./types";
import { pickLocalized } from "./i18n";
import { site } from "./site";
import { about } from "./about";

const jobTitle = {
  zh: "产品经理 · AI 方向",
  en: "Product Manager · AI",
} as const;

const knowsAbout = [
  "Claude Code",
  "Prompt Engineering",
  "RAG",
  "LLM Application Design",
  "Agent Design",
  "AI Product Evaluation",
  "PRD",
  "User Research",
  "UML",
  "Prototyping",
];

/**
 * 在服务端组件里渲染 JSON-LD。
 * Next.js 15 推荐用 dangerouslySetInnerHTML 注入，因为浏览器不会解析 script 里的 JSX。
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * 站点级：WebSite（含 Sitelinks Search Box）+ Person。
 * 挂在 Root Layout，所有页面继承。
 */
export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl("/")}#website`,
        url: siteUrl("/"),
        name: site.name,
        description: pickLocalized(locale, site.tagline),
        inLanguage: ["zh-CN", "en"],
        publisher: { "@id": `${siteUrl("/")}#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl("/")}#person`,
        name: site.name,
        url: siteUrl("/"),
        email: `mailto:${site.email}`,
        jobTitle: pickLocalized(locale, jobTitle),
        sameAs: [
          site.social.github,
          site.social.twitter,
          site.social.wechat,
        ].filter((x): x is string => Boolean(x)),
      },
    ],
  };
}

/**
 * 关于页：Person 的扩展描述。
 */
export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl("/")}#person`,
    name: site.name,
    url: siteUrl("/"),
    email: `mailto:${site.email}`,
    jobTitle: pickLocalized(locale, jobTitle),
    description: pickLocalized(locale, about.subtitle),
    knowsAbout,
    sameAs: [
      site.social.github,
      site.social.twitter,
      site.social.wechat,
    ].filter((x): x is string => Boolean(x)),
  };
}

/**
 * 项目详情页：项目作为 SoftwareSourceCode + CreativeWork。
 * 选 SoftwareSourceCode 是因为这是软件作品，比通用 CreativeWork 更精确。
 */
export function creativeWorkJsonLd(project: ProjectMeta, locale: Locale) {
  const title = pickLocalized(locale, project.title);
  const description = pickLocalized(locale, project.summary);
  const projectUrl = siteUrl(`/works/${project.slug}`);
  const coverUrl = siteUrl(project.cover);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${projectUrl}#work`,
    name: title,
    description,
    url: projectUrl,
    image: coverUrl,
    dateCreated: project.date,
    author: { "@id": `${siteUrl("/")}#person` },
    publisher: { "@id": `${siteUrl("/")}#person` },
    programmingLanguage: project.tech,
    applicationCategory: project.platform.includes("web")
      ? "WebApplication"
      : project.platform.includes("android")
        ? "MobileApplication"
        : "DesktopApplication",
    operatingSystem: project.platform.map((p) =>
      p === "android" ? "Android" : p === "web" ? "Web" : "Desktop",
    ),
    inLanguage: ["zh-CN", "en"],
    isAccessibleForFree: true,
  };
}

/**
 * 详情页面包屑：首页 → 作品 → 当前项目。
 */
export function breadcrumbJsonLd(
  project: ProjectMeta,
  locale: Locale,
): {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
} {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "首页",
        item: siteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "en" ? "Works" : "作品",
        item: siteUrl("/works"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pickLocalized(locale, project.title),
        item: siteUrl(`/works/${project.slug}`),
      },
    ],
  };
}

// 内部：拼绝对 URL
function siteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}