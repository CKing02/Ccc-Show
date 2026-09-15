---
title:
  zh: "锻炼2点零"
  en: "Workout 2.0"
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
  zh: "力量训练版的备忘录——纯本地、零社交、零广告，记录完就回到训练。"
  en: "A notepad for strength training — pure local, zero social, zero ads. Log it and get back to the work."
tech:
  - React Native
  - Expo
  - TypeScript
  - Zustand
  - expo-sqlite
  - React Navigation
  - Reanimated
---

## 设计动机

市面上大多数健身 App 把界面塞满排行榜、社交动态、广告位、推送通知——训练本身反而被淹没。

**锻炼2点零** 只保留一件事：把每组训练记下来，然后让你回到训练。所有数据存在本地，不登录、不联网、不社交。

定位：**力量训练版的备忘录**。

## 核心特性

### 自定义训练计划

- 30+ 内置动作（按主要肌群 / 器械筛选，支持搜索）
- 创建「推胸日」「下肢日」这类计划，添加动作即可
- 自由训练模式（不关联计划，直接开练）

### 训练中：逐组打钩 + 自动休息

- 完成一组 → 自动启动休息倒计时 → 到 0 震动提醒 → 进入下一组
- 每组支持 W / D / F 标记（热身 / 递减 / 力竭）
- 切后台、接电话再回来：计时器基于时间戳补偿，状态不丢

### 历史与日历

- 历史列表按日期分组，点进去看每组数据（只读）
- 过去 12 周训练热力图，一眼看出训练频率

### 纯本地

- `expo-sqlite` 持久化，杀进程重启数据保留
- 设置：kg / lb、暗色 / 亮色 / 跟随系统、默认休息时间、震动反馈开关

## 技术架构

- **React Native 0.86** + **Expo SDK 57** — 跨平台原生体验（当前仅 Android）
- **TypeScript** — strict + path alias `@/*`
- **Zustand** — 单一 store，按业务域切片：`exercise` / `plan` / `training` / `settings`
- **expo-sqlite** — 本地 SQLite 持久化（动作库 / 计划 / 训练记录）
- **React Navigation** — 3 Tab（首页 / 锻炼 / 我的）+ 全屏沉浸训练栈
- **Reanimated** — 倒计时与微交互
- **Lottie** — 训练完成动画

## 设计系统

- 自研 Design Token：`colors` / `typography` / `spacing` / `radius` / `shadows`，light + dark 双套
- 强调色：暖橙 `#FF6B35`，用于训练量数据高亮
- 主题跟随系统色模式，App 内可手动覆盖