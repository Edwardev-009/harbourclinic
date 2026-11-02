import type { Metadata } from "next";
import { PageIntro } from "@/components/Sections";
import { ServiceList } from "@/components/ServiceList";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: "GP, women's health, thyroid, sports injury, pain, minor surgery, physiotherapy, gait scan and pelvic floor clinics at Harbour Medical Clinic, Kilcock.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Our services">
        <p>{services.length} clinics at one address. Choose a service to see what is involved.</p>
      </PageIntro>
      <section className="container-site pb-20 lg:pb-28"><ServiceList services={services} /></section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
    </>
  );
}
