"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const collections = [
    {
        id: "men",
        images: ["/images/img10.jpg", "/images/img3.jpg", "/images/img11.jpg"],
    },
    {
        id: "women",
        images: ["/images/z1.jpg", "/images/z2.jpg", "/images/z3.jpg"],
    },
    {
        id: "holders",
        images: ["/images/ch1.jpg", "/images/ch2.jpg", "/images/ch3.jpg"],
    },
];

export default function StudioGallery() {
    const t = useTranslations("journal");

    return (
        <section className="py-24 lg:py-32 bg-transparent text-white overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 space-y-24 md:space-y-40">

                {collections.map((category, catIdx) => (
                    <div key={category.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">

                        {/* 1. THE TITLE CARD */}
                        <div className={`flex flex-col justify-end p-8 md:p-12 border border-white/5 bg-white/[0.02] ${catIdx % 2 !== 0 ? 'md:order-last' : ''}`}>
                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85] mb-2">
                                {t(`categories.${category.id}.title`)}<br />
                                <span className="opacity-20 italic font-light">{t("collection_label")}</span>
                            </h2>
                        </div>

                        {/* 2. THE TRIPTYCH */}
                        {category.images.map((imgSrc, idx) => (
                            <motion.div
                                key={`${category.id}-${idx}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                                className="relative aspect-square overflow-hidden bg-white/[0.03] border border-white/5 group"
                            >
                                <Image
                                    src={imgSrc}
                                    alt="Product Detail"
                                    fill
                                    className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                />

                                {/* Subtle Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Technical Label */}
                                <div className="absolute bottom-5 left-5 font-mono text-[8px] text-white/40 tracking-[0.4em] uppercase mix-blend-difference">
                                    {category.id} // {String(idx + 1).padStart(2, '0')}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}

            </div>
        </section>
    );
}