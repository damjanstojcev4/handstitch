"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import heroLeather from "@/public/images/image1.jpg";
import heroCraft from "@/public/images/image2.jpg";
import heroWallets from "@/public/images/image3.jpg";

// Slides are now defined inside the component to use translations

import { useTranslations } from "next-intl";

export const HeroCarousel = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [autoPlay, setAutoPlay] = useState(true);
    const t = useTranslations("hero");

    const slides = [
        {
            image: heroLeather,
            title: t("slide1.title"),
            subtitle: t("slide1.subtitle"),
        },
        {
            image: heroCraft,
            title: t("slide2.title"),
            subtitle: t("slide2.subtitle"),
        },
        {
            image: heroWallets,
            title: t("slide3.title"),
            subtitle: t("slide3.subtitle"),
        },
    ];

    // We can calculate current index from page (which can go infinite)
    const current = Math.abs(page % slides.length);

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    const next = useCallback(() => paginate(1), [paginate]);
    const prev = useCallback(() => paginate(-1), [paginate]);

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [autoPlay, next]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-black">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-hero-overlay" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
                <div className="px-6 md:px-12 lg:px-20 max-w-2xl pointer-events-auto">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="display-heading text-xl md:text-3xl lg:text-4xl text-hero mb-4 text-white">
                            {slides[current].title}
                        </h1>
                        <p className="text-hero/80 text-4xl md:text-6xl lg:text-7xl mb-8 text-white whitespace-normal lg:whitespace-nowrap">
                            {slides[current].subtitle}
                        </p>

                        <div className="flex gap-4 text-white">
                            <a href="#men" className="hero-btn">{t("shop_men")}</a>
                            <a href="#women" className="hero-btn">{t("shop_women")}</a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <button onClick={prev} className="hero-arrow left-6 z-20">
                <ChevronLeft />
            </button>
            <button onClick={next} className="hero-arrow right-6 z-20">
                <ChevronRight />
            </button>
        </div>
    );
};
