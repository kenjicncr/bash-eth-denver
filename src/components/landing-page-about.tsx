"use client";
import { Variants, motion } from "framer-motion";

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

export const LandingPageAbout = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:mt-20 w-full">
      <motion.div
        variants={scrollInLeft}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="w-full flex items-center text-4xl w-full md:text-8xl font-black"
      >
        <p>WTF</p>
        <p>&nbsp;is&nbsp;</p>
        <p className="text-primary-500">bash</p>
        <p>?</p>
      </motion.div>
      <motion.div
        variants={fadeIn}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <p className="mt-4 md:mt-10 text-lg">
          Bash is a party and record label that toys with a possible future for
          music. Artists control how they release records, customize their
          community, and tour and perform in many formats.
        </p>
        <p className="mt-4 text-lg font-display font-bold text-primary-500">
          The future is now.
        </p>
      </motion.div>
    </div>
  );
};
