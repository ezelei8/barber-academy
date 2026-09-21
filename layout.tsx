import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";

// NOTE: this sandbox has no network access to fonts.googleapis.com, so we
// ship a system font stack instead of next/font/google. It still renders a
// clean, modern, technical look with zero external requests and no
// flash-of-unstyled-text. To use a custom brand font in production, add it
// with next/font/local (self-hosted .woff2 files) — no code changes needed
// beyond that, since --font-sans / --font-mono are already wired in
// app/globals.css.

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: BRAND.metaTitle,
    template: BRAND.metaTitleTemplate,
  },
  description: BRAND.metaDescription,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-carbon-950 text-bone-100">{children}</body>
    </html>
  );
}
