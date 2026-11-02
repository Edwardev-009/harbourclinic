/**
 * Time zone rules: the backend stores UTC; the website always DISPLAYS Europe/Dublin
 * (GMT in winter, IST in summer). Never format slot times with the visitor's local zone.
 */
export const CLINIC_TZ = "Europe/Dublin";

const partsFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: CLINIC_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/** Offset (ms) of Europe/Dublin from UTC at a given instant. */
function dublinOffsetMs(utcMs: number): number {
  const p = Object.fromEntries(partsFmt.formatToParts(new Date(utcMs)).map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year!, +p.month! - 1, +p.day!, +p.hour!, +p.minute!, +p.second!);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/** Convert a Dublin wall-clock time ("2026-10-26", "09:20") to a UTC ISO string. */
export function dublinWallToUtcIso(date: string, time: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y!, m! - 1, d!, hh!, mm!);
  let utc = guess - dublinOffsetMs(guess);
  utc = guess - dublinOffsetMs(utc); // second pass handles DST boundaries
  return new Date(utc).toISOString();
}

const timeFmt = new Intl.DateTimeFormat("en-IE", { timeZone: CLINIC_TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const dayFmt = new Intl.DateTimeFormat("en-IE", { timeZone: CLINIC_TZ, weekday: "long", day: "numeric", month: "long" });

export const formatDublinTime = (iso: string) => timeFmt.format(new Date(iso));
export const formatDublinDay = (iso: string) => dayFmt.format(new Date(iso));
