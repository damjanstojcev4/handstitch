"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeroNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const t = useTranslations("nav");
    const pathname = usePathname();
    const basePath = pathname.replace(/^\/(en|mk)/, "");

    const navItems = [
        { key: "men", label: t("men"), href: "#men" },
        { key: "women", label: t("women"), href: "#women" },
        { key: "customize", label: t("customize"), href: "#builder" },
        { key: "about", label: t("about"), href: "#about" },
        { key: "contact", label: t("contact"), href: "#contact" },
        { key: "voucher", label: t("voucher"), href: "#voucher" },
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
                {t("en")}
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <Link
                href={`/mk${basePath}`}
                className={`hover:text-white transition-colors ${pathname.startsWith("/mk") ? "text-white" : ""}`}
            >
                {t("mk")}
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
                        <a key={item.key} href={item.href} className="hero-nav-link">
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Logo */}
                <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    <Link href="/" aria-label="Home" className="block">
                        <Image
                            src="/images/logo.png"
                            alt={t("logo_alt")}
                            width={300}
                            height={300}
                            className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
                        />
                    </Link>
                </div>

                {/* Right (Desktop) */}
                <div className="hidden lg:flex items-center gap-8 flex-1 justify-end text-white">
                    {navItems.slice(3).map((item) => (
                        <a key={item.key} href={item.href} className="hero-nav-link">
                            {item.label}
                        </a>
                    ))}

                    <div className="flex items-center gap-6 ml-4">
                        <LocaleSwitcher />

                        <button className="hero-icon-btn relative" aria-label={t("shopping_bag") || "Shopping bag"}>
                            <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                        </button>
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex lg:hidden items-center gap-4 ml-auto text-white">
                    <LocaleSwitcher />
                    <button className="hero-icon-btn" aria-label={t("shopping_bag") || "Shopping bag"}>
                        <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button
                        className="hero-icon-btn"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
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
                            id="mobile-menu"
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
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="hover:text-gray-300 transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <div className="flex gap-5 pt-4 border-t border-white/20">
                                    <button aria-label={t("search") || "Search"}>
                                        <Search className="w-5 h-5" strokeWidth={2} />
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
