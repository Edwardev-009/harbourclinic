import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { clinicSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/data/site";

// Self-hosted variable fonts (SIL OFL, from @fontsource-variable): no third-party request, no render-blocking CSS.
const fraunces = localFont({
  src: "./fonts/fraunces-latin-wght-normal.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const instrument = localFont({
  src: "./fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Harbour Medical Clinic | Private GP Clinic in Kilcock", template: "%s | Harbour Medical Clinic" },
  description: "Private GP and specialist clinic on Harbour Road, Kilcock, Co. Kildare. Book online or call " + site.phone + ".",
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#3b5fd9", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IE" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={clinicSchema()} />
      </body>
    </html>
  );
}