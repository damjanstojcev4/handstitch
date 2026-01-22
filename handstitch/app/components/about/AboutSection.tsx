"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
};

import { useTranslations } from "next-intl";

const AboutSection = () => {
    const t = useTranslations("about");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-120px" });

    const features = [
        {
            number: "01",
            title: t("features.leather.title"),
            description: t("features.leather.desc"),
        },
        {
            number: "02",
            title: t("features.stitched.title"),
            description: t("features.stitched.desc"),
        },
        {
            number: "03",
            title: t("features.design.title"),
            description: t("features.design.desc"),
        },
    ];

    return (
        <section
            id="about"
            className="relative overflow-hidden py-24 md:py-32 bg-[#faf9f6] text-[#1c1917]"
        >
            {/* Background accent */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-[60%] -skew-x-12 translate-x-1/3 bg-[#c08a5a]/5 hidden md:block" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center"
                >
                    {/* LEFT */}
                    <div>
                        <motion.span
                            variants={fadeUp}
                            className="inline-block text-[#c08a5a] uppercase tracking-[0.35em] text-xs font-semibold mb-4"
                        >
                            {t("story")}
                        </motion.span>

                        <motion.h2
                            variants={fadeUp}
                            className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
                        >
                            {t("title")}
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-[#57534e] text-base leading-relaxed max-w-xl mb-12"
                        >
                            {t("description")}
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex items-center gap-12">
                            <div>
                                <p className="font-display text-4xl md:text-5xl">10+</p>
                                <p className="text-[#78716c] text-sm mt-1">
                                    {t("years")}
                                </p>
                            </div>

                            <div className="h-14 w-px bg-[#d6d3d1]" />

                            <div>
                                <p className="font-display text-4xl md:text-5xl">5k+</p>
                                <p className="text-[#78716c] text-sm mt-1">
                                    {t("clients")}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.number}
                                variants={fadeRight}
                                className="
                  group flex gap-6 p-6 rounded-xl
                  bg-white/60 backdrop-blur
                  border border-[#e7e5e4]
                  hover:border-[#c08a5a]/50
                  hover:shadow-[0_20px_60px_-20px_rgba(192,138,90,0.35)]
                  transition-all duration-300
                "
                            >
                                <span className="font-display text-3xl text-[#c08a5a]/40 group-hover:text-[#c08a5a] transition-colors">
                                    {feature.number}
                                </span>

                                <div>
                                    <h3 className="font-display text-lg mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#78716c] text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
