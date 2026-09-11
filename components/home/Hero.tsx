import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/types";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-40">
      <Reveal>
        <Label>Portfolio · {new Date().getFullYear()}</Label>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-8 font-serif text-6xl leading-[1.05] tracking-tight md:text-9xl">
          {locale === "en" ? "Portfolio" : "展示台"}
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-12 max-w-2xl font-serif text-xl leading-relaxed text-ink-muted md:text-3xl">
          {locale === "en"
            ? "Browse 3–6 independently crafted works, the way you'd walk through a gallery."
            : "像看展一样，逐件浏览 3-6 个独立完成的作品。"}
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-ink-faint pt-8 text-sm uppercase tracking-[0.2em]">
          {site.social.github && (
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              GitHub →
            </a>
          )}
          <a
            href={`mailto:${site.email}`}
            className="transition-opacity hover:opacity-60"
          >
            Email →
          </a>
        </div>
      </Reveal>
    </section>
  );
}