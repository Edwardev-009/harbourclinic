import Image from "next/image";
import Link from "next/link";

/**
 * Clinic logo. To change it, replace the file  public/logo.png  (transparent or white background,
 * wide format, ~600px wide is plenty). If your file has a different name or type (logo.svg, logo.webp),
 * change LOGO_SRC below. If it looks too big/small, change the `h-11` (header) / `h-10` (footer) class.
 *
 * In the dark footer the logo sits on a white rounded card, the same way it does in the doctor dashboard.
 */
const LOGO_SRC = "/logo.png";
const LOGO_W = 220; // real pixel size of the file (width / height) is used for the aspect ratio hint only
const LOGO_H = 62;

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Harbour Medical Clinic, home">
      <span className={inverted ? "rounded-md bg-white px-3 py-2" : ""}>
        <Image
          src={LOGO_SRC}
          alt="Harbour Medical Clinic"
          width={LOGO_W}
          height={LOGO_H}
          priority={!inverted}
          className={inverted ? "h-13 w-auto" : "h-15 w-auto"}
        />
      </span>
    </Link>
  );
}