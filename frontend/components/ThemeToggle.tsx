"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-3 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors glass rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 group relative overflow-hidden"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ y: isDark ? -40 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <Sun size={20} className="group-hover:rotate-45 transition-transform" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ y: isDark ? 0 : 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon size={20} className="group-hover:-rotate-12 transition-transform text-accent" />
            </motion.div>
        </button>
    );
}
