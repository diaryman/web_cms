import { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3002";
    const isPDPA = host.includes("3004") || host.includes("pdpa");
    const baseUrl = `http://${host}`;

    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/",
                    "/news/",
                    "/documents/",
                    "/contact",
                    "/privacy-policy",
                    "/cookie-policy",
                    "/terms-of-use",
                    ...(isPDPA ? ["/pdpa/"] : []),
                ],
                disallow: [
                    "/admin/",
                    "/api/",
                    "/_next/",
                    "/action/",
                ],
            },
            {
                // Block AI training crawlers (becoming best practice)
                userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "ClaudeBot"],
                disallow: ["/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
