import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, PageIntro } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "FAQs",
  description: "Fees, what to bring, same-day appointments, registration and cancellations at Harbour Medical Clinic, Kilcock.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <PageIntro eyebrow="FAQs" title="Frequently asked questions">
        <p>Cannot find what you need? <Link href="/contact" className="link-underline text-link">Get in touch</Link>.</p>
      </PageIntro>
      <section className="container-site grid pb-24 lg:grid-cols-12"><div className="lg:col-span-8 lg:col-start-5"><FaqList items={faqs} /></div></section>
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
