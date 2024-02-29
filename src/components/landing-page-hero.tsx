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
      transition: { delay: 1.6, duration: 4 }, // Customize the duration as needed
    },
  };

  const closingPartyVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }, // Customize delay for "The Official Eth Denver Closing Party"
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }, // Customize as needed
    },
  };

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.5 }, // Customize delay for logo
    },
  };

  const registerButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 2 }, // Customize delay for "REGISTER" button
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
              linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent 100%),
            /* Left fade */
              linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, transparent 100%),
            /* Right fade */
              linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          background-repeat: no-repeat;
          /* Adjust these percentages to control the fade size */
          background-size: 100% 20%, 100% 30%, 20% 100%, 20% 100%;
          background-position: top, bottom, left, right;
          pointer-events: none; /* Ensures clicks pass through to the video */
        }
      `}</style>
      <motion.div
        className="relative w-full md:min-h-screen flex-1 flex-col flex justify-center items-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={videoVariants}
          initial="hidden"
          animate="visible"
          className="absolute w-full h-screen z--1"
        >
          <video
            playsInline
            autoPlay
            loop
            muted
            className="w-full h-screen object-cover"
          >
            <source src="/videos/Rave-Bash-Edit.mp4" type="video/mp4" />
          </video>
          <div className="z-10 custom-gradient"></div>
        </motion.div>
        <motion.div
          variants={closingPartyVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl 2xl:text-6xl  w-full lowercase text-white z-10 mt-6 px-4 md:px-10 font-black md:max-w-6xl mx-auto"
        >
          <motion.p variants={childVariants}>The</motion.p>
          <motion.p variants={childVariants} className="text-primary-500">
            Official
          </motion.p>
          <motion.p variants={childVariants}>Eth Denver</motion.p>
          <motion.p variants={childVariants}>Closing Party</motion.p>
        </motion.div>
        <motion.div
          variants={logoVariants}
          className="w-full my-2 z-10 px-4 md:px-10 md:mt-11 md:max-w-6xl mx-auto"
        >
          <Image priority className="w-full" src={logo} alt="bash logo" />
        </motion.div>
        <div className="flex flex-col justify-center mt-10 xl:mt-20 items-center">
          <motion.div
            variants={registerButtonVariants}
            className="mx-auto"
            whileHover={{ scale: 1.1 }}
          >
            <Button
              variant="solid"
              className="text-white text-2xl px-10 py-2 rounded-md bg-primary-500"
              size="lg"
              as={Link}
              href="/register"
            >
              REGISTER
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
