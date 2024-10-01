/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "githubusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
