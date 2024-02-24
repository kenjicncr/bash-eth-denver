import Image from "next/image";
import logo from "@/assets/logos/bash-logo.svg";

export const LandingPageAbout = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="max-w-screen-sm">
        <Image src={logo} alt="Logo" />
        <p className="mt-4 text-lg">
          is a party and record label that toys with a possible future for
          music. Artists control how they release records, customize their
          community, and tour and perform in many formats.
        </p>
        <p className="mt-4 text-lg font-display font-bold">
          The future is now.
        </p>
      </div>
    </div>
  );
};
