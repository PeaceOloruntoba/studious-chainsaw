const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ]
  },
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
