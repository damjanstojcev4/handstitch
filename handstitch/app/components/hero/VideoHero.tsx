"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const VideoHero = () => {
    const t = useTranslations("hero");

    // Single source of truth for the background
    const heroVideo = "/images/video1.mp4";

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video Layer - No Carousel Logic */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover brightness-[0.55]"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
            </motion.div>

            {/* Content Layer: Permanent Bold Top-Left Alignment */}
            <div className="absolute inset-0 flex items-start justify-start px-6 md:px-12 lg:px-20 pt-32 md:pt-40 z-20">
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-white text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-4 drop-shadow-md">
                        {t("slide1.title")}
                    </h2>

                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.9] mb-10 tracking-tighter uppercase drop-shadow-2xl">
                        {t("slide1.subtitle")}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="px-12 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-widest hover:bg-white hover:text-black border-2 border-white transition-all duration-300">
                            {t("shop_men")}
                        </button>
                        <button className="px-12 py-4 bg-transparent text-white font-semibold text-sm uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black transition-all duration-300">
                            {t("shop_women")}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};