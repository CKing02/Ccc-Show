// RSS 2.0 订阅源。
// 按日期倒序列出全部项目，含原文 markdown 渲染后的 HTML（便于 RSS 阅读器显示）。
//
// 验证：https://validator.w3.org/feed/

import { getAllProjects, getProjectBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const revalidate = 3600; // 1 小时重新生成

const FEED_TITLE = "展示台 · Portfolio";
const FEED_DESCRIPTION =
  "个人作品集 / Portfolio — 作品更新与制作过程。Works, thoughts, and process.";

function baseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function GET() {
  const projects = await getAllProjects();
  const base = baseUrl();
  const buildDate = new Date().toUTCString();

  // 渲染每个项目的 markdown 为 HTML 作为 <content:encoded>
  const items = await Promise.all(
    projects.map(async (p) => {
      const full = await getProjectBySlug(p.slug);
      const projectUrl = `${base}/works/${p.slug}`;
      const pubDate = new Date(p.date).toUTCString();
      return {
        title: `${p.title.zh} · ${p.title.en}`,
        link: projectUrl,
        guid: projectUrl,
        pubDate,
        description: `${p.summary.zh} — ${p.summary.en}`,
        contentEncoded: full.html,
        tech: p.tech,
        platform: p.platform,
      };
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(FEED_TITLE)}</title>
    <link>${esc(base)}</link>
    <description>${esc(FEED_DESCRIPTION)}</description>
    <language>zh-cn</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${esc(base)}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Next.js Portfolio</generator>
${items.map(item).join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function item(p: {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  contentEncoded: string;
  tech: string[];
  platform: string[];
}): string {
  return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(p.link)}</link>
      <guid isPermaLink="true">${esc(p.guid)}</guid>
      <pubDate>${p.pubDate}</pubDate>
      <description>${esc(p.description)}</description>
      <content:encoded>${esc(p.contentEncoded)}</content:encoded>
${p.platform
        .map(
          (pl) =>
            `      <category domain="platform">${esc(pl.toUpperCase())}</category>`,
        )
        .join("\n")}
${p.tech.map((t) => `      <category domain="tech">${esc(t)}</category>`).join("\n")}
    </item>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}