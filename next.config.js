const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: [
      "localhost",
      "front-dev.leonart-dev.ovh",
      "front-dev.leonart-dev",
      "front-dev",
      "leonart-dev",
      "back-dev.leonart-dev.ovh",
      "back-dev.leonart-dev",
      "back-dev",
      "https://back-dev.leonart-dev.ovh/api/uploads",
      "https://back-dev.leonart-dev.ovh",
      "https://back-dev.leonart-dev",
      "https://back-dev",
      "https://front-dev.leonart-dev.ovh",
      "https://front-dev.leonart-dev",
      "https://front-dev",
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
