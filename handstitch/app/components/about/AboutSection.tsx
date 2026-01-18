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

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-120px" });

    const features = [
        {
            number: "01",
            title: "Full-Grain Leather",
            description:
                "Sourced from the finest tanneries, our leather develops a unique patina that tells your story.",
        },
        {
            number: "02",
            title: "Hand-Stitched",
            description:
                "Traditional saddle-stitching creates bonds stronger than machine alternatives.",
        },
        {
            number: "03",
            title: "Minimalist Design",
            description:
                "Clean lines and thoughtful details that age beautifully over time.",
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
                            Our Story
                        </motion.span>

                        <motion.h2
                            variants={fadeUp}
                            className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
                        >
                            Crafted with
                            <br />
                            <span className="italic text-[#c08a5a]">Purpose & Care</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-[#57534e] text-base leading-relaxed max-w-xl mb-12"
                        >
                            For over a decade, our workshop has been dedicated to creating
                            leather goods that stand the test of time. Each wallet that leaves
                            our hands carries the passion and precision of true craftsmanship.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex items-center gap-12">
                            <div>
                                <p className="font-display text-4xl md:text-5xl">10+</p>
                                <p className="text-[#78716c] text-sm mt-1">
                                    Years of Craft
                                </p>
                            </div>

                            <div className="h-14 w-px bg-[#d6d3d1]" />

                            <div>
                                <p className="font-display text-4xl md:text-5xl">5k+</p>
                                <p className="text-[#78716c] text-sm mt-1">
                                    Happy Clients
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
