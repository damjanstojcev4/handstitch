"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import heroLeather from "@/public/images/image1.jpg";
import heroCraft from "@/public/images/image2.jpg";
import heroWallets from "@/public/images/image3.jpg";

const slides = [
    {
        image: heroLeather,
        title: "Crafted By Hand",
        subtitle: "Premium leather, timeless design",
    },
    {
        image: heroCraft,
        title: "Artisan Made",
        subtitle: "Every stitch tells a story",
    },
    {
        image: heroWallets,
        title: "The Collection",
        subtitle: "Discover your signature piece",
    },
];

export const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const next = useCallback(
        () => setCurrent((c) => (c + 1) % slides.length),
        []
    );

    const prev = () =>
        setCurrent((c) => (c - 1 + slides.length) % slides.length);

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [autoPlay, next]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
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
            <div className="absolute inset-0 flex items-center">
                <div className="px-6 md:px-12 lg:px-20 max-w-2xl">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="display-heading text-hero mb-4">
                            {slides[current].title}
                        </h1>
                        <p className="text-hero/80 text-lg mb-8">
                            {slides[current].subtitle}
                        </p>

                        <div className="flex gap-4">
                            <a href="#men" className="hero-btn">Shop Men</a>
                            <a href="#women" className="hero-btn">Shop Women</a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <button onClick={prev} className="hero-arrow left-6">
                <ChevronLeft />
            </button>
            <button onClick={next} className="hero-arrow right-6">
                <ChevronRight />
            </button>
        </div>
    );
};
