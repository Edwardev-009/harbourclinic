import type { Metadata } from "next";
import { PageIntro } from "@/components/Sections";
import { ContactSection } from "@/components/ContactSection";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Harbour Medical Clinic, Harbour Road, Kilcock, Co. Kildare, W23 KR22. Tel ${site.phone}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Contact Harbour Medical Clinic">
        <p>Call {site.phone}, email {site.email}, or send a message below.</p>
      </PageIntro>
      <section className="container-site pb-24"><ContactSection /></section>
    </>
  );
}
