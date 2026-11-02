import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ServiceBanner, CheckList, BookCta } from "./ServiceBanner";
import walking from "@/assets/services/gait-walking.webp";
import pressure from "@/assets/services/gait-pressure-map.webp";
import overpronation from "@/assets/services/cond-overpronation.webp";
import achilles from "@/assets/services/cond-achilles.webp";
import morton from "@/assets/services/cond-mortons-neuroma.webp";
import plantar from "@/assets/services/cond-plantar-fasciitis.webp";
import patellofemoral from "@/assets/services/cond-patellofemoral.webp";
import shin from "@/assets/services/cond-shin-splints.webp";
import hallux from "@/assets/services/cond-hallux-valgus.webp";
import itb from "@/assets/services/cond-itb.webp";

// TODO (client): upload the manual PDF to /public/downloads/ and set this path. Left empty so no dead link is shown.
const MANUAL_PDF: string | null = null;

const highlights = ["Detailed foot and gait analysis", "Accurate pressure mapping", "Personalised treatment planning"];
const measures = ["Weight distribution across your feet", "Pressure applied during every step", "Walking pattern (gait cycle)", "Left and right foot comparison"];

const clinics = [
  { name: "General Practice", slug: "general-practice", items: ["General medical consultations", "Thyroid clinic", "Preventive health care", "Chronic disease management"] },
  { name: "Pain Clinic & Joint Injections", slug: "pain-clinic-joint-injections", items: ["Pain management procedures", "Joint injections", "Musculoskeletal pain treatment"] },
  { name: "Sports Injury Clinic", slug: "sports-injury-clinic", items: ["Sports injury assessment", "Injury treatment", "Intra-articular joint injections", "Rehabilitation programmes"] },
  { name: "Women's Health", slug: "womens-health", items: ["Antenatal care", "Cervical smear screening", "Contraception advice", "Implanon insertion and removal", "HRT (hormone replacement therapy)"] },
  { name: "Minor Surgical Procedures", slug: "minor-surgical-procedures", items: ["Wound management", "Stitching and dressing", "Skin lesion removal", "Lumps and bumps excision", "Incision and drainage of abscess"] },
  { name: "Digital Gait Scan", slug: "digital-gait-scan", items: ["Feet", "Ankles", "Knees", "Hips", "Lower back"] },
];

const conditions: { name: string; text: string; img: StaticImageData }[] = [
  { name: "Over-pronated feet", text: "Abnormal inward rolling of the foot, causing pain and discomfort.", img: overpronation },
  { name: "Achilles tendinosis", text: "Inflammation of the calf muscle tendon.", img: achilles },
  { name: "Morton's neuroma", text: "Thickening of the tissue between the bones.", img: morton },
  { name: "Plantar fasciitis", text: "Pain at the heel on the sole of the foot.", img: plantar },
  { name: "Patellofemoral pain syndrome", text: "Pain at the kneecap.", img: patellofemoral },
  { name: "Shin splints", text: "Pain at the front and inside of the shin.", img: shin },
  { name: "Hallux valgus", text: "Pain at the big toe, or bunions.", img: hallux },
  { name: "Iliotibial band syndrome", text: "Pain along the outside of the thigh.", img: itb },
];

export function GaitScanPage() {
  return (
    <>
      <ServiceBanner title="Digital Gait Scan" name="Digital Gait Scan" image={walking} />

      <section className="container-site section-y grid items-center gap-10 md:grid-cols-2">
        <Image src={walking} alt="Bare feet walking across a pressure plate that maps each step" priority sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-md" />
        <div>
          <h2 className="text-4xl">Gait Scan</h2>
          <p className="mt-4 text-lg text-muted-foreground">Understand your feet. Improve your movement. Relieve your pain.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">A quick, non-invasive digital assessment that analyses how you stand and walk, and how that affects your whole body.</p>
          <CheckList items={highlights} className="mt-6 text-sm" />
          {MANUAL_PDF && <a href={MANUAL_PDF} className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">Gait Scan manual (PDF)</a>}
        </div>
      </section>

      <section className="container-site pb-16 md:pb-24 grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl">What is a gait scan?</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">A digital gait scan is a computerised assessment that measures how your feet interact with the ground while standing and walking.</p>
          <p className="mt-4 text-muted-foreground">It accurately measures:</p>
          <CheckList items={measures} className="mt-4 text-sm" />
          {MANUAL_PDF && <a href={MANUAL_PDF} className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">Gait Scan manual (PDF)</a>}
        </div>
        <Image src={pressure} alt="Pressure map of both feet, from low pressure (blue) to high pressure (red)" sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-md" />
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-site section-y">
          <h2 className="text-center text-4xl">Our services</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {clinics.map((c) => (
              <div key={c.slug} className="rounded-md bg-card p-6 text-foreground">
                <h3 className="text-xl"><Link href={`/services/${c.slug}`} className="link-underline">{c.name}</Link></h3>
                <CheckList items={c.items} className="mt-4 text-sm text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent">
        <div className="container-site section-y">
          <h2 className="mx-auto max-w-2xl text-center text-4xl">It may be helpful for these conditions</h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {conditions.map((c) => (
              <li key={c.name}>
                <Image src={c.img} alt="" width={c.img.width} height={c.img.height} className="h-24 w-auto" />
                <h3 className="mt-4 text-xl leading-snug">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookCta />
    </>
  );
}