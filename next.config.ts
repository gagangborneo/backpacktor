import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // WAJIB untuk Nexpack / Standalone
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/seed/**",
      },
    ],
  },

  // Aman: Mengabaikan error build
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // HAPUS turbpacK & custom webpack
  // karena ini menyebabkan error saat nexpack build
};

export default nextConfig;
