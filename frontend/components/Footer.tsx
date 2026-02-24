import Link from "next/link";
import { Facebook, Youtube, Mail, Phone, MapPin, ShieldCheck, ChevronRight, Globe } from "lucide-react";
import { fetchAPI } from "@/lib/api";

export default async function Footer({ domain = "localhost" }: { domain?: string }) {
    let config = null;
    try {
        const data = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        config = data.data?.[0] || null;
    } catch (e) {
        console.error("Error fetching site config for footer", e);
    }

    const siteName = config?.siteName || (domain === "pdpa.localhost" ? "PDPA Administrative Court" : "DataGOV");
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="relative pt-24 pb-12 overflow-hidden scroll-mt-premium" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-foreground)' }}>
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, var(--accent-color), var(--accent-dark), var(--accent-color))` }}></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-cubes"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--accent-color)' }}>
                                <ShieldCheck size={28} style={{ color: 'var(--primary-foreground)' }} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black font-heading tracking-tighter" style={{ color: 'var(--primary-foreground)' }}>{siteName}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest leading-none" style={{ color: 'var(--accent-light)' }}>Admin Court Thailand</p>
                            </div>
                        </Link>
                        <p className="leading-relaxed text-sm max-w-xs opacity-60 whitespace-pre-line">
                            {config?.heroSubheadline || "มุ่งมั่นสู่การเป็นศูนย์กลางข้อมูลธรรมาภิบาลที่มีมาตรฐาน โปร่งใส และปลอดภัยสูงสุด เพื่อสร้างความเชื่อมั่นในยุคดิจิทัล"}
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Youtube].map((Icon, idx) => (
                                <Link key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">เมนูลัด</h4>
                        <ul className="space-y-4">
                            {config?.footerMenu && config.footerMenu.length > 0 ? (
                                config.footerMenu.map((item: any, idx: number) => (
                                    <li key={idx}>
                                        <Link href={item.href} className="hover:text-white flex items-center gap-2 transition-all duration-300 text-sm group opacity-60 hover:opacity-100">
                                            <ChevronRight size={14} className="text-accent/40 group-hover:text-accent transition-colors" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                [
                                    { name: "หน้าแรก", href: domain === "pdpa.localhost" ? "/pdpa" : "/" },
                                    { name: "ข่าวกิจกรรม", href: domain === "pdpa.localhost" ? "/news?site=pdpa" : "/news?site=main" },
                                    { name: "PDPA/คุ้มครองข้อมูล", href: "http://localhost:3004" },
                                    { name: "นโยบายความเป็นส่วนตัว", href: domain === "pdpa.localhost" ? "/pdpa#principles" : "http://localhost:3004#principles" },
                                    { name: "ติดต่อเจ้าหน้าที่ DPO", href: domain === "pdpa.localhost" ? "/pdpa#contact" : "http://localhost:3004#contact" }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <Link href={item.href} className="hover:text-white flex items-center gap-2 transition-all duration-300 text-sm group opacity-60 hover:opacity-100">
                                            <ChevronRight size={14} className="text-accent/40 group-hover:text-accent transition-colors" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">ติดต่อหน่วยงาน</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <MapPin size={20} className="text-accent" />
                                </div>
                                <p className="text-sm opacity-60 leading-relaxed whitespace-pre-line">
                                    {config?.address || "120 หมู่ที่ 3 ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง \nเขตหลักสี่ กรุงเทพมหานคร 10210"}
                                </p>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <Phone size={18} className="text-accent" />
                                </div>
                                <p className="text-sm opacity-60">{config?.phone || "0 2141 1111"}</p>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <Mail size={18} className="text-accent" />
                                </div>
                                <p className="text-sm opacity-60">{config?.email || "admin@admincourt.go.th"}</p>
                            </li>
                        </ul>
                    </div>

                    {/* Help Section */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-8">บริการเสริม</h4>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                            <p className="text-xs opacity-50 mb-4 leading-relaxed">
                                ต้องการความช่วยเหลือในการใช้งานระบบธรรมาภิบาลข้อมูล?
                            </p>
                            <Link href="/help" className="flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/5">
                                ศูนย์ช่วยเหลือผู้ใช้
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">
                        © {currentYear} OFFICE OF THE ADMINISTRATIVE COURTS
                    </p>
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest opacity-40">
                        <Link href="#" className="hover:text-accent transition-colors">การเข้าถึงเว็บไซต์</Link>
                        <Link href="#" className="hover:text-accent transition-colors">มาตรฐานความปลอดภัย</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
