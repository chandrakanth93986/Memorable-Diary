'use client'

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import React from "react";
import { Spotlight } from "../components/ui/Spotlight";
import { FaHandPointRight } from "react-icons/fa";
import { ImagesSlider } from "../components/ui/images-slider";
import { AuroraBackground } from "../components/ui/aurora-background";
import Link from "next/link";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { HiComputerDesktop } from "react-icons/hi2";
import { CiMobile3 } from "react-icons/ci";
import { FaTabletAlt } from "react-icons/fa";
import { WavyBackground } from "../components/ui/wavy-background";

const images = [
  'https://img.freepik.com/free-photo/barefoot-silhouette-walking-along-tropical-waters-edge-generated-by-ai_188544-30551.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701302400&semt=ais',
  "https://freepics.ai/files/preview/1280x853/121704307719yotncp2edmcfoiry4x3arucf7my2zqyqwzd1tsxrlzwdetnmu1ucztftrfr3majkxmcryaswimn3cw6e1naavwbfnizhdhbby3d0.jpg",
  "https://res.cloudinary.com/enchanting/q_70,f_auto,c_lfill,g_auto/exodus-web/2021/12/22219.jpg"
];

export default function Home() {
  const session = useSession();
  const status = session.status

  if (status === 'loading') {
    return
    (
      <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
    )
  }
  const word1 = "Today's Journey"
  const word2 = 'may be the best Memory'
  return (
    <div>
      <div>
        {/* <ImagesSlider className="h-[40rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            The hero section slideshow <br /> nobody asked for
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Join now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider> */}
        <div className="h-screen w-full flex flex-col md:items-center md:justify-center bg-diary antialiased bg-grid-white/[0.02] relative overflow-hidden md:flex-row">
          <ImagesSlider className="h-screen" images={images}>
            <motion.div
              initial={{
                opacity: 0,
                y: -80,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="z-50 flex flex-col justify-center items-center"
            >
              <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
                <TextGenerateEffect words={word1} />
                <TextGenerateEffect words={word2} />
              </motion.p>
              <button className="px-1 py-1 backdrop-blur-sm border bg-emerald-300/10 border-white-500/20 text-white mx-auto text-center rounded-md relative mt-4">
                <span>
                  <Link href={'/register'}>
                    <button className="bg-diary p-1 md:px-4 md:py-2 rounded-md text-white text-sm md:text-xl flex items-center gap-3 justify-center ">Start Your Journey! <span className="text-xl md:text-3xl animate-pulse"><FaHandPointRight></FaHandPointRight></span>
                    </button>
                  </Link>
                </span>
                <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
              </button>
            </motion.div>

            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="orange"
            />

          </ImagesSlider>
        </div>
        <AuroraBackground className="bg-white text-diary">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-5xl font-bold dark:text-white text-center">
              Any time - Any where!
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-2">
              Always with you.
            </div>
            <button className="bg-black dark:bg-white rounded-xl w-fit text-white dark:text-black p-10">
              One can read and write diaries from any place, with any device.
              <div className="flex flex-col md:flex-row items-center justify-around my-4">
                <div>
                  Desktop
                  <HiComputerDesktop className="text-9xl" />
                </div>
                <div>
                  Phone
                  <CiMobile3 className="text-9xl" />
                </div>
                <div>
                  Tablet
                  <FaTabletAlt className="text-9xl" />
                </div>
              </div>
            </button>
          </motion.div>
        </AuroraBackground>
        <div className="relative h-[40rem] overflow-hidden flex items-center justify-center border">
          <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl md:text-4xl lg:text-7xl text-diary font-bold text-center mb-8">Start writing today and make memories</h2>
            <p className="text-base md:text-lg text-diary text-center mb-4">Find yourself!</p>
            <Link href={'/register'}>
              <button className="bg-diary p-1 md:px-4 md:py-2 rounded-md text-white text-sm md:text-xl flex items-center gap-3 justify-center ">Start Your Journey! <span className="text-xl md:text-3xl animate-pulse"><FaHandPointRight></FaHandPointRight></span>
              </button>
            </Link>
          </WavyBackground>
        </div>
      </div >

    </div>
  );
}
