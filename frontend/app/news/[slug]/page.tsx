import { fetchAPI, getStrapiMedia } from "@/lib/api";
import BlockRenderer from "@/components/BlockRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import { ArrowLeft, Calendar, Clock, Share2, User, Bookmark, MoreHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";

// Generate Metadata (SEO)
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const data = await fetchAPI("/articles", {
        filters: { slug: params.slug },
        populate: { coverImage: true, ogImage: true, category: true },
    });

    const article = data.data?.[0];
    if (!article) return { title: "ไม่พบบทความ" };

    const isPDPA = article.domain === 'pdpa.localhost';
    const siteName = isPDPA ? "PDPA Center" : "DataGOV";

    const title = article.seoTitle || `${article.title} | ${siteName}`;
    const description = article.seoDescription || article.description || "อ่านรายละเอียดข่าวสารและกิจกรรมล่าสุด";
    const ogImageUrl = article.ogImage?.url
        ? getStrapiMedia(article.ogImage.url)
        : article.coverImage?.url
            ? getStrapiMedia(article.coverImage.url)
            : undefined;

    return {
        title,
        description,
        keywords: article.seoKeywords || undefined,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: article.publishedAt,
            ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {})
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(ogImageUrl ? { images: [ogImageUrl] } : {})
        }
    };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const data = await fetchAPI("/articles", {
        filters: { slug: params.slug },
        populate: {
            content: {
                populate: "*"
            },
            coverImage: true,
            category: true
        },
    });

    const article = data.data?.[0];
    if (!article) notFound();

    const domain = article.domain || "localhost";
    const siteParam = domain === "pdpa.localhost" ? "pdpa" : "main";
    const date = new Date(article.publishedAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    const coverImageUrl = article.coverImage?.url ? getStrapiMedia(article.coverImage.url) : null;

    let announcement = undefined;
    let notifications = undefined;
    try {
        const config = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        const siteConfig = config.data?.[0];
        announcement = siteConfig?.announcement;
        notifications = siteConfig?.notifications;
    } catch (e) {
        console.error("Error fetching announcement", e);
    }

    return (
        <main id="main-content" className="min-h-screen bg-[#fcfdfe]">
            <NewsTicker domain={domain} announcement={announcement} notifications={notifications} />
            <Navbar domain={domain} />

            {/* Reading Context Header */}
            <div className="pt-[calc(8rem+44px)] pb-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <Breadcrumb
                            currentLabel={article.title}
                            homeHref={domain === "pdpa.localhost" ? "/pdpa" : "/"}
                            homeName={domain === "pdpa.localhost" ? "PDPA Center" : "DataGOV"}
                        />
                        <div className="flex items-center gap-3">
                            <button className="p-2 text-gray-400 hover:text-accent transition-colors"><Bookmark size={20} /></button>
                            <button className="p-2 text-gray-400 hover:text-accent transition-colors"><MoreHorizontal size={20} /></button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <span
                            className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block"
                            style={{ background: "var(--accent-subtle)", color: "var(--accent-color)", border: "1px solid var(--accent-glow)" }}
                        >
                            {article.category?.name || "Governance Update"}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black font-heading text-primary leading-[1.1] tracking-tighter">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 pt-4 pb-8 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ background: "var(--accent-subtle)", color: "var(--accent-color)" }}
                                >
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Author</p>
                                    <p className="text-sm font-bold text-primary">Admin Court TH</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-accent"
                                    style={{ background: "var(--accent-subtle)" }}
                                >
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Published</p>
                                    <p className="text-sm font-bold text-primary">{date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-accent"
                                    style={{ background: "var(--accent-subtle)" }}
                                >
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Time</p>
                                    <p className="text-sm font-bold text-primary">{new Date(article.publishedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content Area */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <article className="bg-white rounded-[3rem] shadow-premium border border-white p-8 md:p-16 relative overflow-hidden">

                    {/* Featured Image */}
                    {coverImageUrl && (
                        <div className="mb-16 -mx-8 md:-mx-16 -mt-8 md:-mt-16 relative aspect-video overflow-hidden">
                            <img
                                src={coverImageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    )}

                    <div className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:font-heading prose-p:leading-relaxed prose-p:text-gray-600 prose-strong:text-primary prose-a:text-accent">
                        <BlockRenderer blocks={article.content} />
                    </div>

                    {/* Share & tags */}
                    <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Tags:</span>
                            <div className="flex gap-2">
                                {["Governance", "Data", "Security"].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold">#{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-bold text-primary">แชร์บทความนี้</p>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-accent hover:text-white transition-all flex items-center justify-center text-gray-400">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Next/Prev Navigation UI */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-white border border-gray-100 transition-all cursor-pointer group" style={{ ["--hover-border" as any]: "var(--accent-subtle)" }}>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <ArrowLeft size={12} /> Previous Article
                        </p>
                        <h4 className="font-bold text-primary group-hover:text-accent transition-colors">สรุปผลการประชุมธรรมาภิบาลข้อมูลไตรมาสที่ 1</h4>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white border border-gray-100 transition-all cursor-pointer group text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                            Next Article <ChevronRight size={12} />
                        </p>
                        <h4 className="font-bold text-primary group-hover:text-accent transition-colors">แนวทางการจัดการข้อมูลส่วนบุคคล (PDPA)</h4>
                    </div>
                </div>
            </div>

            <Footer domain={domain} />
        </main>
    );
}
