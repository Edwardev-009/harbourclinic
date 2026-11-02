import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, DoctorPortrait, Eyebrow } from "@/components/Sections";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { buildMetadata, truncate } from "@/lib/seo";
import { breadcrumbSchema, physicianSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => doctors.map((d) => ({ slug: d.slug }));

const find = (slug: string) => doctors.find((d) => d.slug === slug);

export async function generateMetadata({ params }: PageProps<"/doctors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = find(slug);
  if (!d) return {};
  return buildMetadata({ title: `${d.name}, Kilcock`, description: truncate(d.bio), path: `/doctors/${d.slug}` });
}

export default async function DoctorPage({ params }: PageProps<"/doctors/[slug]">) {
  const { slug } = await params;
  const doctor = find(slug);
  if (!doctor) notFound();
  const clinics = services.filter((s) => s.doctorSlugs.includes(doctor.slug));

  return (
    <>
      <section className="container-site section-y grid gap-12 lg:grid-cols-12">
        <DoctorPortrait doctor={doctor} className="w-full lg:col-span-5" />
        <div className="lg:col-span-6 lg:col-start-7">
          <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Doctors", href: "/doctors" }, { name: doctor.name }]} />
          <h1 className="mt-6 text-5xl md:text-7xl">{doctor.name}</h1>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{doctor.bio}</p>
          <Button asChild size="lg" className="mt-8"><Link href={`/book?doctor=${doctor.slug}`}>Book with {doctor.shortName}</Link></Button>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div><h2 className="eyebrow !font-sans">Qualifications</h2><ul className="mt-4 space-y-2">{doctor.qualifications.map((q) => <li key={q}>{q}</li>)}</ul></div>
            <div><h2 className="eyebrow !font-sans">Interests</h2><ul className="mt-4 space-y-2">{doctor.interests.map((q) => <li key={q}>{q}</li>)}</ul></div>
          </div>
          <div className="mt-14">
            <Eyebrow>Clinics</Eyebrow>
            <ul className="mt-4 border-t">{clinics.map((s) => <li key={s.slug} className="border-b"><Link href={`/services/${s.slug}`} className="block py-4 font-serif text-xl hover:text-link">{s.name}</Link></li>)}</ul>
          </div>
        </div>
      </section>
      <JsonLd data={physicianSchema(doctor)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Doctors", path: "/doctors" }, { name: doctor.name, path: `/doctors/${doctor.slug}` }])} />
    </>
  );
}
