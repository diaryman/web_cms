"use client";

import { Menu, X, Search, ShieldCheck, Languages } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SearchModal from "./SearchModal";
import ThemeToggle from "./ThemeToggle";

interface NavbarClientProps {
    siteName: string;
    navItems?: { name: string; href: string }[];
    domain?: string;
}

export default function NavbarClient({ siteName, navItems: customNavItems, domain = "localhost:3000" }: NavbarClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Keyboard shortcuts: Ctrl+K / Cmd+K to open search, ESC to close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsSearchOpen(false);
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const defaultNavItems = [
        { name: "หน้าแรก", href: "/" },
        { name: "ข่าวกิจกรรม", href: "/news?site=main" },
        { name: "PDPA", href: "/pdpa" },
        { name: "นโยบาย/มาตรฐาน", href: "/#policy" },
        { name: "เอกสารเผยแพร่", href: "/documents" },
        { name: "ดาวน์โหลด", href: "/#downloads" },
        { name: "ติดต่อเรา", href: "/contact" },
    ];

    const navItems = customNavItems || defaultNavItems;

    return (
        <>
            <nav
                className={`fixed w-full z-[80] transition-all duration-500 top-[44px] ${scrolled
                    ? "py-3 shadow-premium border-b"
                    : "py-6 bg-transparent"
                    }`}
                style={{
                    backgroundColor: scrolled ? 'var(--glass-bg)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderColor: 'var(--glass-border)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Section */}
                        <Link href={domain === "pdpa.localhost" ? "/pdpa" : "/"} className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300" style={{ backgroundColor: 'var(--accent-color)' }}>
                                <ShieldCheck size={28} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-heading font-black text-2xl tracking-tighter leading-none text-primary`}>
                                    {siteName}
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--accent-color)' }}>Admin Court TH</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="flex items-center gap-0.5 glass p-1 rounded-2xl border border-white shadow-sm mr-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="px-4 py-2.5 font-black text-sm transition-all relative rounded-xl hover:bg-white/10 whitespace-nowrap"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Search Toggle */}
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="flex items-center gap-3 px-4 py-2.5 transition-colors glass rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-white group"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    <Search size={18} className="group-hover:text-accent transition-colors flex-shrink-0" />
                                    <span className="text-sm font-medium hidden lg:block">ค้นหา...</span>
                                    <kbd className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold rounded border bg-white/50 border-gray-200 text-gray-400 ml-1">
                                        ⌘K
                                    </kbd>
                                </button>

                                {/* Theme Toggle */}
                                <ThemeToggle />

                                {/* Language Switcher UI */}
                                <button
                                    className="p-3 transition-colors glass rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-white flex items-center gap-2 px-4 shadow-sm"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    <Languages size={18} className="text-accent" />
                                    <span className="text-xs font-bold font-heading">TH</span>
                                </button>

                                <Link
                                    href={`/admin?site=${domain === "pdpa.localhost" ? "pdpa" : "main"}`}
                                    className="px-6 py-3 bg-primary text-sm font-bold rounded-2xl shadow-premium hover:bg-accent transition-all active:scale-95 ml-2 whitespace-nowrap"
                                    style={{ color: 'var(--primary-foreground)' }}
                                >
                                    เข้าสู่ระบบ
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-3 glass rounded-2xl border border-gray-100 dark:border-white/10 text-blue-500"
                            >
                                <Search size={20} />
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-3 glass rounded-2xl border border-gray-100 dark:border-white/10"
                                style={{ color: 'var(--foreground)' }}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden glass absolute w-full left-0 shadow-2xl overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-6 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all border border-transparent hover:border-blue-100/20"
                                    style={{ color: 'var(--foreground)' }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <ThemeToggle />
                                    <button
                                        className="flex-1 flex items-center justify-center gap-3 py-4 glass rounded-2xl font-bold"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        <Languages size={20} className="text-accent" />
                                        <span>Thai / English</span>
                                    </button>
                                </div>
                                <Link
                                    href={`/admin?site=${domain === "pdpa.localhost" ? "pdpa" : "main"}`}
                                    className="w-full flex justify-center py-4 bg-primary rounded-2xl font-bold shadow-lg"
                                    style={{ color: 'var(--primary-foreground)' }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    เข้าสู่ระบบจัดการข้อมูล
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} domain={domain} />
        </>
    );
}
