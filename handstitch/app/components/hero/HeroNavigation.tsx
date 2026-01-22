"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeroNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const t = useTranslations("nav");
    const pathname = usePathname();
    const basePath = pathname.replace(/^\/(en|mk)/, "");

    const navItems = [
        { key: "men", label: t("men") },
        { key: "women", label: t("women") },
        { key: "customize", label: t("customize") },
        { key: "about", label: t("about") },
        { key: "contact", label: t("contact") },
    ];

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const LocaleSwitcher = () => (
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/70">
            <Link
                href={`/en${basePath}`}
                className={`hover:text-white transition-colors ${pathname.startsWith("/en") ? "text-white" : ""}`}
            >
                EN
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link
                href={`/mk${basePath}`}
                className={`hover:text-white transition-colors ${pathname.startsWith("/mk") ? "text-white" : ""}`}
            >
                MK
            </Link>
        </div>
    );

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-6"
        >
            <div className="flex items-center justify-between relative z-50">

                {/* Left (Desktop) */}
                <div className="hidden lg:flex items-center gap-8 flex-1 text-white">
                    {navItems.slice(0, 3).map((item) => (
                        <a key={item.key} href={`#${item.key}`} className="hero-nav-link">
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Logo */}
                <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    <a href="/" aria-label="Home">
                        <h2 className="text-hero font-display text-2xl md:text-3xl tracking-[0.3em] font-semibold text-white">
                            Handstitch
                        </h2>
                    </a>
                </div>

                {/* Right (Desktop) */}
                <div className="hidden lg:flex items-center gap-8 flex-1 justify-end text-white">
                    {navItems.slice(3).map((item) => (
                        <a key={item.key} href={`#${item.key}`} className="hero-nav-link">
                            {item.label}
                        </a>
                    ))}

                    <div className="flex items-center gap-6 ml-4">
                        <LocaleSwitcher />
                        <button className="hero-icon-btn">
                            <Search className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="hero-icon-btn">
                            <User className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button className="hero-icon-btn relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center rounded-full">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex lg:hidden items-center gap-4 ml-auto text-white">
                    <LocaleSwitcher />
                    <button className="hero-icon-btn">
                        <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button
                        className="hero-icon-btn"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Click-outside backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                        />

                        {/* Dropdown panel */}
                        <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="
                absolute right-6 mt-6 z-50 w-72
                rounded-2xl
                bg-black/90
                border border-white/10
                shadow-xl
                text-white
              "
                        >
                            <div className="flex flex-col py-6 px-6 gap-5 text-lg">
                                {navItems.map((item) => (
                                    <a
                                        key={item.key}
                                        href={`#${item.key}`}
                                        onClick={() => setIsOpen(false)}
                                        className="hover:text-gray-300 transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                ))}

                                <div className="flex gap-5 pt-4 border-t border-white/20">
                                    <button>
                                        <Search className="w-5 h-5" strokeWidth={1.5} />
                                    </button>
                                    <button>
                                        <User className="w-5 h-5" strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
