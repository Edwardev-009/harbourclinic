"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Controls({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  const cls = "inline-flex size-11 items-center justify-center rounded-md border hover:border-primary";
  return (
    <span className="flex items-center gap-2">
      <button type="button" onClick={onPrev} aria-label={`Previous ${label}`} className={cls}><ArrowLeft className="size-4" strokeWidth={1.5} /></button>
      <button type="button" onClick={onNext} aria-label={`Next ${label}`} className={cls}><ArrowRight className="size-4" strokeWidth={1.5} /></button>
    </span>
  );
}

export function Gallery({ items }: { items: { src: StaticImageData; alt: string; caption: string }[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + items.length) % items.length);
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted md:aspect-[21/9]">
        {items.map((g, idx) => (
          <Image
            key={g.caption}
            src={g.src}
            alt={g.alt}
            sizes="(min-width: 1280px) 1200px, 100vw"
            loading={idx === 0 ? "eager" : "lazy"}
            aria-hidden={idx !== i}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${idx === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-b pb-4">
        <p className="text-sm" aria-live="polite"><span className="tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")} — </span>{items[i]!.caption}</p>
        <Controls onPrev={() => go(-1)} onNext={() => go(1)} label="image" />
      </div>
    </div>
  );
}

export function PullQuote({ items }: { items: { quote: string; author: string }[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + items.length) % items.length);
  return (
    <figure className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-2">
        <p className="eyebrow">Patients</p>
        <p className="mt-2 text-xs text-muted-foreground">Placeholder quotes (preview only)</p>
      </div>
      <div className="lg:col-span-9">
        <blockquote aria-live="polite" className="font-serif text-3xl leading-[1.2] md:text-5xl">“{items[i]!.quote}”</blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <span className="text-muted-foreground">— {items[i]!.author}</span>
          <span className="flex items-center gap-4">
            <span className="w-14 text-center text-sm tabular-nums text-muted-foreground">{i + 1} / {items.length}</span>
            <Controls onPrev={() => go(-1)} onNext={() => go(1)} label="quote" />
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
