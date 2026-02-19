"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

type FaqItem = {
    q: string;
    a: string;
};

function FaqItems({ items }: { items: FaqItem[] }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="mt-20 border-t border-white/10">
            {items.map((item, idx) => {
                const isOpen = open === idx;

                return (
                    <div key={idx} className="border-b border-white/10">
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : idx)}
                            className="w-full text-left py-10 group flex items-start justify-between gap-10"
                        >
                            <div className="flex gap-8 md:gap-16 items-start">
                                {/* Technical Index */}
                                <span className="font-mono text-[10px] text-white/20 mt-1 tracking-widest">
                                    [{String(idx + 1).padStart(2, "0")}]
                                </span>

                                <h3 className={`text-xl md:text-2xl uppercase tracking-tighter transition-all duration-500 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                                    {item.q}
                                </h3>
                            </div>

                            {/* Minimal Indicator: Vertical Line that rotates */}
                            <div className="relative w-4 h-4 mt-2">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40" />
                                <motion.div
                                    animate={{ rotate: isOpen ? 0 : 90 }}
                                    className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40"
                                />
                            </div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-12 pl-16 md:pl-32 max-w-4xl">
                                        <p className="text-sm md:text-base text-white/50 leading-relaxed font-light uppercase tracking-wide">
                                            {item.a}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

export default function FaqAccordion() {
    const t = useTranslations("faq");
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";

    const faqs: FaqItem[] = [
        { q: t("items.order.q"), a: t("items.order.a") },
        { q: t("items.payment.q"), a: t("items.payment.a") },
        { q: t("items.production.q"), a: t("items.production.a") },
        { q: t("items.change.q"), a: t("items.change.a") },
    ];

    return (
        <section className="relative text-white py-32 px-6 bg-transparent">

            <div className="relative max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 pl-8">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">
                            {t("title_1")} <br />
                            <span className="opacity-30 font-light tracking-tight">{t("title_2")}</span>
                        </h2>
                    </div>
                </header>
                <FaqItems items={faqs} />
            </div>
        </section>
    );
}