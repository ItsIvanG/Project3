import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["proj3files.s3.ap-southeast-1.amazonaws.com"], // Allow AWS S3 images
  },
};

export default nextConfig;
