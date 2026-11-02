import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/about", "/services", ...services.map((s) => `/services/${s.slug}`),
    "/doctors", ...doctors.map((d) => `/doctors/${d.slug}`),
    "/book", "/faqs", "/contact", "/privacy-policy",
  ];
  // No fake lastModified dates: omit them until content is edited through a CMS/with real dates.
  return paths.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}` }));
}
