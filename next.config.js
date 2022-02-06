/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://Mohamed_Safwan:zmn7tjLZGRXPtRa@cluster0.kiwnv.mongodb.net/cloud_storage?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
