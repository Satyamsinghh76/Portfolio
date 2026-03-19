/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shake Three.js — only bundle what's actually imported
  transpilePackages: ["three"],

  experimental: {
    // Barrel-file optimization: import only what's used from large packages
    optimizePackageImports: [
      "framer-motion",
      "@react-three/drei",
    ],
  },

  // Security + cache headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
