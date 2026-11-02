import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, PageIntro } from "@/components/Sections";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/Photo";
import { harbourImage } from "@/data/content";
import { doctors } from "@/data/doctors";
import { SHOW_PHOTOS, site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About the clinic",
  description: "Harbour Medical Clinic is a private medical practice on Harbour Road, Kilcock, Co. Kildare, offering GP care and specialist clinics.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="About Harbour Medical Clinic">
        <p>Harbour Medical Clinic is a private medical practice in Kilcock, Co. Kildare. We offer general practice alongside specialist clinics.</p>
      </PageIntro>
      {SHOW_PHOTOS && <Photo src={harbourImage} alt="Boats moored at the harbour in Kilcock beside a stone bridge" sizes="100vw" className="aspect-[21/9] w-full" />}
      <section className="container-site section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Eyebrow>The practice</Eyebrow></div>
        <div className="measure space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
          {/* TODO: replace with the clinic's own story (client to supply). Do not add claims the clinic has not confirmed. */}
          <p>The clinic is run by {doctors[0]!.name} and {doctors[1]!.name}. Between them they cover general practice, women&apos;s health, sports medicine, pain management and minor surgery.</p>
          <p>
            We are a private practice. If you hold a medical card or GP visit card, please <a href={site.phoneHref} className="link-underline text-link">call us</a> before booking.
          </p>
          <p>You will find us at {site.address.slice(1).join(", ")}.</p>
        </div>
      </section>
      <section className="bg-brand-gradient section-y text-white">
        <div className="container-site grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-4xl text-white md:text-5xl">New and existing patients</h2>
            <p className="mt-4 text-xl font-semibold text-white">Book online, or call {site.phone}.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90"><Link href="/book">Book Appointment</Link></Button>
              <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90"><Link href="/doctors">Meet the doctors</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}