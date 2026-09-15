// About 页内容数据。集中维护，便于编辑。
// 所有面向用户的中英文字符串在这里维护；UI 框架文案走 i18n 字典。
//
// 隐私约定：本作品集不显示作者姓名、学校、合作公司。改动请保持匿名。

import type { Localized } from "./types";

export const about = {
  kicker: {
    zh: "ABOUT · 产品经理 · AI 方向",
    en: "ABOUT · Product Manager · AI",
  } satisfies Localized<string>,

  subtitle: {
    zh: "把模糊需求翻译成可上线的产品——近年聚焦 AI 应用的落地与产品化。",
    en: "Translating fuzzy needs into shipped products — recent focus on AI productization.",
  } satisfies Localized<string>,

  skills: [
    {
      category: { zh: "AI 产品", en: "AI Product" },
      items: [
        "Claude Code",
        "Prompt Engineering",
        "RAG",
        "LLM 应用设计",
        "Agent 应用理解",
        "AI 产品评估",
        "Vibe Coding",
        "AI Workflow",
      ],
    },
    {
      category: { zh: "产品", en: "Product" },
      items: [
        "PRD 编写",
        "用户研究",
        "用户访谈",
        "UML 用例分析",
        "产品原型设计",
        "竞品分析",
        "数据分析",
        "产品迭代",
      ],
    },
    {
      category: { zh: "工具", en: "Tools" },
      items: [
        "墨刀",
        "即时设计",
        "Axure",
        "禅道",
        "Visio",
        "剪映",
        "Office",
      ],
    },
  ],

  timeline: [
    {
      year: "2025.11 —",
      title: {
        zh: "产品经理 · AI 方向",
        en: "Product Manager · AI",
      },
      detail: {
        zh: "在一家 AI 公司主导 AI 产品从需求分析、原型设计、PRD 到上线；近期负责内部 RAG 知识助手 v0.1.0 → v0.4.0，覆盖 10+ 核心模块，跨设计/开发/测试/运营协作保障 5+ 版本按时上线。",
        en: "At an AI-focused company: owned AI product end-to-end — from requirements and prototyping to PRD and launch. Recently led the internal RAG knowledge assistant v0.1.0 → v0.4.0 across 10+ modules, coordinating design / dev / QA / ops to ship 5+ releases on schedule.",
      },
    },
    {
      year: "2025.5 — 2025.10",
      title: {
        zh: "软件实施顾问",
        en: "Implementation Consultant",
      },
      detail: {
        zh: "主导 1 个中小型 SaaS 项目从需求对接到成功上线；作为核心成员参与 1 个大型项目关键模块的实施。深入客户业务，将模糊需求转化为清晰的产品功能清单和业务流程图。",
        en: "Owned one mid-size SaaS project from requirements to launch; core contributor on a larger platform. Translated fuzzy client needs into clear product specs and business flow diagrams.",
      },
    },
    {
      year: "2022.7 — 2022.10",
      title: {
        zh: "产品交互设计",
        en: "Product & Interaction Design",
      },
      detail: {
        zh: "在校园工作室主导 3 个项目的用户调研：问卷、20+ 深度访谈、行为数据分析，提炼用户核心痛点并输出用户画像报告；用墨刀、即时设计完成 4 个项目的低保真-高保真原型。",
        en: "At a campus studio: led user research across 3 projects — surveys, 20+ in-depth interviews, behavioral data — to surface core pain points and produce user-persona reports. Shipped 4 lo-fi → hi-fi prototypes in Modao and JiShi Design.",
      },
    },
  ],
} as const;