/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: `output: 'export'` forces a fully static export which requires
  // generateStaticParams for all dynamic routes. Removing it allows Next.js
  // to build dynamic routes (server/runtime) and avoids export-only restrictions.
  // If you need GitHub Pages static export, re-enable this and ensure
  // generateStaticParams() is implemented for dynamic routes.
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
