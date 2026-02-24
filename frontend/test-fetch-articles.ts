import { fetchAPI } from './lib/api.js';

async function testFetch() {
    try {
        const res = await fetchAPI('/articles', {
            filters: { domain: "localhost" },
            populate: "*"
        });
        console.log("Found articles:", res.data?.length);
        console.dir(res.data?.[0], { depth: 2 });
    } catch (e) {
        console.error(e);
    }
}

testFetch();
