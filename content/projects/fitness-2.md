---
title:
  zh: "健身 2.0"
  en: "Fitness 2.0"
slug: fitness-2
date: 2026-09-11
platform:
  - android
role:
  zh: "独立设计与开发"
  en: "Solo design & development"
status: shipped
featured: true
cover: /projects/fitness-2/cover.jpg
coverFit: contain
gallery:
  - /projects/fitness-2/01.jpg
  - /projects/fitness-2/02.jpg
  - /projects/fitness-2/03.jpg
  - /projects/fitness-2/04.jpg
  - /projects/fitness-2/05.jpg
summary:
  zh: "为认真训练的人打造的极简健身记录 App，剥离一切多余功能。"
  en: "A minimalist fitness tracker for serious lifters — nothing extra, only the work."
tech:
  - Kotlin
  - Jetpack Compose
  - Room
  - Health Connect
links:
  - type: github
    url: "https://github.com/yourname/fitness-2"
---

## 设计动机

大多数健身 App 把界面塞满排行榜、社交动态、广告位和推送通知——训练本身反而被淹没。

**健身 2.0** 只保留一件事：记录训练，然后让你回到训练。

## 核心特性

### 一屏记录

打开 App，立刻看到上一组的重量和次数。改数字 → 下一组。**全程不用离开屏幕**。

### 离线优先

所有数据存在本地 Room 数据库。无需登录、无需联网、无需同步。

> 你的训练数据只属于你。

### 渐进式记录

每个动作按 `重量 × 次数` 自动估算 1RM，生成渐进式负荷建议。

| 动作 | 上次 | 建议下次 |
| --- | --- | --- |
| 深蹲 | 100kg × 5 | 102.5kg × 5 |
| 卧推 | 70kg × 8 | 72.5kg × 6 |
| 硬拉 | 120kg × 3 | 122.5kg × 3 |

## 技术架构

\`\`\`kotlin
@Entity
data class WorkoutSet(
    @PrimaryKey val id: Long,
    val exerciseId: Long,
    val weightKg: Float,
    val reps: Int,
    val rpe: Float?,        // Rate of Perceived Exertion 1-10
    val performedAt: Instant,
)
\`\`\`

- **Kotlin** + **Jetpack Compose** — 现代 Android 原生开发
- **Room** — 本地 SQLite 持久化
- **Health Connect** — 与系统健康数据互通
- **Material 3** — 严格遵循 Material You 主题

## 未来计划

- [ ] 训练模板分享
- [ ] Apple Watch 端
- [ ] 静默后台同步到自托管服务器
