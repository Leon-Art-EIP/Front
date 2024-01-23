const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: ["localhost", "front-dev.leonart-dev.ovh", "front-dev.leonart-dev", "front-dev", "leonart-dev"],
  },
};

module.exports = nextConfig;
