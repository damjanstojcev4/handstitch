"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const AboutSection = () => {
    const t = useTranslations("about");
    const ref = useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const features = [
        {
            title: t("features.leather.title"),
            description: t("features.leather.desc"),
        },
        {
            title: t("features.stitched.title"),
            description: t("features.stitched.desc"),
        },
        {
            title: t("features.design.title"),
            description: t("features.design.desc"),
        },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="relative text-[#f5f1ea] py-32 overflow-hidden"
        >



            <div className="max-w-7xl mx-auto px-6 relative">
                {/* TOP SPECIFICATION BAR */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 border-b border-white/15 pb-8 gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-none italic">
                            {t("title")}
                        </h2>
                    </div>

                    <div className="text-right">
                        <p className="font-mono text-[10px] uppercase text-white/60">
                            {t("documented_since")}
                        </p>
                        <p className="font-serif text-3xl italic">{t("years_val")}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* LEFT: STORY + MAKER */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Maker image card */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative overflow-hidden border border-white/12 bg-white/5 rounded-2xl"
                        >
                            {/* Put your maker image here */}
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src="/images/maker.jpg"
                                    alt="The maker"
                                    fill
                                    className="object-cover object-top grayscale-75"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                            </div>

                            <div className="p-6">
                                <p className="mt-2 font-serif text-xl italic text-[#e7e1d7]">
                                    {t("maker_quote")}
                                </p>
                            </div>

                            {/* corner mark */}
                            <div className="pointer-events-none absolute top-0 right-0 p-3 opacity-70">
                                <div className="w-5 h-5 border-t border-r border-white/50" />
                            </div>
                        </motion.div>

                        {/* Story block */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                            className="relative p-1 border-l-2 border-white/30 pl-8"
                        >
                            <p className="font-serif text-xl leading-relaxed italic text-[#cfc8bd]">
                                {t("description")}
                            </p>

                            {/* THE "WAX SEAL" STAMP (white now) */}
                            <div className="mt-12 w-24 h-24 rounded-full border border-white/25 flex items-center justify-center -rotate-12 bg-white/5 backdrop-blur-sm">
                                <div className="text-center">
                                    <p className="font-mono text-[8px] uppercase tracking-tighter leading-none text-white/70">
                                        {t("certified")}
                                    </p>
                                    <p className="font-serif text-lg italic text-[#f5f1ea]">
                                        {t("origin")}
                                    </p>
                                    <p className="font-mono text-[8px] uppercase tracking-tighter leading-none text-white/70">
                                        {t("tuscany")}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: WORKFLOW */}
                    <div className="lg:col-span-7">
                        <div className="space-y-4">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 + i * 0.1 }}
                                    className="group relative border border-white/12 p-8 hover:bg-white/5 transition-all cursor-default"
                                >

                                    <h3 className="font-serif text-3xl mb-4 italic group-hover:pl-4 transition-all duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="font-serif text-[#c7beb2] text-base leading-relaxed opacity-80 max-w-lg">
                                        {feature.description}
                                    </p>

                                    {/* DECORATIVE: Drafting "Crosshairs" */}
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-4 h-4 border-t border-r border-white/70" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM FOOTER */}
                <div className="mt-24 pt-8 border-t border-dashed border-white/15 flex justify-between items-center opacity-50">
                    <span className="font-serif italic text-sm underline underline-offset-4">
                        {t("signed_by")}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
