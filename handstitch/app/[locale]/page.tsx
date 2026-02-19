import { HeroSection } from "../components/hero/HeroSection";
import AboutSection3 from "../components/about/AboutSection";
import StudioGallery from "../components/gallery/StudioGallery";
import { getTranslations } from "next-intl/server";
import FaqAccordion from "../components/faq/FaqAccordion";
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
            <div id="women">
                <StudioGallery />
            </div>
            <FaqAccordion />
            <Footer />
        </main>
    );
}
