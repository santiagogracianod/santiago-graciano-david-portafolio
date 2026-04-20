import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      } as import("next/dist/shared/lib/image-config").RemotePattern,
    ],
  },
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
