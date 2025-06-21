import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    /* config options here */
    webpack(config, options) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },

    async headers() {
        return [{
            source: "/(.*)",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value: [
                        "default-src 'self'",
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' localhost:3000",
                        "style-src 'self' 'unsafe-inline'",
                        "img-src * data: blob:",
                        // "img-src 'self' data: localhost:9000",
                        "connect-src 'self' localhost:3000", // Next.js APIや開発サーバーのみ
                        "font-src 'self'",
                        "object-src 'none'"
                    ].join("; "),
                },
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                    key: "X-Frame-Options",
                    value: "SAMEORIGIN",
                },
                {
                    key: "Referrer-Policy",
                    value: "strict-origin-when-cross-origin",
                },
            ],
        }]
    }
};

export default nextConfig;
