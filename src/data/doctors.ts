import type { StaticImageData } from "next/image";
import azhar from "@/assets/doctors/dr-azhar.webp";
import aslam from "@/assets/doctors/dr-aslam.webp";
// TODO: confirm these portraits are the doctors' own photos (or licensed images) before launch.

export type Doctor = {
  slug: string;
  name: string;
  shortName: string;
  qualifications: string[];
  interests: string[];
  bio: string;
  /** Real portrait (static import). Null until the client supplies one: a neutral initials panel is shown. */
  image: StaticImageData | null;
};

export const doctors: Doctor[] = [
  {
    slug: "mohammad-azhar",
    name: "Dr Mohammad Azhar",
    shortName: "Dr Azhar",
    qualifications: ["FRCS (UK)", "M Med SE (Ireland)", "MSc EMS (Ireland)", "PhD Interventional Pain Management (France)", "MFSEM (RCSI & RCPI)"],
    interests: ["General Practice", "Sports Medicine", "Interventional Pain Procedures", "General Surgery", "Pain Management", "Rehabilitation Medicine"],
    // TODO: replace with a bio written/approved by Dr Azhar. Keep it to facts he confirms.
    bio: "Dr Azhar trained in surgery before moving into sports and exercise medicine and interventional pain management. He sees patients for general practice, sports injuries, joint pain and long-standing pain.",
    image: azhar,
  },
  {
    slug: "saima-aslam",
    name: "Dr Saima Aslam",
    shortName: "Dr Aslam",
    qualifications: ["MBBS", "MICGP (Ireland)", "MRCOG (UK)", "Specialist in Women's Health, DOWH (Ireland)"],
    interests: ["General Practice", "General Surgery", "Sports Medicine", "Pain Management", "Interventional Pain Procedures", "Rehabilitation Medicine"],
    // TODO: replace with a bio written/approved by Dr Aslam.
    bio: "Dr Aslam is a GP with membership of the Royal College of Obstetricians and Gynaecologists and a specialist qualification in women's health. She sees patients for women's health, general practice and pain management.",
    image: aslam,
  },
];