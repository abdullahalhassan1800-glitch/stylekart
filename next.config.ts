import type { NextConfig } from "next";

const BASE_PATH = process.env.BASE_PATH ?? "";
const isStaticExport = Boolean(BASE_PATH);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  output: isStaticExport ? "export" : undefined,
  basePath: isStaticExport ? BASE_PATH : undefined,
  trailingSlash: isStaticExport,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
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
