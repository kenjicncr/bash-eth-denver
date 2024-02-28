"use client";

import ScrollingBanner from "./scrolling-banner";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import exiledRacersWhite from "@/assets/brands/exiled-racers-white.png";
import moonbeamWhite from "@/assets/brands/moonbeam-white.png";
import polkadotWhite from "@/assets/brands/polkadot-white.png";
import hydradxWhite from "@/assets/brands/hydradx-white.png";
import bifrostWhite from "@/assets/brands/bifrost-white.png";
import alephZeroWhite from "@/assets/brands/aleph-zero-white.png";
import distractiveWhite from "@/assets/brands/distractive-white.png";
import moonbeansWhite from "@/assets/brands/moonbeans-white.png";
import novaWalletWhite from "@/assets/brands/nova-wallet-white.png";
import subWalletWhite from "@/assets/brands/subwallet-white.png";

const logos = [
  {
    key: "aleph-zero",
    logo: (
      <div className="w-[100px] filter grayscale">
        <Image src={alephZeroWhite} alt="aleph zero logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "subwallet",
    logo: (
      <div className="w-[250px]">
        <Image src={subWalletWhite} alt="subwallet logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "nova-wallet",
    logo: (
      <div className="w-[140px]">
        <Image src={novaWalletWhite} alt="nova wallet logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "distractive",
    logo: (
      <div className="w-[167px]">
        <Image src={distractiveWhite} alt="distractive logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "polkadot",
    logo: (
      <div className="w-[250px]">
        <Image src={polkadotWhite} alt="polkadotlogo" />
      </div>
    ),
    link: "",
  },
  {
    key: "moonbeans",
    logo: (
      <div className="w-[300px]">
        <Image src={moonbeansWhite} alt="moonbeans logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "moonbeam",
    logo: (
      <div className="w-[200px]">
        <Image src={moonbeamWhite} alt="moonbeam logo" />
      </div>
    ),
    link: "",
  },

  {
    key: "exiled-racers",
    logo: (
      <div className="w-[190px]">
        <Image
          src={exiledRacersWhite}
          height={25}
          width={258}
          alt="exiled racers logo"
        />
      </div>
    ),
    link: "",
  },
  {
    key: "hydradx",
    logo: (
      <div className="w-[220px]">
        <Image src={hydradxWhite} alt="hydradx logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "bifrost",
    logo: (
      <div className="w-[200px]">
        <Image src={bifrostWhite} alt="bifrost logo" />
      </div>
    ),
    link: "",
  },
];

const scrollInLeft: Variants = {
  offscreen: {
    opacity: 0,
    x: -30,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const fadeIn: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

export const LandingPagePartners = (props: { DisplayTitle?: boolean }) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 mt-20">
      {props.DisplayTitle && (
        <motion.div
          variants={scrollInLeft}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          className="text-4xl w-full md:text-8xl text-white font-black py-10"
        >
          Presented by
        </motion.div>
      )}
      <motion.div
        variants={fadeIn}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <ScrollingBanner shouldPauseOnHover={false} gap="40px">
          {logos.map(({ key, logo }) => (
            <div
              key={key}
              className="flex m md:my-10 items-center justify-center text-foreground flex-column"
            >
              {logo}
            </div>
          ))}
        </ScrollingBanner>
      </motion.div>
    </section>
  );
};
