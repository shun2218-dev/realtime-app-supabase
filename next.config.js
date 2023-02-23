/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: false,
    removeConsole: {
      exclude: ['error'],
    },
  },
}

module.exports = nextConfig
