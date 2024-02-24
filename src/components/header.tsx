import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logos/bash-logo.svg";

export const Header = () => {
  return (
    <header className="absolute w-full bg-transparent text-white py-4 px-2 lg:p-4 flex justify-center">
      <div className="flex justify-between items-center margin-auto max-w-screen-2xl w-full">
        <div>
          <Link href="/">
            <Image src={logo} alt="Logo" className="h-6 lg:h-8" />
          </Link>
        </div>
        <nav>
          <Link href="/register" className="mr-4">
            join
          </Link>
          <Link href="/#events" className="mr-4">
            events
          </Link>
          <Link href="/#releases" className="mr-4">
            releases
          </Link>
        </nav>
      </div>
    </header>
  );
};
