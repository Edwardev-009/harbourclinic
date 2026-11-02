"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { format, startOfToday } from "date-fns";
import { Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Field, fieldClass, EMAIL_RE, PHONE_RE } from "@/components/form";
import { BookingConflictError, bookingMode, createAppointment, getSlots, type Slot } from "@/lib/booking";
import { formatDublinDay, formatDublinTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

type ServiceOpt = { slug: string; name: string; doctorSlugs: string[] };
type DoctorOpt = { slug: string; name: string; qualifications: string[] };
type ErrorKey = "step" | "name" | "phone" | "email" | "patientType" | "consent" | "submit";

const steps = ["Service", "Doctor", "Date & time", "Your details"];

export function BookingFlow({
  services, doctors, initialService, initialDoctor,
}: { services: ServiceOpt[]; doctors: DoctorOpt[]; initialService?: string | undefined; initialDoctor?: string | undefined }) {
  const validService = services.some((s) => s.slug === initialService) ? initialService! : "";
  const validDoctor = doctors.some((d) => d.slug === initialDoctor) ? initialDoctor! : "";

  const [step, setStep] = useState(validService ? (validDoctor ? 2 : 1) : 0);
  const [service, setService] = useState(validService);
  const [doctor, setDoctor] = useState(validDoctor);
  const [date, setDate] = useState<Date | undefined>();
  const [slotResult, setSlotResult] = useState<{ key: string; slots: Slot[]; error: boolean } | null>(null);
  const [pickedSlot, setSlot] = useState<Slot | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [done, setDone] = useState<{ reference: string; slot: Slot } | null>(null);
  const [sending, setSending] = useState(false);
  const headingEl = useRef<HTMLElement | null>(null);
  const headingRef = (el: HTMLElement | null) => { headingEl.current = el; };
  const firstRender = useRef(true);

  const svc = services.find((s) => s.slug === service);
  const docOptions = svc ? doctors.filter((d) => svc.doctorSlugs.includes(d.slug)) : doctors;
  const doctorName = (slug: string) => doctors.find((d) => d.slug === slug)?.name ?? "your doctor";

  // Move focus to the step heading for keyboard / screen-reader users.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; } // don't steal focus on page load
    headingEl.current?.focus();
  }, [step, done]);

  // Load slots whenever the day, doctor or service changes. Stale responses are ignored.
  const slotKey = date && service && doctor ? `${service}|${doctor}|${format(date, "yyyy-MM-dd")}|${refresh}` : null;
  useEffect(() => {
    if (!slotKey) return;
    let cancelled = false;
    const [svcSlug, docSlug, day] = slotKey.split("|") as [string, string, string];
    getSlots({ service: svcSlug, doctor: docSlug, date: day })
      .then((slots) => { if (!cancelled) setSlotResult({ key: slotKey, slots, error: false }); })
      .catch(() => { if (!cancelled) setSlotResult({ key: slotKey, slots: [], error: true }); });
    return () => { cancelled = true; };
  }, [slotKey]);

  const current = slotResult && slotResult.key === slotKey ? slotResult : null;
  const slots = current ? current.slots : null; // null = loading
  const slotsError = current?.error ?? false;
  // A picked time only counts while it is still offered (and free) for the current service/doctor/day.
  const slot = pickedSlot && slots?.some((s) => s.start === pickedSlot.start && s.available) ? pickedSlot : null;

  function next() {
    const e: Partial<Record<ErrorKey, string>> = {};
    if (step === 0 && !service) e.step = "Please choose a service.";
    if (step === 1 && !doctor) e.step = "Please choose a doctor, or first available.";
    if (step === 2 && (!date || !slot)) e.step = "Please pick a date and a time.";
    setErrors(e);
    if (!Object.keys(e).length) setStep((s) => s + 1);
  }

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const v = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    const e: Partial<Record<ErrorKey, string>> = {};
    if (!v.name?.trim()) e.name = "Please enter your full name.";
    if (!PHONE_RE.test(v.phone ?? "")) e.phone = "Please enter a phone number we can reach you on.";
    if (!EMAIL_RE.test(v.email ?? "")) e.email = "Please enter a valid email address.";
    if (!v.patientType) e.patientType = "Please tell us if you are a new or existing patient.";
    if (!v.consent) e.consent = "Please agree so we can process your booking.";
    setErrors(e);
    if (Object.keys(e).length || !slot) return;

    setSending(true);
    try {
      const res = await createAppointment({
        serviceSlug: service,
        doctorSlug: slot.doctorSlug, // concrete doctor, even if the patient chose "first available"
        start: slot.start,
        name: v.name!.trim(),
        phone: v.phone!,
        email: v.email!,
        patientType: v.patientType as "new" | "existing",
        ...(v.reason?.trim() ? { reason: v.reason.trim() } : {}),
        consent: true,
      });
      setDone({ reference: res.reference, slot });
    } catch (err) {
      if (err instanceof BookingConflictError) {
        // Someone else took the slot (backend unique index). Send the patient back to pick another.
        setStep(2);
        setSlot(null);
        setRefresh((r) => r + 1); // re-fetch the day's slots
        setErrors({ step: "Sorry, that time has just been taken. Please choose another." });
      } else {
        setErrors({ submit: `Sorry, we could not complete your booking. Please try again or call ${site.phone}.` });
      }
    } finally {
      setSending(false);
    }
  }

  if (done) {
    const demo = bookingMode === "demo";
    return (
      <section className="container-site section-y">
        <div className="max-w-2xl">
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary" aria-hidden="true"><Check strokeWidth={1.5} /></span>
          <h1 ref={headingRef} tabIndex={-1} className="mt-8 text-5xl outline-none md:text-6xl">{demo ? "Demo booking complete." : "You're booked in."}</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {svc?.name} with {doctorName(done.slot.doctorSlug)} on {formatDublinDay(done.slot.start)} at {formatDublinTime(done.slot.start)}.
          </p>
          <p className="mt-2 text-lg">Reference <strong className="font-semibold tabular-nums">{done.reference}</strong></p>
          <p className="mt-6 text-sm text-muted-foreground">
            {demo
              ? "This is a preview: nothing has been saved or emailed."
              : "A confirmation will be sent to your email address."}
          </p>
          <Button asChild variant="outline" className="mt-10"><Link href="/">Back to home</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-site pt-12 pb-24 md:pt-20">
      <p className="eyebrow">Book online</p>
      <h1 className="mt-5 text-5xl md:text-6xl">Book an appointment</h1>
      {bookingMode === "demo" && (
        <p role="note" className="mt-6 max-w-xl rounded-md border border-dashed border-primary/40 bg-tint px-4 py-3 text-sm">
          Preview mode: times shown are sample data and nothing is saved.
        </p>
      )}

      <ol className="mt-10 grid grid-cols-4 gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-0.5", i <= step ? "bg-primary" : "bg-border")} />
            <span className={cn("mt-3 block text-xs sm:text-sm", i === step ? "font-medium text-foreground" : "text-muted-foreground")}>
              <span className="tabular-nums">{i + 1}.</span> <span className="hidden sm:inline">{s}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-12 max-w-3xl">
        {step === 0 && (
          <fieldset>
            <legend ref={headingRef} tabIndex={-1} className="font-serif text-3xl outline-none">Which service do you need?</legend>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <Choice
                  key={s.slug}
                  selected={service === s.slug}
                  title={s.name}
                  onClick={() => {
                    setService(s.slug);
                    if (doctor && doctor !== "any" && !s.doctorSlugs.includes(doctor)) setDoctor("");
                  }}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend ref={headingRef} tabIndex={-1} className="font-serif text-3xl outline-none">Who would you like to see?</legend>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Choice selected={doctor === "any"} onClick={() => setDoctor("any")} title="First available" sub="Earliest appointment with either doctor" />
              {docOptions.map((d) => (
                <Choice key={d.slug} selected={doctor === d.slug} onClick={() => setDoctor(d.slug)} title={d.name} sub={d.qualifications.slice(0, 2).join(" · ")} />
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-3xl outline-none">Pick a date and time</h2>
            <p className="mt-2 text-sm text-muted-foreground">Times are shown in Irish time.</p>
            <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: startOfToday() }}
                className="self-start rounded-md border bg-card p-3"
              />
              <div aria-live="polite">
                {!date && <p className="text-muted-foreground">Choose a day to see available times.</p>}
                {date && !slots && <p className="text-muted-foreground">Loading times…</p>}
                {date && slots && slotsError && <p className="text-destructive">Sorry, we could not load times. Please try again or call {site.phone}.</p>}
                {date && slots && !slotsError && slots.length === 0 && <p className="text-muted-foreground">No times available on this day. Please try another day.</p>}
                {date && slots && slots.length > 0 && (
                  <>
                    <p className="eyebrow">{formatDublinDay(slots[0]!.start)}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {slots.map((s) => {
                        const t = formatDublinTime(s.start);
                        const selected = slot?.start === s.start;
                        return (
                          <button
                            key={s.start}
                            type="button"
                            disabled={!s.available}
                            onClick={() => setSlot(s)}
                            aria-pressed={selected}
                            aria-label={`${t}${s.available ? "" : ", booked"}`}
                            className={cn(
                              "h-12 rounded-md border text-sm tabular-nums transition-colors",
                              selected ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
                              !s.available && "cursor-not-allowed bg-muted text-muted-foreground/60 line-through hover:border-border",
                            )}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && slot && (
          <form id="details" noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
            <h2 ref={headingRef} tabIndex={-1} className="text-3xl outline-none sm:col-span-2">Your details</h2>
            <p className="text-muted-foreground sm:col-span-2">
              {svc?.name} · {doctorName(slot.doctorSlug)} · {formatDublinDay(slot.start)} at {formatDublinTime(slot.start)}
            </p>
            <Field name="name" label="Full name" error={errors.name} className="sm:col-span-2" autoComplete="name" />
            <Field name="phone" label="Phone" type="tel" error={errors.phone} autoComplete="tel" />
            <Field name="email" label="Email" type="email" error={errors.email} autoComplete="email" />
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">Have you been to the clinic before?</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {[["new", "New patient"], ["existing", "Existing patient"]].map(([v, l]) => (
                  <label key={v} className="flex h-12 cursor-pointer items-center gap-3 rounded-md border bg-card px-4 has-[:checked]:border-primary">
                    <input type="radio" name="patientType" value={v} className="size-4 accent-primary" />{l}
                  </label>
                ))}
              </div>
              {errors.patientType && <p className="mt-2 text-sm text-destructive">{errors.patientType}</p>}
            </fieldset>
            <div className="sm:col-span-2">
              <label htmlFor="reason" className="text-sm font-medium">Reason for visit <span className="text-muted-foreground">(optional)</span></label>
              <textarea id="reason" name="reason" rows={3} maxLength={300} aria-describedby="reason-hint" className={fieldClass} />
              <p id="reason-hint" className="mt-2 text-xs text-muted-foreground">A few words are enough. Please do not enter medical history or test results.</p>
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" name="consent" className="mt-0.5 size-5 shrink-0 accent-primary" aria-invalid={!!errors.consent} />
                <span>I agree to Harbour Medical Clinic processing my details to manage this appointment, as set out in the <Link href="/privacy-policy" className="link-underline text-link">privacy policy</Link>.</span>
              </label>
              {errors.consent && <p className="mt-2 text-sm text-destructive">{errors.consent}</p>}
            </div>
            {errors.submit && <p role="alert" className="text-sm text-destructive sm:col-span-2">{errors.submit}</p>}
          </form>
        )}

        {errors.step && <p role="alert" className="mt-6 text-destructive">{errors.step}</p>}

        <div className="mt-12 flex items-center justify-between border-t pt-6">
          {step > 0 ? <Button variant="link" onClick={() => { setErrors({}); setStep((s) => s - 1); }}>Back</Button> : <span />}
          {step < 3
            ? <Button size="lg" onClick={next}>Continue</Button>
            : <Button size="lg" type="submit" form="details" disabled={sending}>{sending ? "Booking…" : "Confirm booking"}</Button>}
        </div>
      </div>
    </section>
  );
}

function Choice({ selected, onClick, title, sub }: { selected: boolean; onClick: () => void; title: string; sub?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn("min-h-16 rounded-md border bg-card px-5 py-4 text-left transition-colors hover:border-primary", selected && "border-primary ring-1 ring-primary")}
    >
      <span className="block font-medium">{title}</span>
      {sub && <span className="mt-1 block text-sm text-muted-foreground">{sub}</span>}
    </button>
  );
}
