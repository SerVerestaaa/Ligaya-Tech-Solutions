/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  /** Subpath deploys only: e.g. `NEXT_PUBLIC_BASE_PATH=/my-repo` so `/_next/...` resolves. */
  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // CRITICAL: This generates the 'out' folder
  images: {
    unoptimized: true, // Necessary for static export
  },
};

export default nextConfig;
export default nextConfig
