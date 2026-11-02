import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // TODO: keep staging/preview deployments out of the index (X-Robots-Tag or password) before go-live.
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/cancel"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
