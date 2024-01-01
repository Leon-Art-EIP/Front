const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
