module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/Desktop/my_cms/frontend/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/cdc43_1ef1271e._.js",
  "chunks/[root-of-the-server]__2be7849e._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/Desktop/my_cms/frontend/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];