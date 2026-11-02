import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            A private medical practice on Harbour Road, Kilcock, Co. Kildare.
          </p>
        </div>
        <div className="md:col-span-2">
          <h2 className="eyebrow !font-sans !text-primary-foreground/60">Clinic</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:underline text-primary-foreground">{n.label}</Link></li>)}
            <li><Link href="/book" className="hover:underline text-primary-foreground">Book online</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow !font-sans !text-primary-foreground/60">Find us</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {site.address.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <p className="mt-4 text-sm">
            <a href={site.phoneHref} className="block hover:underline">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block hover:underline">{site.email}</a>
          </p>
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow !font-sans !text-primary-foreground/60">Opening hours</h2>
          {/* TODO: remove the "to be confirmed" line once the client confirms the hours (and set site.hoursConfirmed). */}
          <table className="mt-4 w-full text-sm">
            <tbody>
              {site.hours.map((h) => (
                <tr key={h.day} className="border-b border-primary-foreground/15">
                  <th scope="row" className="py-2 text-left font-normal">{h.day}</th>
                  <td className="py-2 text-right text-primary-foreground/80">{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!site.hoursConfirmed && <p className="mt-2 text-xs text-primary-foreground/60">Please call to confirm before visiting.</p>}
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-primary-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Harbour Medical Clinic, Kilcock. In an emergency call 112 or 999.</p>
          <Link href="/privacy-policy" className="hover:underline text-primary-foreground">Privacy policy</Link>
          <a href="https://webpalm.ie/" target="_blank" rel="noreferrer" className="hover:underline text-primary-foreground">Design by Webpalm Technologies</a>
        </div>
      </div>
    </footer>
  );
}