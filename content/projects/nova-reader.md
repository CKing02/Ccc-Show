---
title:
  zh: "Nova 阅读器"
  en: "Nova Reader"
slug: nova-reader
date: 2026-08-15
platform:
  - android
  - web
role:
  zh: "独立设计与开发"
  en: "Solo design & development"
status: shipped
featured: true
cover: /projects/nova-reader/cover.svg
gallery:
  - /projects/nova-reader/01.svg
  - /projects/nova-reader/02.svg
summary:
  zh: "一款为深度阅读打造的极简 RSS 阅读器，专注内容本身，剥离所有噪音。"
  en: "A minimalist RSS reader designed for deep reading — focused on content, free of noise."
tech:
  - Kotlin
  - Jetpack Compose
  - Room
  - WorkManager
downloads:
  - label:
      zh: "下载 APK"
      en: "Download APK"
    platform: android
    url: "https://github.com/yourname/nova-reader/releases/latest/download/nova-reader.apk"
  - label:
      zh: "在线使用"
      en: "Use Online"
    platform: web
    url: "https://nova.example.com"
links:
  - type: github
    url: "https://github.com/yourname/nova-reader"
  - type: website
    url: "https://nova.example.com"
---

## 设计动机

当主流阅读应用被算法、社交、广告和推送通知塞满时，**深度阅读**变得几乎不可能。

Nova 试图回到阅读的原始形态——一篇文章，一块屏幕，没有别的。

## 核心特性

### 极简界面

打开 App，直接进入阅读。没有任何引导页、推荐流、签到弹窗。

### 本地优先

所有文章存储在本地数据库，离线也能阅读。后台同步静默进行。

> 好的工具应该让你忘记工具的存在。

### 可定制排版

字号、字间距、行高、主题色——每一个细节都可调。

| 主题 | 背景 | 文字 |
| --- | --- | --- |
| 象牙白 | `#F7F5F0` | `#1A1815` |
| 墨夜黑 | `#1A1815` | `#EFE5D0` |
| 宣纸米 | `#EFE0C0` | `#3A2A18` |

## 技术架构

```kotlin
@Entity
data class Article(
    @PrimaryKey val id: String,
    val title: String,
    val content: String,
    val source: String,
    val publishedAt: Instant,
)
```

- **Kotlin** + **Jetpack Compose** — 现代 Android 原生开发
- **Room** — 本地 SQLite 持久化
- **WorkManager** — 后台同步
- **Web 版** — Next.js + React Server Components

## 未来计划

- [ ] OPML 导入导出
- [ ] 全文搜索
- [ ] iOS 端（学习 SwiftUI 中）
