"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const AboutSection = () => {
    const t = useTranslations("about");
    const ref = useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const features = [
        { id: "01", title: t("features.leather.title"), desc: t("features.leather.desc") },
        { id: "02", title: t("features.stitched.title"), desc: t("features.stitched.desc") },
        { id: "03", title: t("features.design.title"), desc: t("features.design.desc") },
    ];

    return (
        <section id="about" ref={ref} className="text-white py-24 lg:py-36 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">

                {/* 1. REFINED HEADER: Matches Hero Typography */}
                <div className="relative mb-20 flex flex-col md:flex-row justify-between items-start gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="max-w-2xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-semibold uppercase leading-[0.95] tracking-tighter drop-shadow-sm">
                            {t("title")}
                        </h2>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* 2. IMAGE BLOCK: Clean & Focused */}
                    <motion.div
                        className="lg:col-span-5 relative"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900">
                            <Image
                                src="/images/maker2.jpg"
                                alt="The maker"
                                fill
                                className="object-cover grayscale brightness-90 hover:scale-105 transition-transform duration-[1.5s] ease-out"
                            />
                            {/* Subtle Framing Detail */}
                            <div className="absolute inset-4 border border-white/10 pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* 3. WORKFLOW: Semi-Bold Hierarchy */}
                    <div className="lg:col-span-7 space-y-2">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 * i }}
                                className="group py-10 border-b border-white/5 hover:border-white/40 transition-colors duration-500"
                            >
                                <div className="flex items-start gap-10">
                                    <span className="font-mono text-xs text-white/20 pt-2">
                                        {feature.id}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight mb-4 transition-transform duration-300 group-hover:translate-x-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white/50 max-w-lg text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;