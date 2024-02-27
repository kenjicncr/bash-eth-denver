"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import logo from "@/assets/logos/bash-logo.svg";
import Link from "next/link";

export const LandingPageHero = () => {
  // Animation variants for the sequential fade-in effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5, // Adjust time between each fade-in
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className=" w-full lg:min-h-screen flex-1 flex-col flex justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={itemVariants}
        className="md:text-3xl text-xl text-white"
      >
        Presenting
      </motion.p>
      <motion.div variants={itemVariants}>
        <Image priority className="w-1/2 my-10" src={logo} alt="bash logo" />
      </motion.div>
      <div className="flex flex-col justify-center items-center">
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-3xl text-white"
        >
          The Official Eth Denver Closing Party
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link href="/register" className="mt-20 mx-auto">
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
  );
};
