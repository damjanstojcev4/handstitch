import { HeroSection } from "./components/hero/HeroSection";
import WalletConfigurator from "./components/canvas/WalletConfigurator";
import AboutSection from "./components/about/AboutSection";

export default function Home() {
  return (
    <main className="w-full">

      {/* HERO — full width, full height */}
      <HeroSection />
      <AboutSection />

      {/* CONFIGURATOR — contained */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Custom Wallet Builder
          </h1>

          <WalletConfigurator />
        </div>
      </section>

    </main>
  );
}
