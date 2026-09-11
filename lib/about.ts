// About 页内容数据。集中维护，便于编辑。
// 所有面向用户的中英文字符串在这里维护；UI 框架文案走 i18n 字典。

import type { Localized } from "./types";

export const about = {
  kicker: {
    zh: "ABOUT · 独立开发者",
    en: "ABOUT · Independent developer",
  } satisfies Localized<string>,

  subtitle: {
    zh: "为日常工具注入克制的美感与深思熟虑的交互。",
    en: "Bringing restrained aesthetics and considered interaction to everyday tools.",
  } satisfies Localized<string>,

  bio: {
    zh: [
      "2018 年开始写代码。最早做 Android，后来转向前端，再后来两者都做。",
      "我相信好的软件应该像一件展品——值得驻足，值得再看一遍。这份作品集里展示的，是我过去几年里认真打磨过的一些项目，每一个都从空白文档开始，到可发布状态独立完成。",
      "工作之外，我在读设计史、听唱片、用钢笔抄诗。",
    ],
    en: [
      "Started writing code in 2018. Began with Android, then moved to the web, and now do both.",
      "I believe good software should be like an exhibit — worth pausing for, worth a second look. Everything in this portfolio is something I designed and shipped independently, end to end.",
      "Outside of work, I read design history, listen to records, and copy poems by hand with a fountain pen.",
    ],
  } satisfies Localized<string[]>,

  skills: [
    {
      category: { zh: "编程", en: "Code" },
      items: ["TypeScript", "React", "Next.js", "Kotlin", "Jetpack Compose", "Swift", "Python"],
    },
    {
      category: { zh: "设计", en: "Design" },
      items: ["Figma", "Typography", "Color theory", "Motion", "Layout"],
    },
    {
      category: { zh: "工具", en: "Tools" },
      items: ["VS Code", "Git", "pnpm", "Vercel", "Figma", "Linear"],
    },
  ],

  timeline: [
    {
      year: "2024 —",
      title: {
        zh: "独立开发",
        en: "Independent",
      },
      detail: {
        zh: "全职做自己的产品。Nova 阅读器、Ping 笔记处于活跃迭代。",
        en: "Full-time on my own products. Nova Reader and Ping are in active iteration.",
      },
    },
    {
      year: "2021 — 2024",
      title: {
        zh: "前端工程师",
        en: "Frontend Engineer",
      },
      detail: {
        zh: "在某互联网公司负责设计系统与基础设施。",
        en: "Design system and platform team at an internet company.",
      },
    },
    {
      year: "2018 — 2021",
      title: {
        zh: "Android 工程师",
        en: "Android Engineer",
      },
      detail: {
        zh: "在某工具类应用团队，从 0 到 1 写了两个百万日活的产品。",
        en: "Two products from zero to millions of DAU at a utility-app team.",
      },
    },
  ],
} as const;