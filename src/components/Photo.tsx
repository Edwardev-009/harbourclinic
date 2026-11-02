import Image, { type StaticImageData } from "next/image";
import { SHOW_PHOTOS } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Placeholder photograph. In production (HAS_REAL_PHOTOS=false) it renders a quiet tinted
 * panel instead, so no stock/sample picture is presented as the real clinic.
 * TODO: once real photos are supplied, drop the SHOW_PLACEHOLDERS check for those images.
 */
export function Photo({ src, alt, className, priority = false, sizes }: { src: StaticImageData; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  if (!SHOW_PHOTOS) return <div aria-hidden="true" className={cn("bg-muted", className)} />;
  return <Image src={src} alt={alt} priority={priority} sizes={sizes} placeholder="blur" className={cn("object-cover", className)} />;
}