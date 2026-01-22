import { HeroSection } from "../components/hero/HeroSection";
import WalletConfigurator from "../components/canvas/WalletConfigurator";
import AboutSection from "../components/about/AboutSection";
import { useTranslations } from "next-intl";
import ProductMasonryGallery from "../components/gallery/ProductMasonryGallery";

export default function Home() {
    const t = useTranslations("configurator");

    return (
        <main className="w-full">
            <HeroSection />
            <AboutSection />
            <ProductMasonryGallery />

            <section id="builder" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">
                        {t("title")}
                    </h1>

                    <WalletConfigurator />
                </div>
            </section>
        </main>
    );
}
