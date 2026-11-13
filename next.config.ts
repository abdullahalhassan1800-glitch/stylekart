import type { NextConfig } from "next";

const isStaticExport = Boolean(process.env.BASE_PATH);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  output: isStaticExport ? "export" : undefined,
  basePath: isStaticExport ? process.env.BASE_PATH : undefined,
  trailingSlash: isStaticExport,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
