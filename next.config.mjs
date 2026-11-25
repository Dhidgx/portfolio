/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site builds to plain HTML in /out,
  // which Vercel (or any static host) can serve.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
