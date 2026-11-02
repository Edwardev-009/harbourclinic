import Image from "next/image";
import { ServiceBanner, CheckList, BookCta } from "./ServiceBanner";
import { site } from "@/data/site";
import chairFront from "@/assets/services/hifet-chair-front.webp";
import chairWhite from "@/assets/services/hifet-chair-white.webp";
import room from "@/assets/services/hifet-room.webp";
import woman from "@/assets/services/hifet-woman.webp";
import man from "@/assets/services/hifet-man.webp";
import spineBlue from "@/assets/services/hifet-spine-blue.webp";
import spineRed from "@/assets/services/hifet-spine-red.webp";

// TODO (client): the three statements below are copied from the old site. Confirm wording,
// especially the "12,000 contractions" and "far exceeds Kegel" claims, before launch (ASAI / HPRA advertising rules).
const steps = [
  { t: "Before the treatment", d: "The pelvic floor plays a central role in your physical stability and health. Pelvic floor weakness can therefore have far-reaching effects on your body and wellbeing." },
  { t: "During the treatment", d: "Magnetic field technology sends targeted impulses to the muscles of your pelvic floor, resulting in over 12,000 muscle contractions per session." },
  { t: "After the treatment", d: "After a few sessions you gain the ability to consciously control and feel your pelvic floor, helping you address the root causes of your complaints in the long term and improving your quality of life." },
];
const women = ["Reduces urinary leakage", "Supports organ prolapse management", "Aids postpartum recovery", "Enhances sensation and sexual pleasure"];
const men = ["Reduces urinary leakage during the day and night", "Reduces overactive bladder symptoms", "Supports recovery after prostate surgery", "Enhances sexual function"];
// TODO (client): upload the manual PDF to /public/downloads/ and set this path. Left empty so no dead link is shown.
const MANUAL_PDF: string | null = null;

export function HifetPage() {
  return (
    <>
      <ServiceBanner title="HIFET Pelvic Floor Therapy Chair" name="HIFET Pelvic Floor Therapy Chair" image={chairWhite} />

      <section className="container-site section-y">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Introduction</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Instrument principle</h2>
          </div>
          <a href={site.phoneHref} className="flex items-center gap-3 rounded-md border bg-card px-4 py-3">
            <span className="text-xs text-muted-foreground">Schedule an expert call<br /><span className="text-lg font-medium text-foreground">{site.phone}</span></span>
          </a>
        </div>
        <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
          The HIFET chair changes the traditional treatment of urinary incontinence. Using HIFEM (high-intensity focused electromagnetic) technology, it stimulates the motor neurons that control the pelvic floor muscles and triggers repeated strong contractions, to rebuild the strength and endurance of the pelvic floor muscles and urinary system.
        </p>

        <div className="mt-10 grid items-center gap-8 rounded-md bg-accent p-6 md:grid-cols-2 md:p-10">
          <Image src={chairFront} alt="The HIFET pelvic floor therapy chair, front view" sizes="(min-width: 768px) 480px, 100vw" className="mx-auto h-auto w-full max-w-sm rounded-md" />
          <div>
            <p className="measure leading-relaxed text-muted-foreground">
              The chair activates pelvic floor muscle tissue and promotes collagen regeneration, helping to restore firmness and elasticity. It is used to strengthen the pelvic floor and to address incontinence, urine leakage, dripping, lower abdominal protrusion, lower pelvic relaxation and difficulty reaching orgasm. The pelvic floor muscles are triggered to tighten approximately 12,000 times within 30 minutes, an effect that exceeds general Kegel exercises.
            </p>
            {MANUAL_PDF && <a href={MANUAL_PDF} className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">HIFET chair manual (PDF)</a>}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-site section-y grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-md bg-card p-7 text-foreground" style={{ "padding": "18px" } as React.CSSProperties}>
              <p className="text-sm tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent">
        <div className="container-site section-y space-y-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Image src={woman} alt="A woman seated and reading on the HIFET chair, fully clothed" sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-md" />
            <div>
              <h2 className="text-3xl">Benefits for women</h2>
              <CheckList items={women} className="mt-5 text-sm" />
              <Image src={spineBlue} alt="" width={120} height={120} className="mt-6 h-28 w-28 rounded-full" />
            </div>
          </div>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl">Benefits for men</h2>
              <CheckList items={men} className="mt-5 text-sm" />
              <Image src={spineRed} alt="" width={120} height={120} className="mt-6 h-28 w-28 rounded-full" />
            </div>
            <Image src={man} alt="A man seated on the HIFET chair, fully clothed" sizes="(min-width: 768px) 560px, 100vw" className="order-1 h-auto w-full rounded-md md:order-2" />
          </div>
        </div>
      </section>

      <section className="container-site section-y grid gap-6 md:grid-cols-2">
        <Image src={chairWhite} alt="The HIFET chair on its base" sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-md" />
        <Image src={room} alt="The HIFET chair in a treatment room at the clinic" sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-md" />
      </section>

      <BookCta />
    </>
  );
}