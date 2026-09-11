// Markdown 渲染管线：gray-matter + remark + rehype

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * 渲染 Markdown 为 HTML。
 * 支持 GFM（表格、删除线、任务列表、自动链接）、标题 slug、标题锚链接。
 * 代码高亮由 .prose pre 样式提供（极简黑色背景），不引入 shiki 以保持构建轻量。
 */
export async function renderMarkdown(source: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "Link to section",
      },
      content: {
        type: "text",
        value: "§",
      },
    })
    .use(rehypeStringify)
    .process(source);

  return String(result);
}
