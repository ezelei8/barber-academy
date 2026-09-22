import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";

// NOTE: this sandbox has no network access to fonts.googleapis.com, so we
// use the system font stack instead of next/font/google. Swap in a real
// Google Font (e.g. Inter or Manrope) once deployed somewhere with network
// access — see the commented-out example below.
//
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
