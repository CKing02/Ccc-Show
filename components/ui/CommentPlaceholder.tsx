import { Label } from "@/components/ui/Label";
import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

interface CommentPlaceholderProps {
  locale: Locale;
}

/**
 * 留言区占位：当前不开启评论功能，引导访客通过邮箱联系。
 * 未来接入 Waline/Twikoo 时只需替换此组件内部实现，调用方不变。
 */
export function CommentPlaceholder({ locale }: CommentPlaceholderProps) {
  return (
    <section className="border-t border-ink-faint">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28 lg:px-12 lg:py-36">
        <Label>{t(locale, "project_comments")}</Label>
        <p className="mt-8 font-serif text-2xl leading-relaxed text-ink-muted md:text-3xl lg:text-4xl">
          {t(locale, "project_comments_placeholder")}
        </p>
        <p className="mt-6 text-ink-muted">
          {t(locale, "project_comments_contact")}{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}