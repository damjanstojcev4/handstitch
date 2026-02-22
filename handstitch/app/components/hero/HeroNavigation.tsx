"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeroNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const t = useTranslations("nav");
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    const basePath = pathname.replace(/^\/(en|mk)/, "");

    const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { key: "home", label: t("home"), href: `/${locale}` },
        { key: "men", label: t("men"), href: `/${locale}/#men` },
        { key: "women", label: t("women"), href: `/${locale}/#women` },
        { key: "customize", label: t("customize"), href: `/${locale}/customize` },
        { key: "about", label: t("about"), href: `/${locale}/#about` },
        { key: "contact", label: t("contact"), href: `/${locale}/#contact` },
        { key: "voucher", label: t("voucher"), href: `/${locale}/#voucher` },
    ];

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[100]"
        >
            {/* Background */}
            <div
                className={`
          absolute inset-0 transition-all duration-300
          ${(scrolled || !isHome)
                        ? "bg-neutral-950/90"
                        : "bg-black/10 lg:bg-transparent"
                    }
          ${scrolled ? "shadow-2xl" : ""}
        `}
            />

            <nav
                className={`
          relative px-6 md:px-12 lg:px-20
          transition-all duration-300
          ${scrolled ? "py-3" : "py-6"}
        `}
            >
                <div className="flex items-center justify-between max-w-[1800px] mx-auto">
                    {/* LEFT DESKTOP */}
                    <div className="hidden lg:flex items-center gap-8 flex-1">
                        {navItems.slice(0, 4).map((item) => (
                            <NavLink key={item.key} href={item.href}>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* LOGO */}
                    <Link href={`/${locale}`} className="relative z-10 flex-shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={180}
                            height={60}
                            className={`transition-all duration-300 brightness-0 invert ${scrolled ? "h-12 w-auto" : "h-16 w-auto"
                                }`}
                        />
                    </Link>

                    {/* RIGHT DESKTOP */}
                    <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
                        {navItems.slice(4).map((item) => (
                            <NavLink key={item.key} href={item.href}>
                                {item.label}
                            </NavLink>
                        ))}
                        <button className="text-white hover:opacity-70 transition-opacity">
                            <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="lg:hidden text-white relative z-10 p-2 -mr-2"
                        onClick={() => setIsOpen(true)}
                        aria-label="Toggle menu"
                    >
                        <Menu size={32} />
                    </button>
                </div>

                {/* MOBILE MENU */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-6 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                key="menu"
                                initial={{ y: -40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full max-w-md bg-neutral-950 rounded-2xl p-8 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-white hover:opacity-60 transition"
                                >
                                    <X size={28} />
                                </button>

                                {/* NAV LINKS */}
                                <div className="flex flex-col gap-6 mt-6">
                                    {navItems.map((item, i) => (
                                        <motion.div
                                            key={item.key}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-2xl font-semibold uppercase tracking-tight text-white hover:text-white/60 transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* LANGUAGE SWITCH */}
                                <div className="mt-10 pt-6 border-t border-white/10 flex gap-6">
                                    <Link
                                        href={`/en${basePath}`}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-sm font-mono tracking-[0.2em] uppercase ${pathname.startsWith("/en")
                                            ? "text-white"
                                            : "text-white/30"
                                            }`}
                                    >
                                        English
                                    </Link>
                                    <Link
                                        href={`/mk${basePath}`}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-sm font-mono tracking-[0.2em] uppercase ${pathname.startsWith("/mk")
                                            ? "text-white"
                                            : "text-white/30"
                                            }`}
                                    >
                                        Македонски
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.div>
    );
};

const NavLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => (
    <Link
        href={href}
        className="group relative text-white text-sm font-medium tracking-widest uppercase"
    >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
);