import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: `https://api.vercel.app/:path*`,
            },
        ];
    },
    // reactStrictMode: false,

};

export default nextConfig;
