/** @type {import('next').NextConfig} */
const nextConfig = {
  // Running in server (SSR) mode. Removing `output: 'export'` lets Next.js
  // build dynamic routes and API/middleware that the app uses.
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
