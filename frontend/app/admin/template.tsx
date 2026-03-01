"use client";

import { motion } from "motion/react";
import React from "react";

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.99, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 0.5,
                duration: 0.4
            }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
