import Marquee from "react-fast-marquee";

export const LandingPageMarquee = () => {
  return (
    <div className="relative">
      <Marquee speed={100}>
        <p className="font-display font-bold text-2xl md:text-6xl h-fit-content py-2">
          Records and events fueled by artists and their community. New rules
          for a new age.&nbsp;
        </p>
      </Marquee>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 custom-black-gradient"></div>
    </div>
  );
};
