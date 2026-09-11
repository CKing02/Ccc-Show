// 项目内容读取：从 content/projects/*.md 解析 frontmatter + 渲染正文

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectMeta } from "./types";
import { renderMarkdown } from "./markdown";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * 读取单个项目：解析 frontmatter、渲染 Markdown 正文为 HTML。
 */
export async function getProjectBySlug(slug: string): Promise<Project> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);

  if (data.slug && data.slug !== slug) {
    console.warn(
      `[content] slug mismatch: file "${slug}.md" declares slug="${data.slug}"`,
    );
  }

  const html = await renderMarkdown(content);
  return {
    ...(data as ProjectMeta),
    slug,
    content,
    html,
  };
}

/**
 * 列出所有项目（按日期倒序，只取 frontmatter，不渲染正文）。
 */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const slugs = files
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""));

  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return { ...(data as ProjectMeta), slug };
    }),
  );

  // 按日期倒序
  projects.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return projects;
}

/**
 * 精选项目（首页用）。
 */
export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured);
}

/**
 * 相邻项目（详情页上下篇导航）。
 */
export async function getAdjacentProjects(slug: string): Promise<{
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
}> {
  const all = await getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}

/**
 * 所有 slug（用于 generateStaticParams）。
 */
export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  return files
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""));
}
