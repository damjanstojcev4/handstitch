"use client";

import { ReactNode } from "react";
import { HeroNavigation } from "../hero/HeroNavigation";
import Footer from "../footer/Footer";
import { useTranslations } from "next-intl";

interface LegalLayoutProps {
    children: ReactNode;
    title: string;
    lastUpdated?: string;
}

const LegalLayout = ({ children, title, lastUpdated }: LegalLayoutProps) => {
    const t = useTranslations("legal.layout");

    return (
        <div className="min-h-screen flex flex-col text-zinc-300">
            {/* Navigation with solid background for readability */}
            <div className="bg-zinc-900 border-b border-zinc-800">
                <HeroNavigation />
            </div>

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-12 border-b border-zinc-800 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {title}
                        </h1>
                        {lastUpdated && (
                            <p className="text-sm text-black font-mono uppercase tracking-widest">
                                {t("last_updated")} {lastUpdated}
                            </p>
                        )}
                    </header>

                    <div className="prose prose-invert prose-zinc max-w-none space-y-12">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default function TermsOfServicePage() {
    const t = useTranslations("legal.terms");

    return (
        <LegalLayout title={t("title")} lastUpdated={t("last_updated_date")}>
            <section>
                <h2 className="text-xl font-semibold text-white">{t("s1.title")}</h2>
                <p className="mt-4">
                    {t("s1.p1")}
                </p>
                <p className="mt-4">
                    {t("s1.p2")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s2.title")}</h2>
                <p className="mt-4">
                    {t("s2.p1")}
                </p>
                <p className="mt-4">
                    {t("s2.p2")}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                    <li>{t("s2.li1")}</li>
                    <li>{t("s2.li2")}</li>
                    <li>{t("s2.li3")}</li>
                </ul>
                <p className="mt-4">
                    {t("s2.p3")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s3.title")}</h2>
                <p className="mt-4">
                    {t("s3.p1")}
                </p>
                <p className="mt-4">
                    {t("s3.p2")}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                    <li>{t("s3.li1")}</li>
                    <li>{t("s3.li2")}</li>
                    <li>{t("s3.li3")}</li>
                </ul>
                <p className="mt-4">
                    {t("s3.p3")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s4.title")}</h2>
                <p className="mt-4">
                    {t("s4.p1")}
                </p>
                <p className="mt-4">
                    {t("s4.p2")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s5.title")}</h2>
                <p className="mt-4">
                    {t("s5.p1")}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                    <li>{t("s5.li1")}</li>
                    <li>{t("s5.li2")}</li>
                    <li>{t("s5.li3")}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s6.title")}</h2>
                <p className="mt-4">
                    {t("s6.p1")}
                </p>
                <p className="mt-4">
                    {t("s6.p2")}
                </p>
                <p className="mt-4">
                    {t("s6.p3")}
                </p>
                <p className="mt-4">
                    {t("s6.p4")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s7.title")}</h2>
                <p className="mt-4">
                    {t("s7.p1")}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                    <li>{t("s7.li1")}</li>
                    <li>{t("s7.li2")}</li>
                    <li>{t("s7.li3")}</li>
                </ul>
                <p className="mt-4">
                    {t("s7.p2")}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                    <li>{t("s7.li4")}</li>
                    <li>{t("s7.li5")}</li>
                </ul>
                <p className="mt-4">
                    {t("s7.p3")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s8.title")}</h2>
                <p className="mt-4">
                    {t("s8.p1")}
                </p>
                <p className="mt-4">
                    {t("s8.p2")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s9.title")}</h2>
                <p className="mt-4">
                    {t("s9.p1")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s10.title")}</h2>
                <p className="mt-4">
                    {t("s10.p1")}
                </p>
                <p className="mt-4">
                    {t("s10.p2")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s11.title")}</h2>
                <p className="mt-4">
                    {t("s11.p1")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s12.title")}</h2>
                <p className="mt-4">
                    {t("s12.p1")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s13.title")}</h2>
                <p className="mt-4">
                    {t("s13.p1")}
                </p>
            </section>
        </LegalLayout>
    );
}
