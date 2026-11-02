export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://harbourclinic.ie").replace(/\/$/, "");

/**
 * Placeholder content (stock-style photos, sample testimonials) is shown only when
 * NEXT_PUBLIC_SHOW_PLACEHOLDER_CONTENT=true. `.env.development` turns it on for `next dev`;
 * production builds hide it until the client supplies real content.
 */
export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_CONTENT === "true";

/**
 * Set to true once the placeholder files in src/assets (hero-clinic.jpg, reception.jpg, physio.jpg,
 * harbour.jpg) have been replaced with the clinic's REAL photographs (and the alt texts in
 * src/data/content.ts / src/data/services.ts match them). Then photos show in production too.
 */
export const HAS_REAL_PHOTOS = false;
export const SHOW_PHOTOS = HAS_REAL_PHOTOS || SHOW_PLACEHOLDERS;

export const site = {
  name: "Harbour Medical Clinic",
  address: ["The Harbour Medical Clinic", "Harbour Road", "Kilcock, Co. Kildare", "W23 KR22"],
  addressSchema: {
    streetAddress: "Harbour Road",
    addressLocality: "Kilcock",
    addressRegion: "Co. Kildare",
    postalCode: "W23 KR22",
    addressCountry: "IE",
  },
  phone: "089 417 1096",
  phoneHref: "tel:+353894171096",
  phoneE164: "+353894171096",
  email: "info@harbourclinic.ie",
  mapsUrl: "https://maps.google.com/?q=Harbour+Road+Kilcock+W23+KR22",
  // TODO: add the Google Business Profile URL (and social profiles) once supplied. Used in JSON-LD sameAs.
  sameAs: [] as string[],
  // TODO: confirm real opening hours with the client. Hours are NOT published in JSON-LD until confirmed.
  hoursConfirmed: false,
  hours: [
    { day: "Monday – Friday", time: "9:00 – 17:00" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;