/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = {
  experimental: {
    appDir: false, // Ensure it's not using the experimental app directory if unnecessary.
  },
  output: 'standalone',
};

