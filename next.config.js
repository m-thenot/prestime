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
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

module.exports = nextConfig;
