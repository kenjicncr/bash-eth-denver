import { LandingPageMarquee } from "./landing-page-marquee";
import { LandingPageArtistsSection } from "./landing-page-artists-section";
import { LandingPageUpcomingEvents } from "./landing-page-upcoming-events";
import { LandingPageAbout } from "./landing-page-about";
import { LandingPageEthDenverPosters } from "./landing-page-eth-denver-posters";
import { LandingPageHero } from "./landing-page-hero";
import { LandingPagePartners } from "./landing-page-partners";

export const LandingPage = () => {
  return (
    <div>
      <section className="h-screen lg:h-auto w-full flex-col flex justify-center items-center">
        <LandingPageHero />
      </section>

      <LandingPagePartners />

      <section className="py-24">
        <LandingPageMarquee />
      </section>

      <section className="py-24 px-4" id="events">
        <LandingPageUpcomingEvents />
      </section>
      <section className="py-24 px-4">
        <LandingPageAbout />
      </section>
      <section id="releases">
        <LandingPageArtistsSection />
      </section>

      <section className="a mt-20">
        <LandingPageEthDenverPosters />
      </section>
    </div>
  );
};
