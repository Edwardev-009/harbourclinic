import type { Metadata } from "next";
import { SITE_URL, site } from "@/data/site";

export const SITE_TITLE_SUFFIX = site.name;

type PageSeo = {
  /** Page-specific part of the title; the site name is appended by the layout title template. */
  title: string;
  description: string;
  /** Path starting with "/" (canonical + og:url). */
  path: string;
  /** Absolute or root-relative URL to a real image. Omit to use the site default. */
  image?: string;
  noindex?: boolean;
  /** Use the title exactly as given (no " | Harbour Medical Clinic" suffix). Home page only. */
  absoluteTitle?: boolean;
};

export function buildMetadata({ title, description, path, image, noindex, absoluteTitle }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_TITLE_SUFFIX}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IE",
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Trim to a safe meta-description length without cutting mid-word. */
export function truncate(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,;:]$/, "") + "…";
}

/** "Name in Kilcock" when it keeps the full title under ~60 characters, otherwise just the name. */
export function withLocation(name: string) {
  const long = `${name} in Kilcock`;
  return long.length + SITE_TITLE_SUFFIX.length + 3 <= 62 ? long : name;
}
