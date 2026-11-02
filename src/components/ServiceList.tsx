import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceList({ services }: { services: Pick<Service, "slug" | "name" | "summary">[] }) {
  return (
    <ol className="border-t">
      {services.map((s, i) => (
        <li key={s.slug} className="border-b">
          <Link
            href={`/services/${s.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-[3.5rem_1fr_auto] md:py-7"
          >
            <span className="font-sans text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-link md:text-[2rem]">{s.name}</span>
              <span className="mt-2 block max-w-[52ch] text-[0.9375rem] text-muted-foreground">{s.summary}</span>
            </span>
            <ArrowRight className="size-5 -translate-x-1 text-primary transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
