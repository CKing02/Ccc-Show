import { Hero } from "@/components/home/Hero";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getLocale } from "@/lib/i18n-server";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <>
      <Hero locale={locale} />
      <FeaturedWorks locale={locale} />
      <AboutTeaser locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}