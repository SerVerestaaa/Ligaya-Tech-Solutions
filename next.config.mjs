/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['three'],
  
  images: {
    unoptimized: true,
  },

  // Subpath logic
  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
};

export default nextConfig;
