import qs from "qs";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export function getStrapiURL(path = "") {
    return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${STRAPI_URL}${url}`;
}

export async function fetchAPI(
    path: string,
    urlParamsObject = {},
    options: RequestInit & { revalidate?: number | false } = {}
) {
    const { revalidate = 60, ...fetchOptions } = options;

    const mergedOptions: RequestInit = {
        headers: {
            "Content-Type": "application/json",
            ...(process.env.STRAPI_API_TOKEN ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } : {}),
        },
        // Enable ISR caching for Server Components; client-side fetch ignores this
        next: revalidate === false ? { revalidate: 0 } : { revalidate },
        ...fetchOptions,
    };


    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
        encodeValuesOnly: true, // prettify URL
    });
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    try {
        const response = await fetch(requestUrl, mergedOptions);

        // Handle response
        if (!response.ok) {
            console.error(`API Error (${response.status}): ${response.statusText} at ${requestUrl}`);
            const errorText = await response.text();
            console.error(`Error details: ${errorText}`);
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error(`Fetch failed for URL: ${requestUrl}`);
        console.error(`Error name: ${error.name}, Message: ${error.message}`);
        // If it's our thrown custom error, re-throw it instead of hiding it
        if (error.message.startsWith("API returned ")) {
            throw error;
        }
        // Re-throw with more context
        throw new Error(`Fetch failed for ${requestUrl}. Is Strapi running? Details: ${error.message}`);
    }
}
