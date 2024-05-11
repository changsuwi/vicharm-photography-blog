/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'],
    deviceSizes: [320, 375, 420, 475, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}
