import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { cn } from "@/lib/utils";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="container-site pt-14 pb-12 md:pt-24 md:pb-16">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-9">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-[2.6rem] leading-[1.02] md:text-7xl">{title}</h1>
          {children && <div className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((t, i) => (
          <li key={t.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {t.href ? <Link href={t.href} className="hover:text-primary">{t.name}</Link> : <span aria-current="page">{t.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function HowItWorks() {
  const steps = [
    { t: "Choose service and doctor", d: "Pick what you need. Choose a doctor, or take the first available." },
    { t: "Pick a time", d: "See open times for the day that suits you." },
    { t: "Get confirmation", d: "Your booking reference is emailed to you." },
  ];
  return (
    <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      <span aria-hidden="true" className="absolute top-5 right-0 left-0 hidden h-px bg-primary/25 md:block" />
      {steps.map((s, i) => (
        <li key={s.t} className="relative">
          <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-primary bg-background font-serif text-lg">{i + 1}</span>
          <h3 className="mt-5 text-2xl">{s.t}</h3>
          <p className="mt-2 max-w-[34ch] text-muted-foreground">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

const initials = (name: string) => name.replace(/^Dr\s+/, "").split(" ").map((p) => p[0]).join("");

/** Neutral panel until a real portrait is supplied (TODO in data/doctors.ts). */
export function DoctorPortrait({ doctor, className }: { doctor: Doctor; className?: string }) {
  if (doctor.image) {
    return (
      <Image
        src={doctor.image}
        alt={`Portrait of ${doctor.name}`}
        sizes="(min-width: 1024px) 480px, 100vw"
        placeholder="blur"
        className={cn("aspect-[4/5] w-full rounded-md object-cover", className)}
      />
    );
  }
  return (
    <div aria-hidden="true" className={cn("flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md bg-purple-light font-serif text-7xl text-purple/50", className)}>
      {initials(doctor.name)}
    </div>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article>
      <Link href={`/doctors/${doctor.slug}`} className="group block">
        <DoctorPortrait doctor={doctor} />
        <h3 className="mt-6 text-3xl group-hover:text-link">{doctor.name}</h3>
      </Link>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{doctor.qualifications.join(" · ")}</p>
      <Link href={`/book?doctor=${doctor.slug}`} className="link-underline mt-5 inline-block text-link">
        Book with {doctor.shortName}
      </Link>
    </article>
  );
}

/** Native <details>: answers are in the server HTML (crawlable) and it works without JavaScript. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t">
      {items.map((f) => (
        <details key={f.q} className="group border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" strokeWidth={1.5} aria-hidden="true" />
          </summary>
          <p className="measure pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}