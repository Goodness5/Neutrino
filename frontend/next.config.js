/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.pinata.cloud", "ipfs.io", "ipfs.filebase.io"],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "gateway.pinata.cloud",
  //       port: "",
  //       pathname: "*",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
