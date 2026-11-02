import type { Metadata } from "next";
import { DoctorCard, PageIntro } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { doctors } from "@/data/doctors";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Our doctors",
  description: "Meet Dr Mohammad Azhar and Dr Saima Aslam at Harbour Medical Clinic, Kilcock, Co. Kildare.",
  path: "/doctors",
});

export default function DoctorsPage() {
  return (
    <>
      <PageIntro eyebrow="Doctors" title="Our doctors">
        <p>Both doctors see patients for general practice, with their own specialist interests alongside.</p>
      </PageIntro>
      <section className="container-site grid gap-14 pb-24 sm:grid-cols-2 lg:grid-cols-12">
        {doctors.map((d, i) => (
          <div key={d.slug} className={i === 0 ? "lg:col-span-5" : "sm:mt-24 lg:col-span-5 lg:col-start-8"}><DoctorCard doctor={d} /></div>
        ))}
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Doctors", path: "/doctors" }])} />
    </>
  );
}
