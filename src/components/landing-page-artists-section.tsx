"use client";
import Image from "next/image";
import { motion, useAnimate, stagger, easeIn } from "framer-motion";
import barry from "@/assets/posters/barry.jpeg";
import roland from "@/assets/posters/roland.jpeg";
import secondcityuk from "@/assets/posters/secondcityuk.jpeg";
import antlarock from "@/assets/posters/ant-larock.png";
import jadalareign from "@/assets/posters/jadalareign.jpg";

export const LandingPageArtistsSection = () => {
  const [scope, animate] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();
  const [scope4, animate4] = useAnimate();
  const [scope5, animate5] = useAnimate();

  const createMouseHandler = (animateFunc: any) => {
    return {
      handleMouseEnter: () => {
        animateFunc(
          "span",
          {
            opacity: 1,
          },
          {
            delay: stagger(0.05, { from: "center" }),
          }
        );
      },
      handleMouseLeave: () => {
        animateFunc("span", {
          opacity: 0,
        });
      },
    };
  };

  const { handleMouseEnter, handleMouseLeave } = createMouseHandler(animate);
  const {
    handleMouseEnter: handleMouseEnter2,
    handleMouseLeave: handleMouseLeave2,
  } = createMouseHandler(animate2);
  const {
    handleMouseEnter: handleMouseEnter3,
    handleMouseLeave: handleMouseLeave3,
  } = createMouseHandler(animate3);
  const {
    handleMouseEnter: handleMouseEnter4,
    handleMouseLeave: handleMouseLeave4,
  } = createMouseHandler(animate4);
  const {
    handleMouseEnter: handleMouseEnter5,
    handleMouseLeave: handleMouseLeave5,
  } = createMouseHandler(animate5);

  return (
    <div className="items flex flex-wrap w-full">
      <motion.div
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        className="item w-full md:w-1/3"
      >
        <div className="item-img">
          <Image src={barry} alt="barry" />
        </div>
        <div ref={scope} className="item-copy">
          <div className="item-copy-1">
            <div className="shape">
              <div id="number" className="font-orbitron text-50 font-bold">
                <span>0</span>
                <span>1</span>
              </div>
            </div>
          </div>
          <div className="item-copy-2">
            <div className="shape">
              <div>
                <span>b</span>
                <span>a</span>
                <span>s</span>
                <span>h</span>
              </div>
              <div className="text-right">
                <span>p</span>
                <span>a</span>
                <span>s</span>
                <span>t /</span>
                <span>e</span>
                <span>v</span>
                <span>e</span>
                <span>n</span>
                <span>t</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onHoverStart={handleMouseEnter2}
        onHoverEnd={handleMouseLeave2}
        className="item w-full md:w-1/3"
        id="item-2"
      >
        <div className="item-img pt-100">
          <Image src={secondcityuk} alt="roland" />
        </div>
        <div ref={scope2} className="item-copy">
          <div className="item-copy-1">
            <div className="shape">
              <div id="number" className="text-right">
                <span>0</span>
                <span>2</span>
              </div>
            </div>
          </div>
          <div className="item-copy-2">
            <div className="shape">
              <div className="text-right">
                <span>b</span>
                <span>a</span>
                <span>s</span>
                <span>h</span>
                <span></span>
                <span>0</span>
                <span>0</span>
                <span>2</span>
              </div>
              <div>
                <span>u</span>
                <span>p</span>
                <span>c</span>
                <span>o</span>
                <span>m</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onHoverStart={handleMouseEnter3}
        onHoverEnd={handleMouseLeave3}
        className="item w-full md:w-1/3"
        id="item-3"
      >
        <div className="item-img">
          <Image src={roland} alt="roland" />
        </div>
        <div ref={scope3} className="item-copy">
          <div className="item-copy-1">
            <div className="shape">
              <div id="number" className="text-right">
                <span>0</span>
                <span>3</span>
              </div>
            </div>
          </div>
          <div className="item-copy-3">
            <div className="shape">
              <div className="text-right">
                <span>b</span>
                <span>a</span>
                <span>s</span>
                <span>h</span>
                <span></span>
                <span>0</span>
                <span>0</span>
                <span>2</span>
              </div>
              <div>
                <span>u</span>
                <span>p</span>
                <span>c</span>
                <span>o</span>
                <span>m</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onHoverStart={handleMouseEnter4}
        onHoverEnd={handleMouseLeave4}
        className="item w-full md:w-1/3"
        id="item-3"
      >
        <div className="item-img">
          <Image src={antlarock} alt="ant larock" />
        </div>
        <div ref={scope4} className="item-copy">
          <div className="item-copy-1">
            <div className="shape">
              <div id="number" className="text-right">
                <span>0</span>
                <span>4</span>
              </div>
            </div>
          </div>
          <div className="item-copy-3">
            <div className="shape">
              <div className="text-right">
                <span>b</span>
                <span>a</span>
                <span>s</span>
                <span>h</span>
                <span></span>
                <span>0</span>
                <span>0</span>
                <span>2</span>
              </div>
              <div>
                <span>u</span>
                <span>p</span>
                <span>c</span>
                <span>o</span>
                <span>m</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onHoverStart={handleMouseEnter5}
        onHoverEnd={handleMouseLeave5}
        className="item w-full md:w-1/3"
      >
        <div className="item-img">
          <Image src={jadalareign} alt="bezland" />
        </div>
        <div ref={scope5} className="item-copy">
          <div className="item-copy-1">
            <div className="shape">
              <div id="number" className="font-orbitron text-50 font-bold">
                <span>0</span>
                <span>5</span>
              </div>
            </div>
          </div>
          <div className="item-copy-2">
            <div className="shape">
              <div>
                <span>b</span>
                <span>a</span>
                <span>s</span>
                <span>h</span>
              </div>
              <div className="text-right">
                <span>p</span>
                <span>a</span>
                <span>s</span>
                <span>t /</span>
                <span>e</span>
                <span>v</span>
                <span>e</span>
                <span>n</span>
                <span>t</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="item w-full md:w-1/3 bg-primary-500 flex items-end justify-end min-h-[424px]">
        <div className="font-black text-8xl p-4">And More...</div>
      </motion.div>
    </div>
  );
};
