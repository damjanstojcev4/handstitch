import { HeroSection } from "../components/hero/HeroSection";
import WalletConfigurator from "../components/canvas/WalletConfigurator";
import AboutSection3 from "../components/about/AboutSection";
import Gallery from "../components/gallery/Gallery";
import { getTranslations } from "next-intl/server";
import Footer from "../components/footer/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "configurator" });

    return (
        <main className="w-full">
            <HeroSection />
            <div id="men">
                <AboutSection3 />
            </div>
            <section
                id="builder"
                className="py-24 md:py-32 bg-transparent text-[#f5f1ea]"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-10">
                        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                            {t("title")}
                        </h1>
                    </div>

                    <WalletConfigurator />
                </div>
            </section>
            <div id="women">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
