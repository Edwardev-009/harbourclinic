import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, DoctorCard, Eyebrow, FaqList } from "@/components/Sections";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/Photo";
import { JsonLd } from "@/components/JsonLd";
import { getService, services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { SHOW_PHOTOS } from "@/data/site";
import { buildMetadata, truncate, withLocation } from "@/lib/seo";
import { site } from "@/data/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: withLocation(s.name), description: truncate(`${s.summary} Private clinic on Harbour Road, Kilcock. Book online or call ${site.phone}.`), path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const team = doctors.filter((d) => service.doctorSlugs.includes(d.slug));
  const others = services.filter((s) => s.slug !== service.slug);
  const showImage = SHOW_PHOTOS && service.image;

  return (
    <>
      <section className="container-site pt-12 md:pt-20">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name }]} />
        <div className={showImage ? "mt-8 grid items-end gap-10 lg:grid-cols-12" : "mt-8"}>
          <div className={showImage ? "lg:col-span-6 lg:pb-10" : "max-w-3xl"}>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">{service.name}</h1>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{service.intro}</p>
            <Button asChild size="lg" className="mt-8"><Link href={`/book?service=${service.slug}`}>Book {service.name}</Link></Button>
          </div>
          {showImage && service.image && (
            <Photo src={service.image} alt={service.imageAlt} priority sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[4/3] w-full rounded-md lg:col-span-6" />
          )}
        </div>
      </section>

      <section className="container-site section-y grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="eyebrow !font-sans">What we treat</h2>
          <ul className="mt-6 border-t">{service.treats.map((t) => <li key={t} className="border-b py-4 text-lg">{t}</li>)}</ul>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="eyebrow !font-sans">Procedures</h2>
          <ol className="mt-6 border-t">
            {service.procedures.map((p, i) => (
              <li key={p} className="flex gap-4 border-b py-4 text-lg">
                <span className="pt-1 text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{p}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t">
        <div className="container-site section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {service.faqs.length > 0 && (<><h2 className="mb-8 text-4xl">Questions</h2><FaqList items={service.faqs} /></>)}
            <div className={service.faqs.length > 0 ? "mt-16" : ""}>
              <Eyebrow>Other clinics</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {others.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="link-underline text-link">{s.name}</Link></li>)}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Eyebrow>{team.length > 1 ? "Your doctors" : "Your doctor"}</Eyebrow>
            <div className="mt-6 space-y-12">{team.map((d) => <DoctorCard key={d.slug} doctor={d} />)}</div>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.name, path: `/services/${service.slug}` }])} />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
    </>
  );
}