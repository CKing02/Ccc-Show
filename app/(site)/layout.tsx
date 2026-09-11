import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLocale } from "@/lib/i18n-server";

/**
 * 站点级布局：套上 Header 和 Footer。
 * 放在 (site) 路由组下，作用范围覆盖 /、/works、/works/[slug]、/about。
 * 从 cookie 读取 locale 后向下传递给客户端感知组件。
 *
 * A11y：
 * - 第一个元素是 skip-to-content 链接，仅键盘聚焦时显示，跳到 #main
 * - <main id="main" tabIndex={-1}> 让目标可聚焦
 */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {locale === "en" ? "Skip to content" : "跳到正文"}
      </a>
      <Header locale={locale} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}