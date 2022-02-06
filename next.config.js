/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://Mohamed_Safwan:pass2word@cluster0.kiwnv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
