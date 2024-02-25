import Image from "next/image";
import logo from "@/assets/logos/bash-logo.svg";
import Link from "next/link";
import { LandingPageMarquee } from "./landing-page-marquee";
import { LandingPageArtistsSection } from "./landing-page-artists-section";
import { LandingPageUpcomingEvents } from "./landing-page-upcoming-events";
import { LandingPageAbout } from "./landing-page-about";
import { LandingPageEthDenverPosters } from "./landing-page-eth-denver-posters";

export const LandingPage = () => {
  return (
    <div>
      <section className="h-screen lg:h-auto w-full flex-col flex justify-center items-center">
        <div className=" w-full lg:min-h-screen flex-1 flex-col flex justify-center items-center">
          <Image
            priority
            className="w-1/2 md:w-1/4"
            src={logo}
            alt="bash logo"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="mt-2">
              records and events for artists and their communities
            </p>
            <Link
              href="/register"
              className="mt-8 w-full max-w-48 inline-flex h-12 px-7 justify-center items-center gap-10 flex-shrink-0 rounded-md border-2 border-teal-400 bg-gray-300 bg-opacity-25"
            >
              register
            </Link>
          </div>
        </div>
        <section className="a">
          <LandingPageEthDenverPosters />
        </section>
      </section>

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
    </div>
  );
};
