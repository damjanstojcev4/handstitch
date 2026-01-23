"use client";

import { Instagram, Facebook, Music2 } from "lucide-react"; // Music2 = TikTok icon vibe
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="bg-[#1c1917] text-[#e7e5e4]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="font-display text-2xl tracking-[0.3em] mb-4">
                            HANDSTITCH
                        </h3>
                        <p className="text-sm text-[#a8a29e] max-w-md leading-relaxed">
                            {t("description")}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] mb-4 text-[#d6d3d1]">
                            {t("explore_title")}
                        </h4>
                        <ul className="space-y-3 text-sm text-[#a8a29e]">
                            <li><a href="#about" className="hover:text-white transition-colors">{t("about")}</a></li>
                            <li><a href="#gallery" className="hover:text-white transition-colors">{t("gallery")}</a></li>
                            <li><a href="#builder" className="hover:text-white transition-colors">{t("builder")}</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] mb-4 text-[#d6d3d1]">
                            {t("follow_title")}
                        </h4>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                                className="p-2 rounded-full border border-[#44403c] hover:border-[#c08a5a] hover:text-[#c08a5a] transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>

                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                aria-label="TikTok"
                                className="p-2 rounded-full border border-[#44403c] hover:border-[#c08a5a] hover:text-[#c08a5a] transition-all"
                            >
                                <Music2 className="w-5 h-5" />
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                aria-label="Facebook"
                                className="p-2 rounded-full border border-[#44403c] hover:border-[#c08a5a] hover:text-[#c08a5a] transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-14 border-t border-[#292524]" />

                {/* Bottom */}
                <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-[#78716c]">
                    <p>
                        © {new Date().getFullYear()} Handstitch. {t("rights")}
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#e7e5e4] transition-colors">
                            {t("privacy")}
                        </a>
                        <a href="#" className="hover:text-[#e7e5e4] transition-colors">
                            {t("terms")}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
