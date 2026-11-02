"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, fieldClass, EMAIL_RE, PHONE_RE } from "@/components/form";
import { sendContactMessage, bookingMode } from "@/lib/booking";
import { site } from "@/data/site";

type Errors = Partial<Record<"name" | "phone" | "email" | "message" | "consent" | "send", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Errors = {};
    if (!v.name?.trim()) errs.name = "Please enter your name.";
    if (!PHONE_RE.test(v.phone ?? "")) errs.phone = "Please enter a phone number we can call.";
    if (!EMAIL_RE.test(v.email ?? "")) errs.email = "Please enter a valid email address.";
    if (!v.message?.trim()) errs.message = "Please tell us how we can help.";
    if (!v.consent) errs.consent = "Please confirm we can use your details to reply.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      await sendContactMessage({ name: v.name!, phone: v.phone!, email: v.email!, message: v.message! });
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ send: `Sorry, that did not send. Please call ${site.phone} or email ${site.email}.` });
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-md border bg-card p-8">
        <h3 className="text-3xl">Thank you.</h3>
        <p className="mt-3 text-muted-foreground">
          {bookingMode === "demo"
            ? "Demo mode: this message was not sent. "
            : "We have your message and will reply as soon as we can. "}
          For anything urgent, call {site.phone}.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field label="Name" name="name" error={errors.name} autoComplete="name" className="sm:col-span-2" />
      <Field label="Phone" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
      <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : "message-hint"}
          className={fieldClass}
        />
        {errors.message && <p id="message-err" className="mt-2 text-sm text-destructive">{errors.message}</p>}
        <p id="message-hint" className="mt-2 text-xs text-muted-foreground">Please do not include detailed medical information. This form is not for emergencies; call 112 or 999.</p>
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-0.5 size-5 shrink-0 accent-primary" aria-invalid={!!errors.consent} />
          <span>I agree that Harbour Medical Clinic can use these details to reply to me, as described in the <Link href="/privacy-policy" className="link-underline text-link">privacy policy</Link>.</span>
        </label>
        {errors.consent && <p className="mt-2 text-sm text-destructive">{errors.consent}</p>}
      </div>
      <div className="sm:col-span-2">
        {errors.send && <p role="alert" className="mb-4 text-sm text-destructive">{errors.send}</p>}
        <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</Button>
      </div>
    </form>
  );
}
