/**
 * Booking data layer. The site only ever talks to the public API namespace
 * (`/api/public`) of the doctor dashboard. Until that API exists, DEMO mode returns
 * mock data and nothing is saved.
 *
 * TODO: align paths / payloads with the real /api/public implementation when it is built.
 *   GET  {base}/slots?service=<slug>&doctor=<slug|any>&date=YYYY-MM-DD
 *        -> { slots: [{ start: ISO-UTC, doctorSlug: string, available: boolean }] }
 *   POST {base}/appointments  body: BookingRequest
 *        -> { reference: string }
 *   (cancel via secure token link: {site}/cancel?token=...)
 */
import { dublinWallToUtcIso } from "@/lib/time";

export type Slot = { start: string; doctorSlug: string; available: boolean };

export type BookingRequest = {
  serviceSlug: string;
  doctorSlug: string | "any";
  /** UTC ISO start of the chosen slot, exactly as returned by the slots endpoint. */
  start: string;
  name: string;
  phone: string;
  email: string;
  patientType: "new" | "existing";
  /** Short optional reason. No medical history is collected. */
  reason?: string;
  consent: true;
};

export const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
/** "live" when an API URL is configured, otherwise "demo". */
export const bookingMode: "live" | "demo" = API_BASE ? "live" : "demo";

export async function getSlots(params: { service: string; doctor: string; date: string }): Promise<Slot[]> {
  if (bookingMode === "live") {
    const qs = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/slots?${qs}`, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error("Could not load times");
    return ((await res.json()) as { slots: Slot[] }).slots;
  }
  return mockSlots(params.date, params.doctor);
}

export async function createAppointment(req: BookingRequest): Promise<{ reference: string }> {
  if (bookingMode === "live") {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
    });
    if (res.status === 409) throw new BookingConflictError();
    if (!res.ok) throw new Error("Could not create appointment");
    return (await res.json()) as { reference: string };
  }
  await new Promise((r) => setTimeout(r, 400));
  return { reference: "DEMO-" + Math.random().toString(36).slice(2, 7).toUpperCase() };
}

/** Slot was taken between selection and submit (unique index on the backend). */
export class BookingConflictError extends Error {
  constructor() {
    super("That time has just been taken");
  }
}

export async function sendContactMessage(msg: { name: string; phone: string; email: string; message: string }): Promise<void> {
  if (API_BASE) {
    // TODO: confirm contact endpoint. Do not log message bodies server-side (GDPR).
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(msg),
    });
    if (!res.ok) throw new Error("Could not send message");
    return;
  }
  await new Promise((r) => setTimeout(r, 400)); // demo: nothing is sent
}

/** DEMO ONLY: weekdays 09:00-16:40 in 20-minute slots, some deterministically "booked". */
function mockSlots(date: string, doctor: string): Slot[] {
  const [y, m, d] = date.split("-").map(Number);
  const day = new Date(Date.UTC(y!, m! - 1, d!)).getUTCDay();
  if (day === 0 || day === 6) return [];
  const seed = d! * 7 + doctor.length;
  const out: Slot[] = [];
  for (let min = 9 * 60; min < 17 * 60; min += 20) {
    if (min >= 13 * 60 && min < 14 * 60) continue;
    const time = `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
    out.push({
      start: dublinWallToUtcIso(date, time),
      doctorSlug: doctor === "any" ? "mohammad-azhar" : doctor,
      available: (min / 20 + seed) % 3 !== 0,
    });
  }
  return out;
}
