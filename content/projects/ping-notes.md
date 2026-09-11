---
title:
  zh: "Ping 笔记"
  en: "Ping Notes"
slug: ping-notes
date: 2026-06-02
platform:
  - web
  - pc
role:
  zh: "独立设计与开发"
  en: "Solo design & development"
status: ongoing
featured: true
cover: /projects/ping-notes/cover.svg
gallery:
  - /projects/ping-notes/01.svg
  - /projects/ping-notes/02.svg
summary:
  zh: "一款为写作者打造的 Markdown 笔记应用，刻意只保留编辑器、文件夹、全文搜索三件事。"
  en: "A Markdown note app for writers — deliberately limited to editor, folders, and full-text search."
tech:
  - TypeScript
  - React
  - Tauri
  - SQLite
  - FTS5
downloads:
  - label:
      zh: "下载桌面端"
      en: "Download Desktop"
    platform: pc
    url: "https://github.com/yourname/ping-notes/releases/latest/download/ping-notes.dmg"
  - label:
      zh: "在线使用"
      en: "Use Online"
    platform: web
    url: "https://ping.example.com"
links:
  - type: github
    url: "https://github.com/yourname/ping-notes"
  - type: website
    url: "https://ping.example.com"
---

## 设计动机

大多数笔记软件都在做"集合更多功能"。Ping 的方向相反——**做减法**。

一个写作者真正需要的，只有三件事：

1. 一个不会打扰人的编辑器
2. 一个能装下所有笔记的文件夹
3. 一个能找到以前写过的东西的搜索

剩下的都不要。

## 核心特性

### 编辑器

支持标准 Markdown，实时预览，所见即所得。

```markdown
# 标题
- 列表项
- [x] 已完成
```

### 本地优先

所有笔记存本地 SQLite，离线可用。同步（如果有）走 Git 仓库，永远不需要第三方服务器。

### 全文搜索

底层用 SQLite 的 **FTS5** 虚拟表，每篇笔记建索引。中英文混合分词，结果按相关性排序。

```sql
CREATE VIRTUAL TABLE notes_fts USING fts5(
  content,
  content='notes',
  content_rowid='id'
);
```

### 快捷键

| 操作 | 快捷键 |
| --- | --- |
| 新建笔记 | `Cmd + N` |
| 搜索 | `Cmd + K` |
| 切换文件夹 | `Cmd + 1-9` |
| 删除 | `Cmd + Backspace` |

## 技术架构

- **Tauri** — Rust 后端 + Web 前端，单文件 < 5MB
- **React** + **TypeScript** — 编辑器与 UI
- **SQLite + FTS5** — 全文搜索
- **CodeMirror 6** — 代码块语法高亮
- **Git 同步**（可选）— 笔记即仓库

## 设计取舍

- **没有富文本** — Markdown 已经够，WYSIWYG 是噪音
- **没有标签** — 文件夹 + 搜索覆盖了所有场景
- **没有协作** — 个人笔记不需要"@某人"
- **没有 AI 助手** — 写作者需要的是安静

> 工具应该隐身。想法才应该被看见。