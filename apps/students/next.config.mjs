/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@local/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "c8.alamy.com",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
