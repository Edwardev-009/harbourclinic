"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
      <div aria-hidden="true" className="h-1 bg-brand-gradient" />
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[18px] font-medium leading-[1.2]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn(
                    "py-2 transition-colors hover:text-primary",
                    isActive(n.href) ? "text-primary underline underline-offset-8" : "text-muted-foreground",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-[0.9375rem] text-primary md:inline-flex">
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
            {site.phone}
          </a>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/book">Book Appointment</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t lg:hidden">
          <ul className="container-site py-4">
            {nav.map((n) => (
              <li key={n.href} className="border-b last:border-0">
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-4 font-serif text-2xl">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-5">
              <Button asChild size="lg"><Link href="/book" onClick={() => setOpen(false)}>Book Appointment</Link></Button>
              <Button asChild size="lg" variant="outline"><a href={site.phoneHref}>Call {site.phone}</a></Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}