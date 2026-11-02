import type { StaticImageData } from "next/image";
import hero from "@/assets/hero-clinic.webp";
import reception from "@/assets/reception.webp";
import physio from "@/assets/physio.jpg";
import harbour from "@/assets/harbour.jpg";
import consultationPhoto from "@/assets/hero-consultation.webp";

/*
 * TODO (client): confirm every answer below before launch.
 * Fees, cancellation policy and same-day availability are unknown, so the answers
 * send people to the phone instead of inventing policy.
 */
export const faqs = [
  {
    q: "How much does an appointment cost?",
    a: "Fees depend on the service. Please call us on 089 417 1096 or email info@harbourclinic.ie for current prices.", // TODO: list real fees
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Bring photo ID, a list of any medicines you take, and any recent letters or results from other doctors or hospitals.", // TODO: confirm
  },
  {
    q: "Can I get a same-day appointment?",
    a: "Please call the clinic on 089 417 1096 and we will tell you what is available.", // TODO: confirm policy
  },
  {
    q: "How do I register as a new patient?",
    a: "Book online or by phone and choose “New patient”. The clinic will tell you what to complete before or at your first visit.", // TODO: confirm registration process
  },
  {
    q: "What if I need to cancel or change my appointment?",
    a: "Please let us know as early as you can by phone or email so the time can be offered to someone else.", // TODO: confirm cancellation policy
  },
  {
    q: "Do you accept medical cards?",
    a: "Harbour Medical Clinic is a private practice. If you hold a medical card or GP visit card, please call us before booking.", // TODO: client to confirm
  },
];

/** Sample testimonials: NEVER shown in production (see SHOW_PLACEHOLDERS). Replace with real, consented feedback. */
export const placeholderTestimonials = [
  { quote: "I had a wonderful experience at Harbour Clinic. The team was incredibly professional and welcoming. Everything was explained clearly, and I felt completely at ease throughout my treatment. Highly recommend their services!", author: "Aoife Murphy" },
  { quote: "Harbour Clinic exceeded my expectations. The staff were friendly, the clinic was spotless, and the care I received was excellent. I noticed great results much quicker than I expected. Truly outstanding service!", author: "Conor O’Sullivan" },
  { quote: "I can’t recommend Harbour Clinic enough. From the moment I walked in, I felt valued and cared for. The team took the time to listen to my concerns and provided a treatment plan that worked perfectly for me. Fantastic experience!", author: "Siobhan Kelly" },
  { quote: "Harbour Clinic is a gem! The staff are knowledgeable and compassionate, and the clinic is equipped with the latest technology. I felt confident in the care I received and would not hesitate to return for future treatments.", author: "Liam Byrne" },
  { quote: "I was impressed by the professionalism and dedication of the team at Harbour Clinic. They made me feel comfortable and supported throughout my visit. The results were excellent, and I am grateful for their expertise.", author: "Niamh O’Connor" },
];

/** Placeholder photos: replace with photographs of the actual clinic. Only shown when SHOW_PLACEHOLDERS. */
export const gallery: { src: StaticImageData; alt: string; caption: string }[] = [
  { src: reception, alt: "A waiting area with armchairs and a wooden reception desk", caption: "Reception" },
  { src: hero, alt: "A consultation room with desk, chairs and examination couch beside a large window", caption: "Consultation room" },
  { src: physio, alt: "A physiotherapist assessing a patient's knee", caption: "Treatment room" },
  { src: harbour, alt: "Boats moored at the harbour in Kilcock beside a stone bridge", caption: "Kilcock harbour" },
];

export { consultationPhoto as homeHeroImage, harbour as harbourImage, reception as receptionImage, hero as heroImage };