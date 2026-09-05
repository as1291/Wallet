/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui", "@repo/db", "@repo/store"],
};

export default nextConfig;
