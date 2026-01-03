/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: [],
  },
  trailingSlash: true,
};

module.exports = nextConfig;

