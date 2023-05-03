/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.pinata.cloud", "ipfs.io", "ipfs.filebase.io"],
  },
  webpack: (config, { isServer }) => {
    config.resolve.extensions.push(".mjs");
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};
