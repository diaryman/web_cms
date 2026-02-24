import { fetchAPI } from './lib/api.js';

async function testFetchConfig() {
    try {
        const res = await fetchAPI('/site-configs', {
            filters: { domain: "localhost" },
            populate: "*"
        });
        console.log("Config:", JSON.stringify(res.data?.[0], null, 2));
    } catch (e) {
        console.error(e);
    }
}

testFetchConfig();
