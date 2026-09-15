---
title:
  zh: "OCR-智能报销识别"
  en: "OCR-ExerciseGifCache"
slug: ocr-exerciseGifCache
date: 2026-03-01
platform:
  - pc
role:
  zh: "AI产品经理"
  en: "AI Product Manager"
status: shipped
featured: false
cover: /projects/ocr-exerciseGifCache/cover.png
gallery:
  - /projects/ocr-exerciseGifCache/01.png
  - /projects/ocr-exerciseGifCache/02.png
summary:
  zh: "报销凭证一键批量识别，可支持手动修改识别结果，一键批量重命名，一键批量填入表单。"
  en: "One-click batch OCR for expense receipts — manual correction, batch renaming, and auto-fill into spreadsheets."
tech:
  - Python
  - tkinter
  - Baidu OCR API
  - pdfplumber
  - openpyxl
  - Pillow
  - PyInstaller
---

## 设计动机

每月 30–70 张报销凭证，手动命名文件 + 对照图片录入 xlsx 表格，**每次约 40 分钟**——重复劳动、低价值、易出错。

**OCR-智能报销识别** 把这条流水线自动化：选择文件夹 → 自动识别金额和类型 → 一键重命名 → 一键填表。原本 40 分钟压缩到 5 分钟以内，把人从机械操作里解放出来。

## 核心特性

### 一键批量识别

选文件夹 → 自动扫描所有 jpg / jpeg / png / pdf → 调用百度 OCR → 提取金额 + 匹配费用类型。整个流程无需任何手动配置。

### JPG + PDF 智能配对

有票凭证通常是同一笔报销的 JPG（手机截图）+ PDF（电子发票）。工具按 **金额 + 类型 + 时间戳** 三维度自动配对，避免错配；配对成功的高置信行显示绿色，待修正的标红色，提示用户处理。

### 手动修正持久化

OCR 不可能 100% 准确——遇到识别错的，手动改一次后，**重扫仍然生效**。修正记录按文件内容 SHA256 存储，重命名或移动文件不会丢失修正结果。

### 一键重命名 + 填表

按命名规范批量重命名文件（如 `001、交通781.jpg`），同时把数据按费用类型映射自动填入 xlsx 模板的两个 Sheet（`有发票版本` / `没发票版本`）。原模板不受影响。

> 好的工具应该让你忘记工具的存在。

## 技术架构

\`\`\`python
# 缓存键改为文件内容 SHA256 — 重命名/移动不失效
def _compute_hash(file_path: str) -> str:
    h = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()
\`\`\`

- **Python 3.9** + **tkinter** — 桌面原生 GUI，打包体积小，无需 Web 技术栈
- **百度 OCR API** — 中文印刷体识别准确率高，按次计费成本可控
- **pdfplumber** — 从 PDF 电子发票中提取文字
- **openpyxl** — xlsx 读写，**直接填充现有模板不重建**
- **Pillow** — 图片预处理（如有需要）
- **PyInstaller** — 打包为单文件 exe，免 Python 环境运行
- **requests** — 调用百度 OCR REST API

## 数据 / 效果

| 指标 | 数值 |
| --- | --- |
| 月均凭证量 | 30–70 张 |
| 单次处理时长 | 40 分钟 → <5 分钟 |
| OCR 识别准确率 | ~95%（剩余 5% 手动修正） |
| 重命名 + 填表准确率 | 100%（机械操作） |
| 工具体积 | <30 MB（PyInstaller 单文件） |

## 未来计划

- [ ] 同金额多张发票的精确匹配（提取发票号/日期等更多特征）
- [ ] pytest 自动化测试框架
- [ ] 批量处理多个文件夹
- [ ] 打包为单文件 exe 分发同事使用
