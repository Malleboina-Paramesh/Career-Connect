/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@local/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "c8.alamy.com",
      },
      {
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
