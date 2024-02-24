import Marquee from "react-fast-marquee";

export const LandingPageMarquee = () => {
  return (
    <Marquee speed={200}>
      <p className="font-display font-semibold text-[150px]">
        Records and events fueled by artists and their community. New rules for
        a new age.
      </p>
    </Marquee>
  );
};
