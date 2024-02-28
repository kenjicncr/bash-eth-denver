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

export const Logo1 = (
  <svg
    fill="none"
    height="41"
    viewBox="0 0 168 41"
    width="168"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M49.2775 28.9524H61.2295V25.3524H53.5255V11.7924H49.2775V28.9524Z"
      fill="currentColor"
    />
    <path
      d="M68.3107 26.5524C66.6067 26.5524 65.7187 25.0644 65.7187 22.8324C65.7187 20.6004 66.6067 19.0884 68.3107 19.0884C70.0147 19.0884 70.9267 20.6004 70.9267 22.8324C70.9267 25.0644 70.0147 26.5524 68.3107 26.5524ZM68.3347 29.3364C72.2947 29.3364 74.8867 26.5284 74.8867 22.8324C74.8867 19.1364 72.2947 16.3284 68.3347 16.3284C64.3987 16.3284 61.7587 19.1364 61.7587 22.8324C61.7587 26.5284 64.3987 29.3364 68.3347 29.3364Z"
      fill="currentColor"
    />
    <path
      d="M81.7411 33.2004C83.5651 33.2004 85.1731 32.7924 86.2531 31.8324C87.2371 30.9444 87.8851 29.6004 87.8851 27.7524V16.6644H84.1411V17.9844H84.0931C83.3731 16.9524 82.2691 16.3044 80.6371 16.3044C77.5891 16.3044 75.4771 18.8484 75.4771 22.4484C75.4771 26.2164 78.0451 28.2804 80.8051 28.2804C82.2931 28.2804 83.2291 27.6804 83.9491 26.8644H84.0451V28.0884C84.0451 29.5764 83.3491 30.4404 81.6931 30.4404C80.3971 30.4404 79.7491 29.8884 79.5331 29.2404H75.7411C76.1251 31.8084 78.3571 33.2004 81.7411 33.2004ZM81.7171 25.3764C80.2531 25.3764 79.2931 24.1764 79.2931 22.3284C79.2931 20.4564 80.2531 19.2564 81.7171 19.2564C83.3491 19.2564 84.2131 20.6484 84.2131 22.3044C84.2131 24.0324 83.4211 25.3764 81.7171 25.3764Z"
      fill="currentColor"
    />
    <path
      d="M95.5835 26.5524C93.8795 26.5524 92.9915 25.0644 92.9915 22.8324C92.9915 20.6004 93.8795 19.0884 95.5835 19.0884C97.2875 19.0884 98.1995 20.6004 98.1995 22.8324C98.1995 25.0644 97.2875 26.5524 95.5835 26.5524ZM95.6075 29.3364C99.5675 29.3364 102.159 26.5284 102.159 22.8324C102.159 19.1364 99.5675 16.3284 95.6075 16.3284C91.6715 16.3284 89.0315 19.1364 89.0315 22.8324C89.0315 26.5284 91.6715 29.3364 95.6075 29.3364Z"
      fill="currentColor"
    />
    <path
      d="M103.302 28.9524H107.214V16.6644H103.302V28.9524ZM103.302 14.9604H107.214V11.7924H103.302V14.9604Z"
      fill="currentColor"
    />
    <path
      d="M108.911 33.0084H112.823V27.6804H112.871C113.639 28.7124 114.767 29.3364 116.351 29.3364C119.567 29.3364 121.703 26.7924 121.703 22.8084C121.703 19.1124 119.711 16.3044 116.447 16.3044C114.767 16.3044 113.567 17.0484 112.727 18.1524H112.655V16.6644H108.911V33.0084ZM115.343 26.3124C113.663 26.3124 112.703 24.9444 112.703 22.9524C112.703 20.9604 113.567 19.4484 115.271 19.4484C116.951 19.4484 117.743 20.8404 117.743 22.9524C117.743 25.0404 116.831 26.3124 115.343 26.3124Z"
      fill="currentColor"
    />
    <path
      d="M128.072 29.3364C131.288 29.3364 133.664 27.9444 133.664 25.2564C133.664 22.1124 131.12 21.5604 128.96 21.2004C127.4 20.9124 126.008 20.7924 126.008 19.9284C126.008 19.1604 126.752 18.8004 127.712 18.8004C128.792 18.8004 129.536 19.1364 129.68 20.2404H133.28C133.088 17.8164 131.216 16.3044 127.736 16.3044C124.832 16.3044 122.432 17.6484 122.432 20.2404C122.432 23.1204 124.712 23.6964 126.848 24.0564C128.48 24.3444 129.968 24.4644 129.968 25.5684C129.968 26.3604 129.224 26.7924 128.048 26.7924C126.752 26.7924 125.936 26.1924 125.792 24.9684H122.096C122.216 27.6804 124.472 29.3364 128.072 29.3364Z"
      fill="currentColor"
    />
    <path
      d="M138.978 29.3124C140.682 29.3124 141.762 28.6404 142.65 27.4404H142.722V28.9524H146.466V16.6644H142.554V23.5284C142.554 24.9924 141.738 26.0004 140.394 26.0004C139.146 26.0004 138.546 25.2564 138.546 23.9124V16.6644H134.658V24.7284C134.658 27.4644 136.146 29.3124 138.978 29.3124Z"
      fill="currentColor"
    />
    <path
      d="M148.168 28.9524H152.08V22.0644C152.08 20.6004 152.8 19.5684 154.024 19.5684C155.2 19.5684 155.752 20.3364 155.752 21.6564V28.9524H159.664V22.0644C159.664 20.6004 160.36 19.5684 161.608 19.5684C162.784 19.5684 163.336 20.3364 163.336 21.6564V28.9524H167.248V20.9604C167.248 18.2004 165.856 16.3044 163.072 16.3044C161.488 16.3044 160.168 16.9764 159.208 18.4644H159.16C158.536 17.1444 157.312 16.3044 155.704 16.3044C153.928 16.3044 152.752 17.1444 151.984 18.4164H151.912V16.6644H148.168V28.9524Z"
      fill="currentColor"
    />
    <path
      d="M25.4099 1.97689L21.4769 0.923031L18.1625 13.2926L15.1702 2.12527L11.2371 3.17913L14.4701 15.2446L6.41746 7.19201L3.53827 10.0712L12.371 18.904L1.37124 15.9566L0.317383 19.8896L12.336 23.11C12.1984 22.5165 12.1256 21.8981 12.1256 21.2627C12.1256 16.7651 15.7716 13.1191 20.2692 13.1191C24.7668 13.1191 28.4128 16.7651 28.4128 21.2627C28.4128 21.894 28.3409 22.5086 28.205 23.0986L39.1277 26.0253L40.1815 22.0923L28.1151 18.8591L39.1156 15.9115L38.0617 11.9785L25.9958 15.2115L34.0484 7.15895L31.1692 4.27976L22.459 12.99L25.4099 1.97689Z"
      fill="currentColor"
    />
    <path
      d="M28.1943 23.1444C27.8571 24.57 27.1452 25.8507 26.1684 26.8768L34.0814 34.7899L36.9606 31.9107L28.1943 23.1444Z"
      fill="currentColor"
    />
    <path
      d="M26.0884 26.9596C25.0998 27.9693 23.8505 28.7228 22.4495 29.1111L25.3289 39.8571L29.2619 38.8032L26.0884 26.9596Z"
      fill="currentColor"
    />
    <path
      d="M22.3026 29.1504C21.6526 29.3175 20.9713 29.4063 20.2692 29.4063C19.517 29.4063 18.7886 29.3043 18.0971 29.1134L15.2151 39.8692L19.1481 40.923L22.3026 29.1504Z"
      fill="currentColor"
    />
    <path
      d="M17.9581 29.0737C16.5785 28.6661 15.3514 27.903 14.383 26.8904L6.45052 34.8229L9.32971 37.7021L17.9581 29.0737Z"
      fill="currentColor"
    />
    <path
      d="M14.3168 26.8203C13.365 25.8013 12.6717 24.5377 12.3417 23.1341L1.38334 26.0704L2.43719 30.0034L14.3168 26.8203Z"
      fill="currentColor"
    />
  </svg>
);

