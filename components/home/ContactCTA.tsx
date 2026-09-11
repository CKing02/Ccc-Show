import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

interface ContactCTAProps {
  locale: Locale;
}

export function ContactCTA({ locale }: ContactCTAProps) {
  return (
    <section className="border-t border-ink-faint">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <Label>{t(locale, "home_contact_label")}</Label>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 font-serif text-4xl leading-tight md:text-6xl">
            {locale === "en" ? "Get in touch?" : "想聊聊？"}
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12 flex flex-col gap-6 font-serif text-xl md:flex-row md:gap-12 md:text-2xl">
            <a
              href={`mailto:${site.email}`}
              className="border-b border-ink pb-1 transition-opacity hover:opacity-60"
            >
              {site.email}
            </a>
            {site.social.github && (
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-ink pb-1 transition-opacity hover:opacity-60"
              >
                GitHub
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}