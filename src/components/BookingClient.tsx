"use client";

import { useSearchParams } from "next/navigation";
import { BookingFlow } from "@/components/BookingFlow";
import type { ComponentProps } from "react";

/** Reads ?service= / ?doctor= on the client so /book itself stays statically rendered. */
export function BookingClient(props: Pick<ComponentProps<typeof BookingFlow>, "services" | "doctors">) {
  const sp = useSearchParams();
  return <BookingFlow {...props} initialService={sp.get("service") ?? undefined} initialDoctor={sp.get("doctor") ?? undefined} />;
}
