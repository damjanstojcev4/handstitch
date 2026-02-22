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

export default function PrivacyPolicyPage() {
    const t = useTranslations("legal.privacy");

    return (
        <LegalLayout title={t("title")} lastUpdated={t("last_updated_date")}>
            <section>
                <h2 className="text-xl font-semibold text-white">{t("s1.title")}</h2>
                <p className="mt-4">
                    {t("s1.p1")}
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
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s3.title")}</h2>
                <p className="mt-4">
                    {t("s3.p1")}
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                    <li>{t("s3.li1")}</li>
                    <li>{t("s3.li2")}</li>
                    <li>{t("s3.li3")}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s4.title")}</h2>
                <p className="mt-4">
                    {t("s4.p1")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s5.title")}</h2>
                <p className="mt-4">
                    {t("s5.p1")}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">{t("s6.title")}</h2>
                <p className="mt-4">
                    {t("s6.p1")}
                </p>
            </section>
        </LegalLayout>
    );
}