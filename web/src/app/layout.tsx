import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { MotionBootstrap } from "@/components/chrome/MotionBootstrap";
import { ReadingPath } from "@/components/chrome/ReadingPath";
import "./reading.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Propty | The opportunity ahead",
    template: "%s · Propty Research",
  },
  description:
    "An executive view of property technology: company evidence, Bangladesh opportunities, product priorities and a proposed pilot roadmap.",
};

export const viewport: Viewport = {
  themeColor: "#f4f1e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${grotesk.variable} ${plexMono.variable}`}>
      <body>
        <MotionBootstrap />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-paper-raised focus:px-4 focus:py-2 focus:text-sm focus:font-mono"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main"><ReadingPath />{children}<ReadingPath position="bottom" /></main>
        <SiteFooter />
      </body>
    </html>
  );
}
