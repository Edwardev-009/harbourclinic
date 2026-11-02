import { SITE_URL, site } from "@/data/site";
import type { Doctor } from "@/data/doctors";

/** Stable @id so Physician / pages can reference the clinic entity. */
export const CLINIC_ID = `${SITE_URL}/#clinic`;

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: site.name,
    url: SITE_URL,
    telephone: site.phoneE164,
    email: site.email,
    address: { "@type": "PostalAddress", ...site.addressSchema },
    // TODO: add isAcceptingNewPatients only if the client confirms
    // Only published once the client confirms the real hours.
    ...(site.hoursConfirmed
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "17:00",
            },
          ],
        }
      : {}),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    // TODO: add `image` / `logo` (absolute URL) once the SVG/PNG logo is supplied.
  };
}

export function physicianSchema(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    url: `${SITE_URL}/doctors/${d.slug}`,
    description: d.bio,
    knowsAbout: d.interests,
    worksFor: { "@id": CLINIC_ID },
    ...(d.image ? { image: `${SITE_URL}${d.image.src}` } : {}),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path === "/" ? "" : t.path}`,
    })),
  };
}