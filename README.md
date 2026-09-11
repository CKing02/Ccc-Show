# 展示台 / Portfolio

个人作品集网站 — 美术馆式排版，3-6 个软件项目展示。

## 技术栈

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first 配置)
- Markdown 内容管线 (gray-matter + remark)
- next/font 自托管字体
- pnpm 包管理

## 启动

```bash
pnpm install      # 安装依赖
pnpm dev          # 开发模式 http://localhost:3000
pnpm build        # 生产构建
pnpm start        # 启动生产服务
pnpm lint         # ESLint 检查
pnpm type-check   # TypeScript 类型检查
pnpm format       # Prettier 格式化
```

## ⚠️ Windows 路径说明

项目位于 `E:\私人DIV\idea项目\展示台`，**含中文 + 空格**。

`.npmrc` 已配置 `node-linker=hoisted` 缓解大部分问题。如遇到边缘问题：

```powershell
# 创建不带空格的软链接（可选）
mklink /J D:\dev\portfolio "E:\私人DIV\idea项目\展示台"
```

## 目录结构

```
app/                  Next.js App Router 路由
components/           React 组件
  layout/            Header / Footer / SectionRule
  home/              首页相关
  works/             作品展厅 / 详情
  ui/                通用 UI（Reveal / Label / Prose）
  i18n/              双语 Context
lib/                  工具函数（content / markdown / i18n）
content/              Markdown 项目内容
public/               静态资源（封面、截图、头像）
i18n/                 UI 文案字典
```

## 实施进度

- [x] Phase 1 — 项目脚手架
- [x] Phase 2 — 设计系统与字体
- [x] Phase 3 — 内容管线
- [x] Phase 4 — 首页与作品展厅
- [x] Phase 5 — 项目详情页
- [x] Phase 6 — 关于页与收尾
- [x] Phase 7 — 部署前检查

## 部署

### 预部署清单

- [x] `pnpm type-check` 通过
- [x] `pnpm lint` 通过
- [x] `pnpm build` 通过
- [x] `typedRoutes` 已开启
- [x] Sitemap 含全部静态路由（首页 / 作品 / 关于 / 全部项目 slug）
- [x] robots.txt 含 sitemap 链接
- [x] Open Graph 图（`opengraph-image.tsx` 自动产出 1200×630 PNG）
- [x] i18n：cookie `locale` 控制 zh/en

### 环境变量

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```

不设则默认 `http://localhost:3000`。**生产部署必须设置**——sitemap、OG 图 URL、metadataBase 都依赖它。

### Vercel（推荐）

零配置——Next.js / Tailwind / 字体 next/font 都自动识别。本仓库已附带：

- `vercel.json` — 区域 `hkg1`、静态资源 `immutable` 缓存、安全响应头
- `.env.production.example` — `NEXT_PUBLIC_SITE_URL` 占位
- `.vercelignore` — 上传白名单

#### 首次部署

```bash
# 方式 A：CLI（需先登录 vercel.com 并安装 vercel CLI）
pnpm dlx vercel login
pnpm dlx vercel link        # 关联项目
pnpm dlx vercel             # 部署到预览环境
pnpm dlx vercel --prod      # 部署到生产

# 方式 B：GitHub 集成（推荐用于持续部署）
# 1. 推到 GitHub
# 2. vercel.com → New Project → 选仓库 → Import
# 3. Project Settings → Environment Variables 添加：
#    NEXT_PUBLIC_SITE_URL = https://YOUR-DOMAIN.TLD
# 4. 之后每次 push main 自动部署
```

> **必须设置 `NEXT_PUBLIC_SITE_URL`**（在 Vercel Project Settings → Environment Variables，Production / Preview 都建议加 Preview URL）。不设会导致 sitemap 与 OG 图回退到 `http://localhost:3000`。

#### 自定义域名

Vercel Project → Settings → Domains → 添加域名，按提示在 DNS 添加 A/CNAME 记录。生效后再把 `NEXT_PUBLIC_SITE_URL` 改成正式域名并重新部署。

### 自托管

```bash
pnpm build
pnpm start
```

默认监听 `:3000`。反代示例（nginx）：

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### ⚠️ Windows 路径 + 输出模式

`output: "standalone"` 在 Windows + 中文/空格路径下 `spawn` 失败（见 [issue](https://github.com/vercel/next.js)）。本项目默认关闭该选项；如需 Docker 部署，请在 WSL/Linux 环境下开启并构建。
