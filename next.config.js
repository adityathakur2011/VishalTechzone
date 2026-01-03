/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // 🔥 REQUIRED for GitHub Pages
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
