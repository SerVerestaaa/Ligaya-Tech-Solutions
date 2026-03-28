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

export default nextConfig
