/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      serverComponentsExternalPackages: ['playwright', 'playwright-core'],
    },
};

export default nextConfig;
