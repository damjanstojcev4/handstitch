"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type MasonryItem = {
    id: string;
    image: string;
    aspect: "square" | "portrait" | "tall";
};

const items: MasonryItem[] = [
    { id: "g-1", image: "/images/546436515_122096519985020281_4415343646267545739_n.jpg", aspect: "square" },
    { id: "g-2", image: "/images/552522358_122104400997020281_694213600290559959_n.jpg", aspect: "portrait" },
    { id: "g-3", image: "/images/557220436_122106441363020281_2319041315717865038_n.jpg", aspect: "tall" },
    { id: "g-4", image: "/images/563469698_122108983131020281_2955405601556831165_n.jpg", aspect: "portrait" },
    { id: "g-5", image: "/images/567959351_122109841209020281_7686338352310610774_n.jpg", aspect: "square" },
    { id: "g-6", image: "/images/574467771_18265604473305159_1745983052576790227_n.jpg", aspect: "portrait" },
    { id: "g-7", image: "/images/590799450_122114886291020281_1461608871504418950_n.jpg", aspect: "tall" },
    { id: "g-8", image: "/images/593358930_122115788811020281_5171511066035341247_n.jpg", aspect: "portrait" },
    { id: "g-9", image: "/images/619755095_122121184857020281_417368984718098857_n.jpg", aspect: "square" },
];

const aspectClass: Record<MasonryItem["aspect"], string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    tall: "aspect-[2/3]",
};

export const ProductMasonryGallery = () => {
    const t = useTranslations("gallery");

    return (
        <section
            id="gallery"
            className="relative overflow-hidden py-32 text-[#f5f1ea]"
        >


            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* 2. HEADER: The "Spec-Sheet" Title */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#d0a87a]/20 pb-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="font-mono text-[10px] text-[#d0a87a] uppercase tracking-[0.4em] mb-4 block">
                            {t("visual_appendix")}
                        </span>
                        <h2 className="font-serif text-5xl md:text-6xl italic leading-none">
                            {t("title")}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-6 md:mt-0 text-right"
                    >
                        <a href="#builder" className="group font-mono text-[11px] uppercase tracking-widest text-[#d0a87a] flex items-center gap-4">
                            <span className="h-px w-12 bg-[#d0a87a]/30 group-hover:w-20 transition-all" />
                            {t("cta")}
                        </a>
                    </motion.div>
                </div>

                {/* 3. MASONRY: The "Pinned Prints" */}
                <div className="columns-2 lg:columns-3 gap-8 [column-fill:_balance]">
                    {items.map((it, idx) => {
                        const productName = t(`items.${it.id}`);
                        return (
                            <motion.figure
                                key={it.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: idx * 0.05 }}
                                className="mb-8 break-inside-avoid group relative"
                            >
                                {/* THE FRAME: Pinned Print Aesthetic */}
                                <div className="relative p-2 bg-[#161514] border border-[#d0a87a]/10 shadow-2xl transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]">

                                    {/* Small "Serial Number" stamped on the frame */}
                                    <span className="absolute top-4 left-4 z-20 font-mono text-[8px] text-[#d0a87a]/40 group-hover:text-[#d0a87a] transition-colors">
                                        REF_{idx + 104}
                                    </span>

                                    <div className={`relative overflow-hidden ${aspectClass[it.aspect]}`}>
                                        <Image
                                            src={it.image}
                                            alt={productName}
                                            fill
                                            className="object-cover transition-transform duration-1000 scale-105 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                        />

                                        {/* Physical Overlay: Slight vignette to mimic old photography */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-40" />
                                    </div>

                                    {/* The "Caption Label" - looks like a typed piece of tape */}
                                    <div className="mt-4 flex justify-between items-center px-2">
                                        <figcaption className="font-serif italic text-sm text-[#c9c1b6] opacity-80">
                                            {productName}
                                        </figcaption>
                                        <div className="h-4 w-4 border-r border-b border-[#d0a87a]/30" />
                                    </div>
                                </div>

                                {/* Decorative: Blueprint line extending from images */}
                                <div className="absolute -left-4 top-1/2 w-4 h-px bg-[#d0a87a]/20 hidden lg:block" />
                            </motion.figure>
                        );
                    })}
                </div>
            </div>

            {/* 4. FOOTER NOTATION */}
            <div className="max-w-7xl mx-auto px-6 mt-20 opacity-20">
                <p className="font-mono text-[9px] uppercase tracking-[0.6em] text-center border-t border-[#d0a87a]/20 pt-8">
                    {t("no_digital")}
                </p>
            </div>
        </section>
    );
};

export default ProductMasonryGallery;