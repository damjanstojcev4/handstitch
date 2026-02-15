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
            <WalletConfigurator />
            <div id="women">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
