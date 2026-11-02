import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceList } from "@/components/ServiceList";
import { DoctorCard, Eyebrow, FaqList, HowItWorks } from "@/components/Sections";
import { Gallery, PullQuote } from "@/components/Carousels";
import { ContactSection } from "@/components/ContactSection";
import { Photo } from "@/components/Photo";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { faqs, gallery, harbourImage, homeHeroImage, placeholderTestimonials, receptionImage } from "@/data/content";
import { HAS_REAL_PHOTOS, SHOW_PHOTOS, SHOW_PLACEHOLDERS, site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Harbour Medical Clinic | Private GP Clinic in Kilcock",
  absoluteTitle: true,
  description: `Private GP, women's health, sports injury and pain clinics on Harbour Road, Kilcock, Co. Kildare. Book online or call ${site.phone}.`,
  path: "/",
});

// Real testimonials = everything in content.ts except the leftover "Placeholder" sample entries.
const realTestimonials = placeholderTestimonials.filter((t) => t.author.trim().toLowerCase() !== "placeholder");

export default function HomePage() {
  const homeFaqs = faqs.slice(0, 5);
  return (
    <>
      {/* Hero */}
      <section className="container-site pt-10 md:pt-16">
        <div className={SHOW_PHOTOS ? "grid items-end gap-10 lg:grid-cols-12" : "grid gap-10"}>
          <div className={SHOW_PHOTOS ? "pb-4 lg:col-span-6 lg:pb-16" : "pb-4 lg:max-w-3xl lg:pb-12"}>
            <Eyebrow>Harbour Road · Kilcock, Co. Kildare</Eyebrow>
            <h1 className="mt-6 text-[2.75rem] leading-[1] sm:text-6xl lg:text-[5.25rem]">
              Private GP and specialist clinic in Kilcock
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-muted-foreground">
              Dr Mohammad Azhar and Dr Saima Aslam see patients for general practice, women&apos;s health, sports injuries and pain management.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button asChild size="lg"><Link href="/book">Book Appointment</Link></Button>
              <a href={site.phoneHref} className="link-underline text-[0.9375rem]">Call {site.phone}</a>
            </div>
          </div>
          {SHOW_PHOTOS && (
            <div className="lg:col-span-6">
              <Photo src={homeHeroImage} alt="A doctor showing a patient information on a tablet" priority sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[4/5] w-full rounded-md lg:aspect-[5/6]" />
            </div>
          )}
        </div>
      </section>

      {/* Info strip */}
      <section aria-label="Quick contact" className="mt-10 border-y md:mt-14">
        <div className="container-site grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          <InfoItem icon={<Phone strokeWidth={1.5} />} label="Call" value={site.phone} href={site.phoneHref} />
          <InfoItem icon={<CalendarDays strokeWidth={1.5} />} label="Book online" value="Choose a time that suits" href="/book" />
          <InfoItem icon={<MapPin strokeWidth={1.5} />} label="Find us" value="Harbour Road, W23 KR22" href={site.mapsUrl} external />
        </div>
      </section>

      {/* Services */}
      <section className="container-site section-y">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4"><Eyebrow>Services</Eyebrow></div>
          <h2 className="text-4xl leading-tight md:text-5xl lg:col-span-8">{services.length} clinics, from routine GP care to joint injections and minor surgery.</h2>
        </div>
        <ServiceList services={services} />
      </section>

      {/* About */}
      <section className="bg-tint section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>About the clinic</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight md:text-5xl">A private medical practice in Kilcock.</h2>
            {/* TODO: replace with the clinic's own story once supplied. Keep to facts the client confirms. */}
            <div className="measure mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>Harbour Medical Clinic is on Harbour Road in Kilcock, Co. Kildare. Alongside general practice, the clinic runs specialist clinics for thyroid problems, sports injuries, pain, minor surgery and women&apos;s health.</p>
            </div>
            <Link href="/about" className="link-underline mt-8 inline-block text-link">More about us</Link>
          </div>
          {SHOW_PHOTOS && (
            <div className="lg:col-span-6 lg:col-start-7">
              <Photo src={receptionImage} alt="A waiting area with armchairs" sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full rounded-md lg:ml-auto lg:w-[85%]" />
              <Photo src={harbourImage} alt="Boats moored at the harbour in Kilcock" sizes="(min-width: 1024px) 320px, 66vw" className="mt-4 aspect-[4/3] w-2/3 rounded-md lg:hidden" />
            </div>
          )}
        </div>
      </section>

      {/* Gallery: placeholder photos only, hidden in production until real photos exist */}
      {SHOW_PHOTOS && (
        <section className="container-site section-y">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">Inside the clinic</h2>
            {!HAS_REAL_PHOTOS && <p className="eyebrow hidden sm:block">Photographs · Placeholder (preview only)</p>}
          </div>
          <Gallery items={gallery} />
        </section>
      )}

      {/* Doctors */}
      <section className="container-site section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Our doctors</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight md:text-5xl">Meet your doctors.</h2>
            <Link href="/doctors" className="link-underline mt-6 inline-block text-link">About the doctors</Link>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
            {doctors.map((d, i) => (
              <div key={d.slug} className={i === 1 ? "sm:mt-24" : ""}><DoctorCard doctor={d} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t">
        <div className="container-site py-16 lg:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow>Booking</Eyebrow><h2 className="mt-4 text-4xl md:text-5xl">How it works</h2></div>
            <Button asChild variant="outline"><Link href="/book">Start a booking</Link></Button>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Testimonials: sample quotes are NEVER shown in production. Show real, consented feedback only. */}
      {(SHOW_PLACEHOLDERS || realTestimonials.length > 0) && (
        <section className="border-t">
          <div className="container-site section-y"><PullQuote items={SHOW_PLACEHOLDERS ? placeholderTestimonials : realTestimonials} /></div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t">
        <div className="container-site section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Before you visit</h2>
            <Link href="/faqs" className="link-underline mt-6 inline-block text-link">All FAQs</Link>
          </div>
          <div className="lg:col-span-8"><FaqList items={homeFaqs} /></div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t bg-card">
        <div className="container-site section-y">
          <div className="mb-12"><Eyebrow>Contact</Eyebrow><h2 className="mt-4 text-4xl md:text-5xl">Contact the clinic</h2></div>
          <ContactSection />
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon, label, value, href, external }: { icon: React.ReactNode; label: string; value: string; href: string; external?: boolean }) {
  const cls = "flex items-center gap-4 py-6 transition-colors hover:text-link md:px-8 md:first:pl-0";
  const inner = (
    <>
      <span className="text-primary [&_svg]:size-5" aria-hidden="true">{icon}</span>
      <span><span className="eyebrow block">{label}</span><span className="mt-1 block text-[0.9375rem]">{value}</span></span>
    </>
  );
  if (href.startsWith("/")) return <Link href={href} className={cls}>{inner}</Link>;
  return <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{inner}</a>;
}