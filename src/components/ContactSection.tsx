import { MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6"><ContactForm /></div>
      <div className="lg:col-span-5 lg:col-start-8">
        {/* TODO: replace with an embedded Google Map (loaded on interaction to protect Core Web Vitals / privacy) */}
        <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="flex aspect-[4/3] flex-col justify-end rounded-md border bg-purple-light p-6" aria-label="Open the clinic location in Google Maps">
          <MapPin className="size-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
          <span className="mt-3 font-serif text-2xl">Harbour Road, Kilcock</span>
          <span className="link-underline mt-1 text-sm text-link">Open in Google Maps</span>
        </a>
        <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
          <div><dt className="eyebrow">Phone</dt><dd className="mt-2"><a href={site.phoneHref} className="link-underline">{site.phone}</a></dd></div>
          <div><dt className="eyebrow">Email</dt><dd className="mt-2"><a href={`mailto:${site.email}`} className="link-underline break-all">{site.email}</a></dd></div>
          <div className="col-span-2">
            <dt className="eyebrow">Address</dt>
            <dd className="mt-2"><address className="not-italic">{site.address.join(", ")}</address></dd>
          </div>
        </dl>
      </div>
    </div>
  );
}