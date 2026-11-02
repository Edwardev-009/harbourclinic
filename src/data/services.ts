import type { StaticImageData } from "next/image";
import consultation from "@/assets/hero-clinic.webp";
import physio from "@/assets/physio.jpg";

export type Service = {
  slug: string;
  name: string;
  /** Used for the meta description and list pages. */
  summary: string;
  intro: string;
  /** Placeholder photo (only rendered when SHOW_PLACEHOLDERS). Null = text-led layout. */
  image: StaticImageData | null;
  imageAlt: string;
  treats: string[];
  procedures: string[];
  /** Only real, clinician-approved Q&A. Section is hidden when empty. */
  faqs: { q: string; a: string }[];
  doctorSlugs: string[];
};

/*
 * TODO (client + clinicians): every list below is DRAFT copy taken from the old site and the brief.
 * Each clinic page must be reviewed by Dr Azhar / Dr Aslam before launch. Also confirm which
 * doctor(s) run each clinic (doctorSlugs). Do not add claims (waiting times, outcomes, prices,
 * "years of experience") that the clinic has not confirmed.
 */
export const services: Service[] = [
  {
    slug: "general-practice",
    name: "General Practice",
    summary: "Everyday GP care for adults and children, from check-ups to ongoing conditions.",
    intro: "General practice care at Harbour Road, Kilcock, with both doctors.",
    image: consultation,
    imageAlt: "A consultation room with desk, chairs and examination couch",
    treats: ["Coughs, colds and infections", "Blood pressure and cholesterol", "Diabetes reviews", "Skin concerns", "Children's health", "Medicals and certificates"],
    procedures: ["Full consultation", "Blood tests", "ECG", "Vaccinations", "Referrals and letters"],
    faqs: [],
    doctorSlugs: ["mohammad-azhar", "saima-aslam"],
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    summary: "Antenatal care, smear tests, contraception, Implanon and HRT with a doctor trained in women's health.",
    intro: "Women's health care led by Dr Saima Aslam, who holds MRCOG and a specialist qualification in women's health.",
    image: null,
    imageAlt: "",
    treats: ["Pregnancy and antenatal care", "Menopause symptoms", "Period problems", "Contraception choices"],
    procedures: ["Antenatal care", "Cervical smear tests", "Contraception advice", "Implanon insertion and removal", "HRT management"],
    faqs: [],
    doctorSlugs: ["saima-aslam"],
  },
  {
    slug: "thyroid-function-clinic",
    name: "Thyroid Function Clinic",
    summary: "Testing, diagnosis and long-term management of under- and overactive thyroid.",
    intro: "Testing and follow-up for thyroid symptoms such as tiredness and weight changes.",
    image: null,
    imageAlt: "",
    treats: ["Underactive thyroid", "Overactive thyroid", "Thyroid nodules (referral)", "Thyroid in pregnancy"],
    procedures: ["Thyroid blood tests", "Medication review", "Ongoing monitoring"],
    faqs: [],
    doctorSlugs: ["saima-aslam", "mohammad-azhar"],
  },
  {
    slug: "sports-injury-clinic",
    name: "Sports Injury Clinic",
    summary: "Assessment and treatment for sprains, strains and overuse injuries.",
    intro: "For club players, runners and anyone who wants to get back to moving properly. Dr Azhar holds postgraduate qualifications in sports and exercise medicine.",
    image: physio,
    imageAlt: "A physiotherapist assessing a patient's knee",
    treats: ["Ankle and knee sprains", "Hamstring and calf strains", "Tendon problems", "Shoulder injuries", "Running injuries"],
    procedures: ["Sports medicine assessment", "Return-to-play planning", "Referral for imaging", "Rehabilitation plan"],
    faqs: [
      {
        q: "Should I come in straight after an injury?",
        a: "If you cannot put weight on the injury or the pain is severe, go to an emergency department or call 112 or 999. For other injuries, book an appointment.",
      },
    ],
    doctorSlugs: ["mohammad-azhar", "saima-aslam"],
  },
  {
    slug: "pain-clinic-joint-injections",
    name: "Pain Clinic & Joint Injections",
    summary: "Interventional pain procedures and joint injections for persistent pain.",
    intro: "Specialist care for persistent pain. Dr Azhar holds a PhD in interventional pain management.",
    image: null,
    imageAlt: "",
    treats: ["Knee and hip arthritis", "Frozen shoulder", "Back and neck pain", "Tennis and golfer's elbow"],
    procedures: ["Joint injections", "Soft tissue injections", "Interventional pain procedures", "Pain management planning"],
    faqs: [],
    doctorSlugs: ["mohammad-azhar", "saima-aslam"],
  },
  {
    slug: "minor-surgical-procedures",
    name: "Minor Surgical Procedures",
    summary: "Removal of skin lesions, cysts and moles under local anaesthetic.",
    intro: "Minor surgical procedures carried out in the clinic under local anaesthetic.",
    image: null,
    imageAlt: "",
    treats: ["Cysts and lipomas", "Moles and skin tags", "Ingrown toenails", "Abscesses"],
    procedures: ["Excision under local anaesthetic", "Wound review", "Suture removal", "Histology referral"],
    faqs: [],
    doctorSlugs: ["mohammad-azhar", "saima-aslam"],
  },
  {
    slug: "physiotherapy-rehabilitation",
    name: "Physiotherapy & Rehabilitation",
    summary: "Treatment and exercise plans after injury, surgery or long-term pain.",
    intro: "Rehabilitation planned alongside your doctor, after injury, surgery or long-term pain.",
    image: physio,
    imageAlt: "A physiotherapist assessing a patient's knee",
    treats: ["Back and neck pain", "Post-surgery recovery", "Sports injuries", "Mobility after illness"],
    procedures: ["Assessment", "Manual therapy", "Exercise programmes", "Rehabilitation medicine review"],
    faqs: [],
    doctorSlugs: ["mohammad-azhar", "saima-aslam"],
  },
  {
    slug: "digital-gait-scan",
    name: "Digital Gait Scan",
    summary: "A digital scan of how you walk and run, to help find the cause of foot, knee or hip pain.",
    intro: "A scan that shows how pressure moves through your feet as you walk.",
    image: null,
    imageAlt: "",
    treats: ["Heel and arch pain", "Knee pain when running", "Shin splints", "Hip and lower back strain"],
    procedures: ["Pressure plate scan", "Walking and running analysis", "Results explained on screen", "Footwear and orthotic advice"],
    faqs: [],
    doctorSlugs: ["mohammad-azhar", "saima-aslam"], // TODO: confirm who runs this clinic
  },
  {
    slug: "hifet-pelvic-floor-therapy-chair",
    name: "HIFET Pelvic Floor Therapy Chair",
    summary: "Non-invasive pelvic floor strengthening using the HIFEM-based HIFET chair, for women and men.",
    intro: "Pelvic floor muscle strengthening using the HIFET chair. You stay clothed and seated.",
    image: null,
    imageAlt: "",
    treats: ["Stress incontinence", "Pelvic floor weakness after childbirth", "Weakness after menopause"],
    procedures: ["Initial assessment", "HIFEM chair sessions", "Progress review"],
    faqs: [],
    doctorSlugs: ["saima-aslam", "mohammad-azhar"], // TODO: confirm who runs this clinic
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);