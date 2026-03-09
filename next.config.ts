import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lbewkytedkfbflrmucre.supabase.co',
      },
    ],
  },
};

export default nextConfig;
