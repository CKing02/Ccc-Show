import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // 允许局域网手机访问 dev server(Next.js 15 默认拦截跨 origin)
  allowedDevOrigins: ["192.168.31.159", "localhost", "127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "user-images.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
  },
  experimental: {},
  // output: "standalone", // Windows 路径含中文+空格时 spawn 失败，部署时按需开启
};

export default nextConfig;
