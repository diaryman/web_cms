
// Mock data content
const mockData: any = {
    siteConfigs: [
        {
            siteName: "DataGOV Administrative Court",
            domain: "localhost:3000",
            announcement: "ยินดีต้อนรับสู่ศูนย์กลางข้อมูลธรรมาภิบาล สำนักงานศาลปกครอง",
            footerText: "© 2026 สำนักงานศาลปกครอง. สงวนลิขสิทธิ์."
        },
        {
            siteName: "PDPA Administrative Court",
            domain: "pdpa.localhost",
            announcement: "ศูนย์คุ้มครองข้อมูลส่วนบุคคล (PDPA Center) สำนักงานศาลปกครอง",
            footerText: "© 2026 PDPA Center - สำนักงานศาลปกครอง. สงวนลิขสิทธิ์."
        }
    ],
    categories: [
        { name: "ข่าวประชาสัมพันธ์", slug: "news" },
        { name: "กิจกรรม", slug: "activities" },
        { name: "ประกาศ", slug: "announcements" },
        { name: "PDPA Training", slug: "pdpa-training" },
        { name: "PDPA News", slug: "pdpa-news" }
    ],
    articles: [
        // DataGOV Articles
        {
            title: "การประชุมขับเคลื่อนธรรมาภิบาลข้อมูลภาครัฐสู่การปฏิบัติที่ยั่งยืนประจำปี 2569",
            slug: "meeting-dg-2569",
            publishedAt: "2026-02-15T09:00:00.000Z",
            domain: "localhost:3000",
            content: [{ __component: 'shared.rich-text', content: [{ type: 'paragraph', children: [{ type: 'text', text: 'เนื้อหาจำลองข่าวการประชุม...' }] }] }],
        },
        {
            title: "สำนักงานศาลปกครองรับรางวัลองค์กรดีเด่นด้านการจัดการข้อมูลขนาดใหญ่ (Big Data)",
            slug: "award-big-data",
            publishedAt: "2026-02-10T10:30:00.000Z",
            domain: "localhost:3000",
            content: [{ __component: 'shared.rich-text', content: [{ type: 'paragraph', children: [{ type: 'text', text: 'สำนักงานศาลปกครองมีความภาคภูมิใจที่ได้รับรางวัล...' }] }] }],
        },
        {
            title: "เปิดตัวระบบ Data Catalog อย่างเป็นทางการ เพื่อความโปร่งใสของข้อมูลศาล",
            slug: "launch-data-catalog",
            publishedAt: "2026-02-05T14:45:00.000Z",
            domain: "localhost:3000",
            content: [{ __component: 'shared.rich-text', content: [{ type: 'paragraph', children: [{ type: 'text', text: 'เชิญชวนประชาชนเข้าใช้งานระบบบัญชีข้อมูล...' }] }] }],
        },
        // PDPA Articles
        {
            title: "อบรมบุคลากรด้านการรักษาความมั่นคงปลอดภัยข้อมูลส่วนบุคคล",
            slug: "pdpa-training-2569",
            publishedAt: "2026-02-15T09:00:00.000Z",
            domain: "pdpa.localhost",
            content: [{ __component: 'shared.rich-text', content: [{ type: 'paragraph', children: [{ type: 'text', text: 'กิจกรรมอบรมสร้างความเข้มแข็งด้านการคุ้มครองข้อมูล...' }] }] }],
        },
        {
            title: "ประกาศแต่งตั้งคณะทำการตรวจสอบภายในด้าน PDPA ประจำปีงบประมาณ 2569",
            slug: "pdpa-audit-committee",
            publishedAt: "2026-02-10T10:30:00.000Z",
            domain: "pdpa.localhost",
            content: [{ __component: 'shared.rich-text', content: [{ type: 'paragraph', children: [{ type: 'text', text: 'ประกาศสำคัญเพื่อความโปร่งใส...' }] }] }],
        },
        {
            title: "กิจกรรม Roadshow สร้างความรู้ด้านสิทธิเจ้าของข้อมูลให้กับประชาชน",
            slug: "pdpa-roadshow",
            publishedAt: "2026-02-05T14:45:00.000Z",
            domain: "pdpa.localhost",
            content: [{ __component: 'shared.rich-text', content: [{ type: 'paragraph', children: [{ type: 'text', text: 'ลงพื้นที่ให้ความรู้ด้านกฎหมาย PDPA...' }] }] }],
        }
    ],
    policyDocuments: [
        // DataGOV Docs
        { title: "นโยบายธรรมาภิบาลข้อมูล (ฉบับปี 2569)", category: "Policy", year: 2026, domain: "localhost:3000", description: "นโยบายหลักในการบริหารจัดการข้อมูลของหน่วยงานเพื่อให้เกิดความโปร่งใสและตรวจสอบได้" },
        { title: "คู่มือการจัดทำบัญชีข้อมูล (Data Catalog)", category: "Manual", year: 2026, domain: "localhost:3000", description: "คู่มือแนะนำขั้นตอนการจัดทำและลงทะเบียนชุดข้อมูลในระบบ Data Catalog" },
        { title: "แบบฟอร์มขอใช้ข้อมูล (Data Request Form)", category: "Form", year: 2026, domain: "localhost:3000", description: "แบบฟอร์มมาตรฐานสำหรับการขอเข้าถึงข้อมูลเปิดภาครัฐ" },
        { title: "แนวทางการเปิดเผยข้อมูลเปิดภาครัฐ (Open Data Guideline)", category: "Guideline", year: 2025, domain: "localhost:3000", description: "แนวทางปฏิบัติสำหรับการคัดเลือกและเผยแพร่ชุดข้อมูลเปิด" },
        { title: "รายงานผลการดำเนินงานด้านข้อมูลประจำปี 2568", category: "Report", year: 2025, domain: "localhost:3000", description: "รายงานสรุปผลสัมฤทธิ์และปัญหาอุปสรรคในการดำเนินงานด้านข้อมูล" },
        { title: "มาตรฐานเมทาดาตาสำหรับภาครัฐ (Government Metadata Standard)", category: "Standard", year: 2024, domain: "localhost:3000", description: "ข้อกำหนดมาตรฐานในการอธิบายข้อมูลเพื่อให้สามารถแลกเปลี่ยนและใช้งานร่วมกันได้" },
        // PDPA Docs
        { title: "นโยบายคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)", category: "PDPA Policy", year: 2026, domain: "pdpa.localhost" },
        { title: "ประกาศการคุ้มครองข้อมูลส่วนบุคคล (Privacy Notice)", category: "PDPA Notice", year: 2026, domain: "pdpa.localhost" },
        { title: "แบบคำร้องขอใช้สิทธิของเจ้าของข้อมูล (SAR)", category: "PDPA Form", year: 2026, domain: "pdpa.localhost" }
    ]
};

