import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="container-site section-y">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-5xl md:text-6xl">Page not found</h1>
      <p className="measure mt-6 text-lg text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild><Link href="/">Go to the home page</Link></Button>
        <Button asChild variant="outline"><Link href="/services">See our services</Link></Button>
      </div>
    </section>
  );
}
