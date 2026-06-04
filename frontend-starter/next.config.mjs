/** @type {import('next').NextConfig} */
const nextConfig = {
  // Muster A (n8n-Webhook) braucht keine Rewrites — das Frontend ruft den Webhook direkt.
  // Für Muster B (FastAPI-Proxy) hier einkommentieren:
  // async rewrites() {
  //   const backend = process.env.BACKEND_URL || "http://127.0.0.1:8080";
  //   return [{ source: "/api/:path*", destination: `${backend}/:path*` }];
  // },
};

export default nextConfig;
