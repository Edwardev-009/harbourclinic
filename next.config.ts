import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Brochure site: classic static generation. All routes are known at build time
  // (generateStaticParams), booking data is fetched client-side from /api/public.
  cacheComponents: false,
  partialPrefetching: false,
  poweredByHeader: false,
  // We handle trailing slashes ourselves (below) so old WordPress URLs like /about-us/ redirect in ONE hop.
  skipTrailingSlashRedirect: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // 301-equivalent (Next uses 308 for permanent, which Google treats the same).
    // Old WordPress URLs -> new clean URLs. Trailing-slash variants are normalised by Next.
    return [
      // `{/}?` matches with and without a trailing slash, so there is only ever one hop.
      { source: "/about-us{/}?", destination: "/about", permanent: true },
      { source: "/contact-us{/}?", destination: "/contact", permanent: true },
      { source: "/our-doctors{/}?", destination: "/doctors", permanent: true },
      { source: "/privacy{/}?", destination: "/privacy-policy", permanent: true },
      // TODO: add any other old URLs found in Google Search Console / old sitemap
      // Everything else: strip a trailing slash (canonical URLs have none).
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
