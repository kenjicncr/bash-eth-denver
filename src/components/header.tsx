"use client";

import logo from "@/assets/logos/bash-logo.svg";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@nextui-org/react";
import type { NavbarProps } from "@nextui-org/react";
import { useState } from "react";

export const Header = (props: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      {...props}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "py-4 backdrop-filter-none bg-transparent fixed",
        wrapper: "px-0 w-full justify-center bg-transparent",
        item: "hidden md:flex",
      }}
      height="54px"
    >
      <NavbarContent
        className="gap-8 rounded-md border-small border-default-200/20 bg-background/60 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        justify="center"
      >
        {/* Toggle */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="ml-2 text-default-500 md:hidden"
        />

        {/* Logo */}
        <NavbarBrand className="mr-2 w-[40vw] md:w-auto md:max-w-fit">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={70}
              className="ml-2 hover:text-primary-300"
            />
          </Link>
        </NavbarBrand>

        {/* Items */}
        <NavbarItem className="hidden md:flex">
          <Link
            className="text-default-500 hover:text-primary-300"
            href="/#about"
            size="sm"
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 hover:text-primary-300"
            href="/#events"
            size="sm"
          >
            Events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-500 hover:text-primary-300"
            href="/#releases"
            size="sm"
          >
            Releases
          </Link>
        </NavbarItem>
        <NavbarItem className="ml-2 !flex">
          <Link href="/register" size="sm">
            <Button
              radius="sm"
              variant="flat"
              className="opacity-100 hover:text-primary-300 hover:text-opacity-100"
            >
              Register
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>


        {/* Menu */}
        <NavbarMenu
          className="top-[calc(var(--navbar-height)/2)] mx-auto max-w-[90vw] mt-16 max-h-[fit-content] rounded-md border-small border-default-200/20 bg-background/60 py-4 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: "easeInOut",
              duration: 0.2,
            },
          }}
        >
          <NavbarMenuItem>
            <Link
              className="w-full text-default-500 py-2"
              href="/#about"
              size="md"
              onPress={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              className="w-full text-default-500 py-2"
              href="/#events"
              size="md"
              onPress={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              className="w-full text-default-500 py-2"
              href="/#releases"
              size="md"
              onPress={() => setIsMenuOpen(false)}
            >
              Releases
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
  );
};
