"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeroNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const t = useTranslations("nav");
    const pathname = usePathname();
    const basePath = pathname.replace(/^\/(en|mk)/, "");

    // Monitor scroll to change header style
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { key: "men", label: t("men"), href: "#men" },
        { key: "women", label: t("women"), href: "#women" },
        { key: "customize", label: t("customize"), href: "#builder" },
        { key: "about", label: t("about"), href: "#about" },
        { key: "contact", label: t("contact"), href: "#contact" },
        { key: "voucher", label: t("voucher"), href: "#voucher" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 lg:px-20 py-4 transition-all duration-300 ${scrolled ? "bg-black py-3 shadow-2xl" : "bg-transparent py-6"
                }`}
        >
            <div className="flex items-center justify-between max-w-[1800px] mx-auto">
                {/* Left Side */}
                <div className="hidden lg:flex items-center gap-8 flex-1">
                    {navItems.slice(0, 3).map((item) => (
                        <NavLink key={item.key} href={item.href}>{item.label}</NavLink>
                    ))}
                </div>

                {/* Central Logo */}
                <Link href="/" className="relative z-50 flex-shrink-0">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={180}
                        height={60}
                        className={`transition-all duration-300 brightness-0 invert ${scrolled ? "h-12 w-auto" : "h-16 w-auto"
                            }`}
                    />
                </Link>

                {/* Right Side */}
                <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
                    {navItems.slice(3).map((item) => (
                        <NavLink key={item.key} href={item.href}>{item.label}</NavLink>
                    ))}
                    <button className="text-white hover:opacity-70 transition-opacity">
                        <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white relative z-[110] p-2 -mr-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu Overlay - Portal-like behavior (inside AnimatePresence) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[105] flex flex-col p-8 pt-32 lg:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-semibold uppercase tracking-tighter text-white hover:text-white/60 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Language Switcher */}
                        <div className="mt-auto pt-10 border-t border-white/10 flex gap-8">
                            <Link
                                href={`/en${basePath}`}
                                className={`text-sm font-mono tracking-[0.2em] uppercase ${pathname.startsWith("/en") ? "text-white" : "text-white/30"}`}
                                onClick={() => setIsOpen(false)}
                            >
                                English
                            </Link>
                            <Link
                                href={`/mk${basePath}`}
                                className={`text-sm font-mono tracking-[0.2em] uppercase ${pathname.startsWith("/mk") ? "text-white" : "text-white/30"}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Македонски
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle Top Shadow for Mobile Visibility */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none lg:hidden" />
        </motion.nav>
    );
};

// Sub-component for animated links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="group relative text-white text-sm font-medium tracking-widest uppercase">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
);