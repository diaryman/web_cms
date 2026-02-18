// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      const seed = require('./scripts/seed').default;
      await seed();
    } catch (e) {
      console.error('Bootstrap seeding error:', e);
    }

    // Subscribe to lifecycles for Audit Logging
    const trackedModels = [
      'api::article.article',
      'api::policy-document.policy-document',
      'api::site-config.site-config',
      'api::timeline.timeline',
      'api::feature.feature',
      'api::service.service',
      'api::policy.policy'
    ];

    strapi.db.lifecycles.subscribe({
      models: trackedModels,
      async afterCreate(event) {
        const { result, model } = event;
        await strapi.service('api::audit-log.audit-log').create({
          data: {
            action: 'CREATE',
            contentType: model.singularName,
            entityId: result.id.toString(),
            entityTitle: result.title || result.name || result.domain || 'Unnamed Entry',
            domain: result.domain || 'N/A',
            userEmail: 'admin@system.local', // Placeholder as we're using generic API in this demo
            details: result
          }
        });
      },
      async afterUpdate(event) {
        const { result, model } = event;
        await strapi.service('api::audit-log.audit-log').create({
          data: {
            action: 'UPDATE',
            contentType: model.singularName,
            entityId: result.id.toString(),
            entityTitle: result.title || result.name || result.domain || 'Unnamed Entry',
            domain: result.domain || 'N/A',
            userEmail: 'admin@system.local',
            details: result
          }
        });
      },
      async afterDelete(event) {
        const { result, model } = event;
        // In some Strapi versions, result might be the deleted item or its ID
        await strapi.service('api::audit-log.audit-log').create({
          data: {
            action: 'DELETE',
            contentType: model.singularName,
            entityId: result?.id?.toString() || 'unknown',
            entityTitle: result?.title || result?.name || 'Deleted Entry',
            domain: result?.domain || 'N/A',
            userEmail: 'admin@system.local',
            details: result
          }
        });
      },
    });
  },
};
