import Image from "next/image";
import ethDenverPoster1 from "@/assets/posters/eth-denver-blue.jpg";
import ethDenverPoster2 from "@/assets/posters/eth-denver-green.jpg";
import ethDenverPoster3 from "@/assets/posters/eth-denver-all.gif";
import ethDenverPoster4 from "@/assets/posters/eth-denver-yellow.jpg";

export const LandingPageEthDenverPosters = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-x-0.2 h-auto w-full max-w-screen overflow-hidden">
      <Image
        className="w-full md:hidden"
        src={ethDenverPoster3}
        alt="eth denver poster 1"
        priority
      />

      <Image
        className="hidden md:w-1/6 md:inline"
        src={ethDenverPoster1}
        alt="eth denver poster 1"
        priority
      />

      <Image
        className="hidden md:inline w-1/6 "
        src={ethDenverPoster2}
        alt="eth denver poster 5"
        priority
      />
      <Image
        className="hidden md:inline w-1/6"
        src={ethDenverPoster4}
        alt="eth denver poster 2"
        priority
      />
      <Image
        className="hidden md:inline w-1/6"
        src={ethDenverPoster1}
        alt="eth denver poster 4"
        priority
      />
      <Image
        className="hidden md:inline w-1/6"
        src={ethDenverPoster2}
        alt="eth denver poster 3"
        priority
      />
      <Image
        className="hidden md:inline w-1/6"
        src={ethDenverPoster4}
        alt="eth denver poster 3"
        priority
      />
    </div>
  );
};
