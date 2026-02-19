"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const images = [
    { id: "01", src: "/images/img1.jpg" },
    { id: "02", src: "/images/img2.jpg" },
    { id: "03", src: "/images/img3.jpg" },
    { id: "04", src: "/images/img4.jpg" },
    { id: "05", src: "/images/img5.jpg" },
    { id: "06", src: "/images/img6.jpg" },
];

export default function StudioGallery() {
    const t = useTranslations("journal");

    return (
        <section className="py-24 bg-transparent">
            <div className="max-w-[1800px] mx-auto px-6">

                {/* Simple, Sharp Header */}
                <div className="mb-16">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-2">
                        {t("title")}
                    </h2>
                    <div className="h-px w-12 bg-white/20" />
                </div>

                {/* The Strip: Simple 2-column or 3-column grid with high spacing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                    {images.map((img, idx) => {
                        const productTitle = t(`items.${img.id}`);
                        return (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="group"
                            >
                                {/* Image Container: Strictly 4:5 for a professional portrait look */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.02] border border-white/5">
                                    <Image
                                        src={img.src}
                                        alt={productTitle}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                    />

                                    {/* Subtle Technical Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Minimal Labeling */}
                                <div className="mt-6 flex justify-between items-baseline">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">
                                            {t("plate")} {img.id}
                                        </span>
                                        <h3 className="text-sm font-light uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                                            {productTitle}
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-serif italic text-white/20">Ref. 2026</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
