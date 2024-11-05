const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: [
      "localhost",
      "leon-arts.fr",
      "front-dev.leonart-dev.ovh",
      "front-dev.leonart-dev",
      "front-dev",
      "leonart-dev",
      "back.leon-arts.fr",
      "back-dev.leonart-dev.ovh",
      "back-dev.leonart-dev",
      "back-dev",
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
