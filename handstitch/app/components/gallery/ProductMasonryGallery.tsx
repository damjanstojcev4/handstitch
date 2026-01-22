"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type MasonryItem = {
    id: string;
    name: string;
    image: string;
    aspect: "square" | "portrait" | "tall";
};

const items: MasonryItem[] = [
    { id: "g-1", name: "Classic Black Bifold", image: "/images/546436515_122096519985020281_4415343646267545739_n.jpg", aspect: "square" },
    { id: "g-2", name: "Artisanal Edge Detail", image: "/images/552522358_122104400997020281_694213600290559959_n.jpg", aspect: "portrait" },
    { id: "g-3", name: "Hand-Stitched Precision", image: "/images/557220436_122106441363020281_2319041315717865038_n.jpg", aspect: "tall" },
    { id: "g-4", name: "Minimalist Card Holder", image: "/images/563469698_122108983131020281_2955405601556831165_n.jpg", aspect: "portrait" },
    { id: "g-5", name: "Premium Leather Texture", image: "/images/567959351_122109841209020281_7686338352310610774_n.jpg", aspect: "square" },
    { id: "g-6", name: "Crafting Process", image: "/images/574467771_18265604473305159_1745983052576790227_n.jpg", aspect: "portrait" },
    { id: "g-7", name: "Deep Brown Tones", image: "/images/590799450_122114886291020281_1461608871504418950_n.jpg", aspect: "tall" },
    { id: "g-8", name: "Studio Essentials", image: "/images/593358930_122115788811020281_5171511066035341247_n.jpg", aspect: "portrait" },
    { id: "g-9", name: "The Finished Piece", image: "/images/619755095_122121184857020281_417368984718098857_n.jpg", aspect: "square" },
];

const aspectClass: Record<MasonryItem["aspect"], string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    tall: "aspect-[2/3]",
};

export const ProductMasonryGallery = () => {
    return (
        <section
            id="gallery"
            aria-label="Product photo gallery"
            className="relative overflow-hidden py-24 md:py-32 bg-[#faf9f6] text-[#1c1917]"
        >
            {/* Same subtle accent treatment as About */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-[55%] skew-x-12 -translate-x-1/3 bg-[#c08a5a]/5 hidden md:block" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.6 }}
                >

                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight uppercase font-semibold">
                                Our Most Popular Products
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 mt-3 text-[#57534e]">
                                <span className="text-sm">Can't find what you're looking for?</span>

                                <a
                                    href="#builder"
                                    className="
                                        relative font-display font-medium
                                        text-[#c08a5a]
                                        uppercase tracking-[0.18em] text-[11px]
                                        after:absolute after:left-0 after:-bottom-0.5
                                        after:h-px after:w-full after:bg-[#c08a5a]
                                        after:origin-left after:scale-x-0
                                        hover:after:scale-x-100
                                        after:transition-transform after:duration-300   
                                        "
                                >
                                    Build your own
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Masonry Columns */}
                <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 [column-fill:_balance]">
                    {items.map((it, idx) => (
                        <motion.figure
                            key={it.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.45, delay: idx * 0.03 }}
                            className="mb-6 lg:mb-8 break-inside-avoid"
                        >
                            <div
                                className={[
                                    "group relative overflow-hidden rounded-2xl",
                                    "bg-white/60 backdrop-blur",
                                    "border border-[#e7e5e4]",
                                    "hover:border-[#c08a5a]/50",
                                    "hover:shadow-[0_20px_60px_-20px_rgba(192,138,90,0.35)]",
                                    "transition-all duration-300",
                                    aspectClass[it.aspect],
                                ].join(" ")}
                            >
                                <Image
                                    src={it.image}
                                    alt={it.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
                                    priority={idx < 2}
                                />

                                {/* Soft gradient overlay like your hero vibe, but subtle */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1917]/35 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* On-image caption pill (same tone as About cards) */}
                                <div className="absolute left-4 right-4 bottom-4">
                                    <div className="inline-flex max-w-full items-center rounded-full bg-white/55 backdrop-blur border border-[#e7e5e4] px-3 py-1.5">
                                        <span className="truncate font-display text-[11px] uppercase tracking-[0.22em] text-[#1c1917]/80">
                                            {it.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Under-caption (matches your muted text style) */}
                            <figcaption className="mt-3 font-display text-[11px] uppercase tracking-[0.22em] text-[#78716c]">
                                {it.name}
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductMasonryGallery;
