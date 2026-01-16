/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // השתקת הודעות build
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
}

module.exports = nextConfig