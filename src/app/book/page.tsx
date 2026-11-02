import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/Sections";
import { BookingClient } from "@/components/BookingClient";
import { bookingMode } from "@/lib/booking";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book an appointment",
  description: "Book online at Harbour Medical Clinic, Kilcock. Choose a service, a doctor and a time.",
  path: "/book",
});

export default function BookPage() {
  // Safety net: never show demo booking to real patients. Until the live API is configured,
  // production shows contact details instead. `next dev` always shows the preview flow.
  // NEXT_PUBLIC_ENABLE_BOOKING_DEMO=true (set on Vercel PREVIEW only) also opens the demo flow for client walkthroughs.
  const open = bookingMode === "live" || process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_BOOKING_DEMO === "true";

  if (!open) {
    return (
      <PageIntro eyebrow="Book online" title="Book an appointment">
        <p>Online booking is opening soon. To book now, please call <a href={site.phoneHref} className="link-underline text-link">{site.phone}</a> or email <a href={`mailto:${site.email}`} className="link-underline text-link">{site.email}</a>.</p>
      </PageIntro>
    );
  }

  return (
    <Suspense fallback={<PageIntro eyebrow="Book online" title="Book an appointment" />}>
      <BookingClient
        services={services.map(({ slug, name, doctorSlugs }) => ({ slug, name, doctorSlugs }))}
        doctors={doctors.map(({ slug, name, qualifications }) => ({ slug, name, qualifications }))}
      />
    </Suspense>
  );
}