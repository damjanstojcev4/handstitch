import { HeroNavigation } from "./HeroNavigation";
import { HeroCarousel } from "./HeroCarousel";

export const HeroSection = () => {
    return (
        <section className="relative h-screen w-full bg-transparent">
            <HeroNavigation />
            <HeroCarousel />
        </section>
    );
};
