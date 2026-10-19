import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.build.json',
  },
  experimental: {
    typedEnv: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
