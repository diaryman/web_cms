(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/my_cms/frontend/components/CustomCursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CustomCursor() {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Smooth trailing effect
    const cursorX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(0, {
        damping: 20,
        stiffness: 250
    });
    const cursorY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(0, {
        damping: 20,
        stiffness: 250
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomCursor.useEffect": ()=>{
            setMounted(true);
            const moveCursor = {
                "CustomCursor.useEffect.moveCursor": (e)=>{
                    cursorX.set(e.clientX - 16);
                    cursorY.set(e.clientY - 16);
                }
            }["CustomCursor.useEffect.moveCursor"];
            window.addEventListener("mousemove", moveCursor);
            return ({
                "CustomCursor.useEffect": ()=>window.removeEventListener("mousemove", moveCursor)
            })["CustomCursor.useEffect"];
        }
    }["CustomCursor.useEffect"], [
        cursorX,
        cursorY
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] hidden lg:block",
        style: {
            x: cursorX,
            y: cursorY
        }
    }, void 0, false, {
        fileName: "[project]/Desktop/my_cms/frontend/components/CustomCursor.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_s(CustomCursor, "jdeDW5RdD3kSrDo/wSySaWYlJRM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = CustomCursor;
var _c;
__turbopack_context__.k.register(_c, "CustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/my_cms/frontend/components/BackToTop.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackToTop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function BackToTop() {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackToTop.useEffect": ()=>{
            const toggleVisibility = {
                "BackToTop.useEffect.toggleVisibility": ()=>{
                    if (window.scrollY > 500) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                }
            }["BackToTop.useEffect.toggleVisibility"];
            window.addEventListener("scroll", toggleVisibility);
            return ({
                "BackToTop.useEffect": ()=>window.removeEventListener("scroll", toggleVisibility)
            })["BackToTop.useEffect"];
        }
    }["BackToTop.useEffect"], []);
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            initial: {
                opacity: 0,
                scale: 0.8,
                y: 20
            },
            animate: {
                opacity: 1,
                scale: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                scale: 0.8,
                y: 20
            },
            onClick: scrollToTop,
            className: "fixed bottom-24 right-6 z-[90] p-4 bg-primary rounded-2xl shadow-premium hover:bg-accent transition-all active:scale-95 group",
            style: {
                color: 'var(--primary-foreground)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                size: 24,
                className: "group-hover:-translate-y-1 transition-transform"
            }, void 0, false, {
                fileName: "[project]/Desktop/my_cms/frontend/components/BackToTop.tsx",
                lineNumber: 41,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/my_cms/frontend/components/BackToTop.tsx",
            lineNumber: 33,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/my_cms/frontend/components/BackToTop.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
_s(BackToTop, "J3yJOyGdBT4L7hs1p1XQYVGMdrY=");
_c = BackToTop;
var _c;
__turbopack_context__.k.register(_c, "BackToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/my_cms/frontend/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STRAPI_URL",
    ()=>STRAPI_URL,
    "fetchAPI",
    ()=>fetchAPI,
    "getStrapiMedia",
    ()=>getStrapiMedia,
    "getStrapiURL",
    ()=>getStrapiURL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const STRAPI_URL = ("TURBOPACK compile-time value", "http://127.0.0.1:1337") || "http://127.0.0.1:1337";
function getStrapiURL(path = "") {
    return `${STRAPI_URL}${path}`;
}
function getStrapiMedia(url) {
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
async function fetchAPI(path, urlParamsObject = {}, options = {}) {
    const qs = __turbopack_context__.r("[project]/Desktop/my_cms/frontend/node_modules/qs/lib/index.js [app-client] (ecmascript)");
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.STRAPI_API_TOKEN ? {
                Authorization: `Bearer ${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.STRAPI_API_TOKEN}`
            } : {}
        },
        ...options
    };
    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
        encodeValuesOnly: true
    });
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;
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
    } catch (error) {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Simple markdown renderer (bold, links, lists, code)
function RenderMarkdown({ text }) {
    const lines = text.split("\n");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1 text-sm leading-relaxed",
        children: lines.map((line, i)=>{
            if (line.startsWith("# ")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-black text-base",
                children: line.slice(2)
            }, i, false, {
                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                lineNumber: 32,
                columnNumber: 51
            }, this);
            if (line.startsWith("## ")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-bold",
                children: line.slice(3)
            }, i, false, {
                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                lineNumber: 33,
                columnNumber: 52
            }, this);
            if (line.startsWith("- ") || line.startsWith("• ")) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 37,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: formatInline(line.slice(2))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 38,
                            columnNumber: 29
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                    lineNumber: 36,
                    columnNumber: 25
                }, this);
            }
            if (line.trim() === "") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1"
            }, i, false, {
                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                lineNumber: 42,
                columnNumber: 48
            }, this);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: formatInline(line)
            }, i, false, {
                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                lineNumber: 43,
                columnNumber: 24
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
_c = RenderMarkdown;
function formatInline(text) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i)=>{
        if (part.startsWith("**") && part.endsWith("**")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            className: "font-black",
            children: part.slice(2, -2)
        }, i, false, {
            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
            lineNumber: 53,
            columnNumber: 20
        }, this);
        if (part.startsWith("`") && part.endsWith("`")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
            className: "px-1.5 py-0.5 rounded-md bg-white/20 font-mono text-xs",
            children: part.slice(1, -1)
        }, i, false, {
            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
            lineNumber: 55,
            columnNumber: 20
        }, this);
        return part;
    });
}
// ตัด <think>...</think> block ที่โมเดล reasoning ใช้คิดก่อนตอบ
function stripThinkBlocks(text) {
    // ตัด block ที่ปิดสมบูรณ์
    let result = text.replace(/<think>[\s\S]*?<\/think>\n?/g, "");
    // ตัด block ที่ยังไม่ปิด (กำลัง streaming อยู่)
    result = result.replace(/<think>[\s\S]*/g, "");
    return result.trimStart();
}
function CopyButton({ text }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopy = async ()=>{
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleCopy,
        className: "p-1.5 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100",
        children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
            size: 12,
            className: "text-emerald-400"
        }, void 0, false, {
            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
            lineNumber: 78,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
            size: 12,
            className: "text-white/40"
        }, void 0, false, {
            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
            lineNumber: 78,
            columnNumber: 74
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_s(CopyButton, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c1 = CopyButton;
function ChatWidget({ domainOverride }) {
    _s1();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize with defaults to prevent widget from disappearing while loading
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isEnabled: true,
        botName: "AI Assistant",
        welcomeMessage: "สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ?",
        suggestedQuestions: []
    });
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showScrollDown, setShowScrollDown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const domain = domainOverride || (("TURBOPACK compile-time truthy", 1) ? window.location.port === "3004" ? "pdpa.localhost" : window.location.port === "3002" ? "localhost" : window.location.hostname : "TURBOPACK unreachable");
    // Fetch config
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": ()=>{
            const fetchConfig = {
                "ChatWidget.useEffect.fetchConfig": async ()=>{
                    console.log("🤖 ChatBot fetching config for domain:", domain);
                    try {
                        // ใช้ fetchAPI เพื่อให้ใช้ STRAPI_URL และ Headers ที่ถูกต้องเสมอ
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])(`/chatbot-configs`, {
                            filters: {
                                domain: {
                                    $eq: domain
                                }
                            }
                        });
                        console.log(`🤖 ChatBot config received for ${domain}:`, data.data?.length ? "Found" : "Not Found");
                        if (data.data && data.data.length > 0) {
                            const cfg = data.data[0];
                            setConfig(cfg);
                            if (cfg.isEnabled && messages.length === 0) {
                                setMessages([
                                    {
                                        id: "welcome",
                                        role: "assistant",
                                        content: cfg.welcomeMessage || "สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ?"
                                    }
                                ]);
                            }
                        } else {
                            console.warn(`No chatbot config found for domain: ${domain}`);
                            // ถ้าหาไม่เจอ ให้ลองหาแบบ default 'localhost'
                            if (domain !== "localhost") {
                                const fallback = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAPI"])(`/chatbot-configs`, {
                                    filters: {
                                        domain: {
                                            $eq: "localhost"
                                        }
                                    }
                                });
                                if (fallback.data && fallback.data.length > 0) {
                                    console.log("🤖 ChatBot fallback to 'localhost' succeeded");
                                    setConfig(fallback.data[0]);
                                }
                            }
                        }
                    } catch (err) {
                        console.error("ChatWidget config fetch failed:", err);
                    }
                }
            }["ChatWidget.useEffect.fetchConfig"];
            fetchConfig();
        }
    }["ChatWidget.useEffect"], [
        domain
    ]);
    // Auto-scroll to bottom
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWidget.useCallback[scrollToBottom]": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatWidget.useCallback[scrollToBottom]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": ()=>{
            if (isOpen) scrollToBottom();
        }
    }["ChatWidget.useEffect"], [
        messages,
        isOpen,
        scrollToBottom
    ]);
    // Scroll indicator
    const handleScroll = ()=>{
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        setShowScrollDown(scrollHeight - scrollTop - clientHeight > 60);
    };
    // Focus input when chat opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWidget.useEffect": ()=>{
            if (isOpen) setTimeout({
                "ChatWidget.useEffect": ()=>inputRef.current?.focus()
            }["ChatWidget.useEffect"], 300);
        }
    }["ChatWidget.useEffect"], [
        isOpen
    ]);
    const generateId = ()=>Math.random().toString(36).slice(2);
    const sendMessage = async (userMsg)=>{
        if (!userMsg.trim() || isLoading) return;
        const userMessage = {
            id: generateId(),
            role: "user",
            content: userMsg.trim()
        };
        const assistantId = generateId();
        const assistantPlaceholder = {
            id: assistantId,
            role: "assistant",
            content: "",
            isStreaming: true
        };
        const updatedMessages = [
            ...messages,
            userMessage
        ];
        setMessages([
            ...updatedMessages,
            assistantPlaceholder
        ]);
        setInputValue("");
        setIsLoading(true);
        scrollToBottom();
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.filter((m)=>!m.isStreaming).map((m)=>({
                            role: m.role,
                            content: m.content
                        })),
                    domain
                })
            });
            if (!res.ok) throw new Error("Server error");
            // Handle streaming
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";
            if (reader) {
                while(true){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, {
                        stream: true
                    });
                    const lines = chunk.split("\n");
                    for (const line of lines){
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);
                            if (data === "[DONE]") break;
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.text) {
                                    accumulated += parsed.text;
                                    setMessages((prev)=>prev.map((m)=>m.id === assistantId ? {
                                                ...m,
                                                content: accumulated,
                                                isStreaming: true
                                            } : m));
                                }
                            } catch  {}
                        }
                    }
                }
            }
            // Mark streaming done
            setMessages((prev)=>prev.map((m)=>m.id === assistantId ? {
                        ...m,
                        content: accumulated || "ขออภัยครับ ไม่สามารถรับคำตอบได้",
                        isStreaming: false
                    } : m));
        } catch (err) {
            setMessages((prev)=>prev.map((m)=>m.id === assistantId ? {
                        ...m,
                        content: "ขออภัยครับ ระบบขัดข้องชั่วคราว กรุณาลองใหม่ภายหลังครับ 🙏",
                        isStreaming: false
                    } : m));
        } finally{
            setIsLoading(false);
            setTimeout(scrollToBottom, 100);
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        sendMessage(inputValue);
    };
    const handleReset = ()=>{
        setMessages([
            {
                id: generateId(),
                role: "assistant",
                content: config?.welcomeMessage || "สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ?"
            }
        ]);
    };
    const chatWidth = isExpanded ? "w-[480px]" : "w-[380px]";
    const chatHeight = isExpanded ? "h-[680px]" : "h-[550px]";
    const suggestedQs = config?.suggestedQuestions || [];
    const showSuggestions = messages.length <= 1 && suggestedQs.length > 0;
    // Only hide if explicitly disabled by config
    if (config?.isEnabled === false) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-6 z-[10001] font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 24,
                        scale: 0.94
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        y: 24,
                        scale: 0.94
                    },
                    transition: {
                        type: "spring",
                        damping: 26,
                        stiffness: 320
                    },
                    className: `bg-white ${chatWidth} ${chatHeight} rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4 transition-all duration-300`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-primary px-5 py-4 text-white flex justify-between items-center relative overflow-hidden flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 281,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 282,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 bg-white/15 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                size: 20,
                                                className: "text-accent"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 285,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                            lineNumber: 284,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-sm tracking-tight",
                                                    children: config?.botName || "AI Assistant"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5 mt-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-white/60 font-medium uppercase tracking-widest",
                                                            children: "Online"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                            lineNumber: 287,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 283,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleReset,
                                            title: "เริ่มการสนทนาใหม่",
                                            className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 297,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                            lineNumber: 296,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsExpanded(!isExpanded),
                                            className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white",
                                            children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 300,
                                                columnNumber: 51
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 300,
                                                columnNumber: 77
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                            lineNumber: 299,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsOpen(false),
                                            className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 303,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                            lineNumber: 302,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 295,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 280,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: scrollContainerRef,
                            onScroll: handleScroll,
                            className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/40",
                            children: [
                                messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                                        children: [
                                            msg.role === "assistant" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    size: 14,
                                                    className: "text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 317,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `group max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `p-3.5 rounded-2xl shadow-sm relative ${msg.role === "user" ? "bg-primary text-white rounded-tr-sm" : "bg-white text-primary border border-gray-50 rounded-tl-sm"}`,
                                                    children: [
                                                        msg.role === "assistant" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RenderMarkdown, {
                                                            text: stripThinkBlocks(msg.content) || (msg.isStreaming ? "..." : "")
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 49
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm leading-relaxed",
                                                            children: msg.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 49
                                                        }, this),
                                                        msg.isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex gap-0.5 ml-1 align-middle",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-1 h-1 bg-current rounded-full animate-bounce opacity-60",
                                                                    style: {
                                                                        animationDelay: "0ms"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                                    lineNumber: 333,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-1 h-1 bg-current rounded-full animate-bounce opacity-60",
                                                                    style: {
                                                                        animationDelay: "150ms"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                                    lineNumber: 334,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-1 h-1 bg-current rounded-full animate-bounce opacity-60",
                                                                    style: {
                                                                        animationDelay: "300ms"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                                    lineNumber: 335,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 49
                                                        }, this),
                                                        msg.role === "assistant" && !msg.isStreaming && msg.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -bottom-6 right-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyButton, {
                                                                text: stripThinkBlocks(msg.content)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 321,
                                                columnNumber: 37
                                            }, this),
                                            msg.role === "user" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    size: 14,
                                                    className: "text-accent"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 346,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, msg.id, true, {
                                        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                        lineNumber: 315,
                                        columnNumber: 33
                                    }, this)),
                                showSuggestions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-2 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1",
                                            children: "คำถามที่พบบ่อย"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                            lineNumber: 356,
                                            columnNumber: 37
                                        }, this),
                                        suggestedQs.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -10
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: i * 0.08
                                                },
                                                onClick: ()=>sendMessage(q),
                                                className: "w-full text-left px-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-medium text-primary hover:border-accent/30 hover:bg-accent/5 transition-all shadow-sm hover:shadow-md",
                                                children: q
                                            }, i, false, {
                                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                                lineNumber: 358,
                                                columnNumber: 41
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 355,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: messagesEndRef
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 372,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 309,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: showScrollDown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                initial: {
                                    opacity: 0,
                                    y: 4
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: 4
                                },
                                onClick: scrollToBottom,
                                className: "absolute bottom-20 right-6 w-8 h-8 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 385,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                lineNumber: 378,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 376,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "p-3 bg-white border-t border-gray-50 flex gap-2 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: inputRef,
                                    type: "text",
                                    value: inputValue,
                                    onChange: (e)=>setInputValue(e.target.value),
                                    placeholder: "พิมพ์คำถามที่นี่...",
                                    disabled: isLoading,
                                    className: "flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium outline-none border border-transparent focus:border-primary/20 disabled:opacity-60"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 392,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isLoading || !inputValue.trim(),
                                    className: "w-11 h-11 bg-primary text-white flex items-center justify-center rounded-xl hover:bg-accent transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:shadow-none active:scale-95 flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                        lineNumber: 406,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                    lineNumber: 401,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 391,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                    lineNumber: 272,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                lineNumber: 270,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: ()=>setIsOpen(!isOpen),
                whileHover: {
                    scale: 1.08
                },
                whileTap: {
                    scale: 0.94
                },
                className: `w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors relative ${isOpen ? "border-2 border-gray-100" : ""}`,
                style: {
                    backgroundColor: isOpen ? '#ffffff' : 'var(--primary-color)',
                    color: isOpen ? 'var(--primary-color)' : 'var(--primary-foreground)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                rotate: -90,
                                opacity: 0
                            },
                            animate: {
                                rotate: 0,
                                opacity: 1
                            },
                            exit: {
                                rotate: 90,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.15
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                lineNumber: 427,
                                columnNumber: 29
                            }, this)
                        }, "close", false, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 426,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                rotate: 90,
                                opacity: 0
                            },
                            animate: {
                                rotate: 0,
                                opacity: 1
                            },
                            exit: {
                                rotate: -90,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.15
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                lineNumber: 431,
                                columnNumber: 29
                            }, this)
                        }, "open", false, {
                            fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                            lineNumber: 430,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                        lineNumber: 424,
                        columnNumber: 17
                    }, this),
                    !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60",
                                style: {
                                    backgroundColor: 'var(--accent-color)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                lineNumber: 439,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative inline-flex rounded-full h-3.5 w-3.5",
                                style: {
                                    backgroundColor: 'var(--accent-color)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                                lineNumber: 440,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                        lineNumber: 438,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
                lineNumber: 414,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/my_cms/frontend/components/ChatWidget.tsx",
        lineNumber: 269,
        columnNumber: 9
    }, this);
}
_s1(ChatWidget, "+odKjvbjodMjd3qOUDzqgd7JJ3w=");
_c2 = ChatWidget;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RenderMarkdown");
__turbopack_context__.k.register(_c1, "CopyButton");
__turbopack_context__.k.register(_c2, "ChatWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/my_cms/frontend/components/SiteThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyThemeColors",
    ()=>applyThemeColors,
    "default",
    ()=>SiteThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my_cms/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/* ── Helpers ────────────────────────────────────────────────────────────── */ function hexToRGB(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}
function lighten(hex, amount) {
    const h = hex.replace("#", "");
    const r = Math.round(parseInt(h.substring(0, 2), 16) + (255 - parseInt(h.substring(0, 2), 16)) * amount);
    const g = Math.round(parseInt(h.substring(2, 4), 16) + (255 - parseInt(h.substring(2, 4), 16)) * amount);
    const b = Math.round(parseInt(h.substring(4, 6), 16) + (255 - parseInt(h.substring(4, 6), 16)) * amount);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function darken(hex, amount) {
    const h = hex.replace("#", "");
    const r = Math.round(parseInt(h.substring(0, 2), 16) * (1 - amount));
    const g = Math.round(parseInt(h.substring(2, 4), 16) * (1 - amount));
    const b = Math.round(parseInt(h.substring(4, 6), 16) * (1 - amount));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function applyThemeColors(primary, accent) {
    const root = document.documentElement;
    const accentRGB = hexToRGB(accent);
    const primaryRGB = hexToRGB(primary);
    root.style.setProperty("--primary-color", primary);
    root.style.setProperty("--accent-color", accent);
    root.style.setProperty("--accent-dark", darken(accent, 0.2));
    root.style.setProperty("--accent-light", lighten(accent, 0.3));
    root.style.setProperty("--accent-subtle", `rgba(${accentRGB}, 0.06)`);
    root.style.setProperty("--accent-glow", `rgba(${accentRGB}, 0.14)`);
    root.style.setProperty("--hero-gradient-from", darken(primary, 0.1));
    root.style.setProperty("--hero-gradient-to", lighten(primary, 0.08));
    root.style.setProperty("--badge-bg", `rgba(${accentRGB}, 0.08)`);
    root.style.setProperty("--badge-text", accent);
    root.style.setProperty("--glass-border", `rgba(${primaryRGB}, 0.08)`);
    root.style.setProperty("--premium-shadow", `0 25px 60px -12px rgba(${primaryRGB}, 0.18), 0 0 40px -10px rgba(${accentRGB}, 0.08)`);
    root.style.setProperty("--shadow-glow", `0 0 40px -10px rgba(${accentRGB}, 0.5)`);
}
function SiteThemeProvider({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteThemeProvider.useEffect": ()=>{
            const port = window.location.port;
            const siteParam = searchParams.get("site");
            const isAdminPage = pathname.startsWith("/admin");
            const isPDPA = pathname.startsWith("/pdpa") || port === "3004" || isAdminPage && siteParam === "pdpa";
            // Update data-theme attribute for CSS layer
            document.documentElement.setAttribute("data-theme", isPDPA ? "pdpa" : "datagov");
            const targetDomain = isPDPA ? "pdpa.localhost" : "localhost";
            /** Fetch and apply theme colours from the API */ const fetchTheme = {
                "SiteThemeProvider.useEffect.fetchTheme": async ()=>{
                    try {
                        const { fetchAPI } = await __turbopack_context__.A("[project]/Desktop/my_cms/frontend/lib/api.ts [app-client] (ecmascript, async loader)");
                        const res = await fetchAPI("/site-configs", {
                            filters: {
                                domain: targetDomain
                            }
                        });
                        if (res.data && res.data.length > 0) {
                            const config = res.data[0];
                            const colors = config.themeColors;
                            if (colors?.primary && colors?.accent) {
                                applyThemeColors(colors.primary, colors.accent);
                            }
                        }
                    } catch (err) {
                        console.error("Theme fetch failed:", err);
                    }
                }
            }["SiteThemeProvider.useEffect.fetchTheme"];
            // Initial load
            fetchTheme();
            // ── Re-fetch when user switches back to this tab ──────────────────
            // This covers the case where admin saved a new theme in another tab.
            const handleVisibilityChange = {
                "SiteThemeProvider.useEffect.handleVisibilityChange": ()=>{
                    if (document.visibilityState === "visible") {
                        fetchTheme();
                    }
                }
            }["SiteThemeProvider.useEffect.handleVisibilityChange"];
            document.addEventListener("visibilitychange", handleVisibilityChange);
            // ── Re-fetch on same-page theme-updated custom event ─────────────
            // Admin page dispatches this after a successful save when both tabs
            // are on the same origin.
            const handleThemeUpdated = {
                "SiteThemeProvider.useEffect.handleThemeUpdated": (e)=>{
                    const detail = e.detail;
                    if (detail?.primary && detail?.accent) {
                        applyThemeColors(detail.primary, detail.accent);
                    } else {
                        fetchTheme();
                    }
                }
            }["SiteThemeProvider.useEffect.handleThemeUpdated"];
            window.addEventListener("theme-updated", handleThemeUpdated);
            return ({
                "SiteThemeProvider.useEffect": ()=>{
                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                    window.removeEventListener("theme-updated", handleThemeUpdated);
                }
            })["SiteThemeProvider.useEffect"];
        // Re-run when site param changes (admin switching DataGOV ↔ PDPA)
        }
    }["SiteThemeProvider.useEffect"], [
        pathname,
        searchParams
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(SiteThemeProvider, "h6p6PpCFmP4Mu5bIMduBzSZThBE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my_cms$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SiteThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "SiteThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_my_cms_frontend_a542a905._.js.map