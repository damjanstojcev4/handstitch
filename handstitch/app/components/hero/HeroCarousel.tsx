"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const HeroCarousel = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const t = useTranslations("hero");

    const slides = [
        {
            video: "/images/video1.mp4",
            image: "/images/image1.jpg",
            title: t("slide1.title"),
            subtitle: t("slide1.subtitle"),
        },
        {
            video: null,
            image: "/images/image2.jpg",
            title: t("slide2.title"),
            subtitle: t("slide2.subtitle"),
        }
    ];

    const current = Math.abs(page % slides.length);
    const paginate = useCallback((dir: number) => setPage([page + dir, dir]), [page]);

    useEffect(() => {
        const timer = setInterval(() => paginate(1), 8000);
        return () => clearInterval(timer);
    }, [paginate]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                >
                    {slides[current].video ? (
                        <video autoPlay muted loop playsInline className="w-full h-full object-cover brightness-[0.6]">
                            <source src={slides[current].video} type="video/mp4" />
                        </video>
                    ) : (
                        <Image src={slides[current].image} alt="hero" fill className="object-cover brightness-[0.6]" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Content Layer: Bold Top-Left Alignment */}
            <div className="absolute inset-0 flex items-start justify-start px-6 md:px-12 lg:px-20 pt-32 md:pt-40 z-20">
                <motion.div
                    key={`content-${current}`}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-white text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-4 drop-shadow-md">
                        {slides[current].title}
                    </h2>

                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.9] mb-10 tracking-tighter uppercase drop-shadow-2xl">
                        {slides[current].subtitle}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="px-12 py-4 bg-white text-black font-semibold text-sm uppercase tracking-widest hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300">
                            {t("shop_men")}
                        </button>
                        <button className="px-12 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black transition-all duration-300">
                            {t("shop_women")}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Heavy-Duty Controls */}
            <div className="absolute bottom-10 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-8">
                <button onClick={() => paginate(-1)} className="group text-white/50 hover:text-white transition-colors">
                    <ChevronLeft size={48} strokeWidth={2.5} />
                </button>
                <div className="h-12 w-[2px] bg-white/20" />
                <button onClick={() => paginate(1)} className="group text-white/50 hover:text-white transition-colors">
                    <ChevronRight size={48} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};