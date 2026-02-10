import { HeroNavigation } from "./HeroNavigation";
import { VideoHero } from "./VideoHero";

export const HeroSection = () => {
    return (
        <section className="relative h-screen w-full bg-transparent">
            <VideoHero />
            <HeroNavigation />
        </section>
    );
};