// Strapi script to seed data
export default async function seed() {
    try {
        console.log('🌱 Starting comprehensive seeding...');

        // 1. Site Configs
        for (const config of mockData.siteConfigs) {
            const exist = await strapi.db.query('api::site-config.site-config').findOne({ where: { domain: config.domain } });
            if (!exist) {
                await strapi.documents('api::site-config.site-config').create({ data: config, status: 'published' });
            } else {
                await strapi.db.query('api::site-config.site-config').update({ where: { id: exist.id }, data: config });
            }
        }

        // 2. Categories
        for (const cat of mockData.categories) {
            const exist = await strapi.db.query('api::category.category').findOne({ where: { slug: cat.slug } });
            if (!exist) {
                await strapi.documents('api::category.category').create({ data: cat, status: 'published' });
            }
        }

        // 3. Articles (News) - Delete existing and recreate for fresh mockup
        console.log('♻️ Re-seeding Articles...');
        const existingArticles = await strapi.db.query('api::article.article').findMany();
        for (const art of existingArticles) {
            await strapi.db.query('api::article.article').delete({ where: { id: art.id } });
        }
        for (const art of mockData.articles) {
            await strapi.documents('api::article.article').create({ data: art, status: 'published' });
        }

        // 4. Policy Documents - Delete and recreate
        console.log('♻️ Re-seeding Policy Documents...');
        const existingDocs = await strapi.db.query('api::policy-document.policy-document').findMany();
        for (const doc of existingDocs) {
            await strapi.db.query('api::policy-document.policy-document').delete({ where: { id: doc.id } });
        }
        for (const doc of mockData.policyDocuments) {
            try {
                await strapi.documents('api::policy-document.policy-document').create({ data: doc, status: 'published' });
            } catch (e) {
                console.warn(`⚠️ Could not create doc ${doc.title}`);
            }
        }

        // 5. Set Permissions
        console.log('🔐 Setting Public Permissions...');
        const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
        if (publicRole) {
            const permissionsToEnable = {
                'api::site-config': ['find', 'findOne'],
                'api::article': ['find', 'findOne'],
                'api::category': ['find', 'findOne'],
                'api::policy-document': ['find', 'findOne'],
                'api::page': ['find', 'findOne'],
            };

            for (const [api, actions] of Object.entries(permissionsToEnable)) {
                for (const action of actions) {
                    const apiName = api.split('::')[1];
                    const actionId = `${api}.${apiName}.${action}`;
                    const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({
                        where: { action: actionId, role: publicRole.id }
                    });
                    if (!exists) {
                        await strapi.db.query('plugin::users-permissions.permission').create({
                            data: { action: actionId, role: publicRole.id }
                        });
                    }
                }
            }
        }

        console.log('🚀 Comprehensive Seeding completed!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
}
