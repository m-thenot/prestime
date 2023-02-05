/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vntdjmqkmksxybhxvyha.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
