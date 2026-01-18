"use client";

import { motion } from "framer-motion";
import { Search, User, ShoppingBag } from "lucide-react";

export const HeroNavigation = () => {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-6"
        >
            <div className="flex items-center justify-between relative">

                {/* Left */}
                <div className="hidden lg:flex items-center gap-8 flex-1 text-white">
                    {["Men", "Women", "Customize"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hero-nav-link"
                        >
                            {item}
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

                {/* Right */}
                <div className="hidden lg:flex items-center gap-8 flex-1 justify-end text-white">
                    <a href="#about" className="hero-nav-link">About</a>
                    <a href="#contact" className="hero-nav-link">Contact</a>

                    <div className="flex items-center gap-6 ml-4">
                        <button aria-label="Search" className="hero-icon-btn">
                            <Search className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button aria-label="Account" className="hero-icon-btn">
                            <User className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button aria-label="Cart" className="hero-icon-btn relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center rounded-full">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex lg:hidden items-center gap-4 ml-auto text-white">
                    <button aria-label="Cart" className="hero-icon-btn">
                        <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button aria-label="Menu" className="hero-icon-btn">
                        <span className="block w-6 h-px bg-current mb-1.5" />
                        <span className="block w-6 h-px bg-current" />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};
