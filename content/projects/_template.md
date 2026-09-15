---
# =========================================================================
# 项目模板 · Project Template
# =========================================================================
# 使用方法：
#   1. 复制本文件到 content/projects/<你的-slug>.md（去掉 _template 前缀）
#   2. 把下面所有标记 [TODO: ...] 替换成实际内容
#   3. 在 public/projects/<你的-slug>/ 下放封面图（cover.svg/cover.png...）
#   4. pnpm dev 本地预览 → git push 自动部署
#
# 字段规则：
#   - slug 必须等于文件名（去掉 .md 后缀），否则 URL 会 404
#   - 所有 "zh / en" 双语字段必须同时填，i18n 会按 cookie locale 切换
#   - date 用 ISO 8601（YYYY-MM-DD），影响排序
#   - featured: true 会同时显示在首页；false 只在作品展厅
# =========================================================================

# 项目名 · 必填
title:
  zh: "[TODO: 项目中文名]"
  en: "[TODO: Project English Name]"

# 路由 slug · 必填 · 必须与文件名一致（不含 .md）
# 例如文件名 "my-app.md" → slug: my-app
# 用于：/works/my-app  详情页 URL
slug: [TODO-your-slug]

# 完成日期 · 必填 · ISO 8601 (YYYY-MM-DD)
# 越新越靠前
date: [TODO-YYYY-MM-DD]

# 平台 · 必填 · 从下面三选一或多个
#   android / web / pc
platform:
  - web

# 你在这个项目里的角色 · 必填 · 双语
role:
  zh: "[TODO: 角色描述，如 独立设计与开发]"
  en: "[TODO: Role, e.g. Solo design & development]"

# 状态 · 必填 · 三选一
#   shipped   - 已发布
#   ongoing   - 进行中
#   archived  - 已归档/不再维护
status: shipped

# 是否精选 · 必填
#   true  - 同时显示在首页（建议 true，最多 3-6 个）
#   false - 只在 /works 展厅
featured: true

# 封面图 · 必填 · 相对于 public/ 的绝对路径
# 文件放在 public/projects/<slug>/cover.svg
cover: /projects/[TODO-your-slug]/cover.svg

# 配图（详情页大图）· 可选 · 不填整段删掉
# 文件放在 public/projects/<slug>/01.svg 等
gallery:
  - /projects/[TODO-your-slug]/01.svg
  - /projects/[TODO-your-slug]/02.svg

# 一句话简介 · 必填 · 双语
summary:
  zh: "[TODO: 中文一句话简介，控制在 30 字以内]"
  en: "[TODO: One-line English summary, under 80 chars]"

# 技术栈 · 必填 · 字符串数组，每项一个技术名
tech:
  - "[TODO: 技术 1]"
  - "[TODO: 技术 2]"
  - "[TODO: 技术 3]"

# 下载/使用入口 · 可选 · 不填整段删掉
# platform 必须从 android / web / pc 三选一
downloads:
  - label:
      zh: "[TODO: 中文按钮文字]"
      en: "[TODO: English button label]"
    platform: web
    url: "[TODO: https://...]"

# 外部链接 · 可选 · 不填整段删掉
# type 必须从下面三选一：
#   github  - GitHub 仓库
#   demo    - 在线 Demo
#   website - 官网/作品页
links:
  - type: github
    url: "[TODO: https://github.com/...]"
---

# 正文 · Markdown · 支持 GFM

## 设计动机

[TODO: 写 1-2 段讲为什么做这个项目。可以用 **加粗**、*斜体*、列表、引用 >]

## 核心特性

### 特性 1

[TODO: 描述一个核心功能]

### 特性 2

[TODO: 描述另一个核心功能]

> 好的工具应该让你忘记工具的存在。

## 技术架构

\`\`\`ts
// 这里放代码示例，会被 Shiki 高亮
function example() {
  return "hello world";
}
\`\`\`

- **技术 A** — 一句话说明
- **技术 B** — 一句话说明

## 数据 / 效果

| 指标 | 数值 |
| --- | --- |
| [TODO: 指标 1] | [TODO: 数值] |
| [TODO: 指标 2] | [TODO: 数值] |
