"use client";

import Image from "next/image";
import { Instagram, Facebook, Music2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const t = useTranslations("footer");
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <footer className="bg-zinc-900 text-[#e7e5e4] border-t border-[#292524]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        {/* Logo Image */}
                        <div className="mb-6">
                            <Image
                                src="/images/logo.png"
                                alt="Handstitch Logo"
                                width={120}
                                height={120}
                                className="h-25 w-auto object-contain brightness-0 invert"
                                priority
                            />
                        </div>
                        <p className="text-sm text-[#a8a29e] max-w-md leading-relaxed">
                            {t("description")}
                        </p>
                        <div className="mt-8">
                            <Link
                                href={`/${locale}/customize`}
                                className="inline-block px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#c08a5a] hover:text-white transition-all duration-300"
                            >
                                {t("builder")}
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] mb-4 text-[#d6d3d1]">
                            {t("explore_title")}
                        </h4>
                        <ul className="space-y-3 text-sm text-[#a8a29e]">
                            <li><Link href={`/${locale}/#about`} className="hover:text-white transition-colors">{t("about")}</Link></li>
                            <li><Link href={`/${locale}/#gallery`} className="hover:text-white transition-colors">{t("gallery")}</Link></li>
                            <li><Link href={`/${locale}/customize`} className="hover:text-white transition-colors">{t("builder")}</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] mb-4 text-[#d6d3d1]">
                            {t("follow_title")}
                        </h4>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.instagram.com/handstitch_mk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="p-2 rounded-full border border-[#44403c] hover:border-[#c08a5a] hover:text-[#c08a5a] transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>

                            <a
                                href="https://www.instagram.com/handstitch_mk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="p-2 rounded-full border border-[#44403c] hover:border-[#c08a5a] hover:text-[#c08a5a] transition-all"
                            >
                                <Music2 className="w-5 h-5" />
                            </a>

                            <a
                                href="https://www.instagram.com/handstitch_mk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
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
                        <Link href={`/${locale}/terms-of-service`} className="hover:text-[#e7e5e4] transition-colors">
                            {t("terms")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}