"use client";
import Link from "next/link";
import { Variants, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";

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

export const LandingPageUpcomingEvents = () => {
  return (
    <div className="px-6">
      <motion.div
        variants={scrollInLeft}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        className="text-4xl w-full md:text-8xl text-white font-black py-10"
      >
        Upcoming Events
      </motion.div>
      <div className="border-white flex flex-col lg:flex-row justify-between border border-solid items-center border-image-slice border-1 border-l-0 border-b-0 border-r-0 border-image-source from-transparent to-rgba(255, 255, 255, 0.3) py-8 px-4 rounded-5 bg-transparent transition duration-200 ease-in-out gap-4">
        <p className="text-primary-500">02 March</p>
        <p>{`ETH Denver Official Closing Party`}</p>
        <Button
          radius="sm"
          variant="flat"
          className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
          as={NextLink}
          href="/register"
        >
          Register
        </Button>
      </div>
      <div className="border-white flex flex-col lg:flex-row justify-between border border-solid items-center border-image-slice border-1 border-l-0 border-r-0 border-image-source from-transparent to-rgba(255, 255, 255, 0.3) py-8 px-4 rounded-5 bg-transparent transition duration-200 ease-in-out gap-4">
        <p className="text-primary-500">11 July</p>
        <p>{`ETH CC Brussels`}</p>
        <Button radius="sm" variant="flat" isDisabled>
          Register
        </Button>
      </div>
    </div>
  );
};
