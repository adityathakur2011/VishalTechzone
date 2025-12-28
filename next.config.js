/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: [],
  },
  trailingSlash: true,
};

module.exports = nextConfig;

