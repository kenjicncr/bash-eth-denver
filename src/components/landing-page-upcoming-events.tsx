import Link from "next/link";
import { CustomButton } from "./custom-button";

export const LandingPageUpcomingEvents = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <h3 className="mb-8 lg:mb-4 text-2xl font-display">Upcoming Events</h3>
      <div
        style={
          {
            // borderImageSource: `linear-gradient(to left, transparent, rgba( 255,255,255,0.3 ), transparent)`,
          }
        }
        className="border-white flex flex-col lg:flex-row justify-between border border-solid items-center border-image-slice border-1 border-l-0 border-b-0 border-r-0 border-image-source from-transparent to-rgba(255, 255, 255, 0.3) py-8 px-4 rounded-5 bg-transparent transition duration-200 ease-in-out"
      >
        <p>02 March</p>
        <p>{`{ ETH Denver Official Closing Party }`}</p>
        <Link
          href="/register"
          className="mt-8 lg:mt-0 w-full max-w-48 inline-flex h-8 px-7 justify-center items-center gap-10 flex-shrink-0 rounded-md border-2 border-teal-400 bg-gray-300 bg-opacity-25"
        >
          register
        </Link>
      </div>
      <div
        style={
          {
            // borderImageSource: `linear-gradient(to left, transparent, rgba( 255,255,255,0.3 ), transparent)`,
          }
        }
        className="border-white flex flex-col lg:flex-row justify-between border border-solid items-center border-image-slice border-1 border-l-0 border-r-0 border-image-source from-transparent to-rgba(255, 255, 255, 0.3) py-8 px-4 rounded-5 bg-transparent transition duration-200 ease-in-out"
      >
        <p>11 July</p>
        <p>{`{ ETH CC Brussels }`}</p>
        <button
          disabled
          className="mt-8 lg:mt-0 w-full max-w-48 inline-flex h-8 px-7 justify-center items-center gap-10 flex-shrink-0 rounded-md border-2 bg-opacity-25 opacity-25"
        >
          register
        </button>
      </div>
    </div>
  );
};
