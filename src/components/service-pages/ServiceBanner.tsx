import Image, { type StaticImageData } from "next/image";
import { Breadcrumbs } from "@/components/Sections";

/** Dark image banner with H1 + breadcrumbs, used by the two rich service pages. */
export function ServiceBanner({ title, name, image }: { title: string; name: string; image: StaticImageData }) {
  return (
    <section className="container-site pt-8 md:pt-10">
      <div className="relative overflow-hidden rounded-md bg-navy" style={{ "padding": "60px 0 60px 0" } as React.CSSProperties}>
        <Image src={image} alt="" priority sizes="100vw" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative px-6 py-14 text-center text-white md:py-20">
          <h1 className="text-4xl uppercase tracking-wide md:text-5xl">{title}</h1>
          <div className="mt-4 flex justify-center text-white/85 [&_a]:text-white [&_li]:text-white/85">
            <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name }]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary"><path fill="currentColor" d="M7.6 14.2 3.7 10.3l1.4-1.4 2.5 2.5 6.3-6.3 1.4 1.4z" /></svg>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function BookCta() {
  return (
    <section className="bg-navy text-white">
      <div className="container-site section-y flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="eyebrow !text-white/70">Need a doctor for a check-up?</p>
          <h2 className="mt-2 max-w-xl text-3xl md:text-4xl">Looking for professional, trusted medical care?</h2>
        </div>
        <a href="/book" className="inline-flex h-12 items-center rounded-md bg-white px-6 text-sm font-medium text-navy hover:bg-white/90">Book an appointment</a>
      </div>
    </section>
  );
}