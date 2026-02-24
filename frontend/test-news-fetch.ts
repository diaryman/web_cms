import { fetchAPI } from './lib/api.js';

async function testNewsFetch() {
    try {
        const filters: any = { domain: "pdpa.localhost" };
        const articlesRes = await fetchAPI("/articles", {
            sort: ["publishedAt:desc"],
            pagination: { page: 1, pageSize: 9 },
            populate: "*",
            filters: filters
        });
        console.log("News fetch returned:", articlesRes.data?.length, "articles.");
        articlesRes.data?.forEach(a => {
            console.log("Title:", a.title);
            console.log("Content type:", typeof a.content);
            console.log("Content sample:", JSON.stringify(a.content).substring(0, 100));
        });
    } catch (e) {
        console.error(e);
    }
}

testNewsFetch();
