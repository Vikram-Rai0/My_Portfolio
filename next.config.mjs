
import path from "path";
import { fileURLToPath } from "url";

/** @type {import("next").NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      // Project screenshots uploaded from the admin dashboard (Vercel Blob).
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },

  poweredByHeader: false,
};

export default nextConfig;
