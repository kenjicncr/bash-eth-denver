import Image from "next/image";
import ethDenverPoster1 from "@/assets/posters/bash_v1Announce_blue_march2.png";
import ethDenverPoster2 from "@/assets/posters/bash_v1Announce_green_march2.png";
import ethDenverPoster3 from "@/assets/posters/bash_v1Announce_march2.gif";
import ethDenverPoster4 from "@/assets/posters/bash_v1Announce_red_march2.png";

export const LandingPageEthDenverPosters = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-x-0.2 h-auto w-full max-w-screen overflow-hidden">
      <Image
        className="max-w-[20vw]"
        src={ethDenverPoster1}
        alt="eth denver poster 1"
        priority
      />
      <Image
        className="max-w-[20vw]"
        src={ethDenverPoster3}
        alt="eth denver poster 5"
        priority
      />
      <Image
        className="max-w-[20vw]"
        src={ethDenverPoster2}
        alt="eth denver poster 2"
        priority
      />
      <Image
        className="max-w-[20vw]"
        src={ethDenverPoster4}
        alt="eth denver poster 4"
        priority
      />
      <Image
        className="max-w-[20vw]"
        src={ethDenverPoster3}
        alt="eth denver poster 3"
        priority
      />
    </div>
  );
};
