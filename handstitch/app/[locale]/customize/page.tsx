import WalletConfigurator from "../../components/canvas/WalletConfigurator";
import Footer from "../../components/footer/Footer";
import { HeroNavigation } from "../../components/hero/HeroNavigation";

export default async function CustomizePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <main className="w-full bg-neutral-950 min-h-screen flex flex-col">
            <HeroNavigation />
            <div className="pt-32 flex-grow">
                <WalletConfigurator />
            </div>
            <Footer />
        </main>
    );
}
