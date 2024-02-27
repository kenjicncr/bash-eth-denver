"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import logo from "@/assets/logos/bash-logo.svg";
import Link from "next/link";

export const LandingPageHero = () => {
  const videoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.6,
      transition: { delay: 2.5, duration: 4 }, // Customize the duration as needed
    },
  };

  const presentingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5 }, // Customize delay for "Presenting"
    },
  };

  const closingPartyVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.5 }, // Customize delay for "The Official Eth Denver Closing Party"
    },
  };

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 2.5 }, // Customize delay for logo
    },
  };

  const registerButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 3.5 }, // Customize delay for "REGISTER" button
    },
  };

  return (
    <>
      <style jsx>{`
        .custom-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
          /* Top fade */ linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.8) 0%,
              transparent 100%
            ),
            /* Bottom fade */
              linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%),
            /* Left fade */
              linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, transparent 100%),
            /* Right fade */
              linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          background-repeat: no-repeat;
          /* Adjust these percentages to control the fade size */
          background-size: 100% 20%, 100% 20%, 20% 100%, 20% 100%;
          background-position: top, bottom, left, right;
          pointer-events: none; /* Ensures clicks pass through to the video */
        }
      `}</style>
      <motion.div
        className="relative w-full lg:min-h-screen flex-1 flex-col flex justify-center items-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={videoVariants}
          initial="hidden"
          animate="visible"
          className="absolute w-full h-100vh z--1"
        >
          <video autoPlay loop muted className="w-screen h-screen object-cover">
            <source src="/videos/Rave-Bash-Edit.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-10 custom-gradient"></div>
        </motion.div>

        <motion.p
          variants={presentingVariants}
          className="md:text-3xl text-xl text-white z-10 font-black"
        >
          Presenting
        </motion.p>
        <motion.p
          variants={closingPartyVariants}
          className="text-xl md:text-3xl text-primary-500 z-10 mt-6 font-black"
        >
          The Official Eth Denver Closing Party
        </motion.p>
        <motion.div
          variants={logoVariants}
          className="w-full md:w-1/2 my-20 z-10"
        >
          <Image
            priority
            className="w-[90vw] my-4 mx-auto"
            src={logo}
            alt="bash logo"
          />
        </motion.div>
        <div className="flex flex-col justify-center items-center">
          <motion.div variants={registerButtonVariants} className="mx-auto">
            <Link href="/register">
              <Button
                variant="solid"
                className="text-white text-2xl px-20 py-2 rounded-full bg-primary-500"
                size="lg"
              >
                REGISTER
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
