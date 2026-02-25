import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::article.article');

// Normalize: Strapi's createCoreRouter().routes can be array or function
const baseRoutes: any[] = (() => {
    const r = defaultRouter.routes;
    if (Array.isArray(r)) return r;
    if (typeof r === 'function') return (r as () => any[])();
    return [];
})();

export default {
    ...defaultRouter,
    routes: [
        // Custom: increment view count (public, no auth required)
        {
            method: 'POST',
            path: '/articles/:documentId/view',
            handler: 'api::article.article.incrementView',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
        ...baseRoutes,
    ],
};