import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { TransformationSection } from "@/components/landing/transformation-section";
import { InstructorSection } from "@/components/landing/instructor-section";
import { CurriculumPreview } from "@/components/landing/curriculum-preview";
import { PlatformPreview } from "@/components/landing/platform-preview";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: BRAND.metaTitle,
  description: BRAND.metaDescription,
  openGraph: {
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    type: "website",
    locale: "es_UY",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <TransformationSection />
      <InstructorSection />
      <CurriculumPreview />
      <PlatformPreview />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