const logos = [
  {
    key: "subwallet",
    logo: (
      <div className="w-[250px]">
        <Image src={subWalletWhite} alt="moonbeam logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "nova-wallet",
    logo: (
      <div className="w-[250px]">
        <Image src={novaWalletWhite} alt="nova wallet logo" />
      </div>
    ),
    link: "",
  },

  {
    key: "polkadot",
    logo: (
      <div className="w-[250px]">
        <Image src={polkadotWhite} alt="exiled racers logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "bifrost",
    logo: (
      <div className="w-[250px]">
        <Image src={bifrostWhite} alt="bifrost logo" />
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
        <Image src={polkadotWhite} alt="exiled racers logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "moonbeans",
    logo: (
      <div className="w-[250px]">
        <Image src={moonbeansWhite} alt="moonbeans logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "moonbeam",
    logo: (
      <div className="w-[167px]">
        <Image src={moonbeamWhite} alt="moonbeam logo" />
      </div>
    ),
    link: "",
  },

  {
    key: "exiled-racers",
    logo: (
      <div className="w-[200px]">
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
    key: "moonbeans",
    logo: (
      <div className="w-[250px]">
        <Image src={moonbeansWhite} alt="moonbeans logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "hydradx",
    logo: (
      <div className="w-[250px]">
        <Image src={hydradxWhite} alt="hydradx logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "bifrost",
    logo: (
      <div className="w-[250px]">
        <Image src={bifrostWhite} alt="bifrost logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "polkadot",
    logo: (
      <div className="w-[250px]">
        <Image src={polkadotWhite} alt="exiled racers logo" />
      </div>
    ),
    link: "",
  },
  {
    key: "polkadot",
    logo: (
      <div className="w-[250px]">
        <Image src={polkadotWhite} alt="exiled racers logo" />
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

export const LandingPagePartners = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 mt-20">
      <motion.div
        variants={scrollInLeft}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="text-4xl w-full md:text-8xl text-white font-black py-10"
      >
        Presented by
      </motion.div>
      <motion.div
        variants={fadeIn}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <ScrollingBanner shouldPauseOnHover gap="40px">
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
