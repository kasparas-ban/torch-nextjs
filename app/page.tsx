"use client"

import { Caveat, Gabarito } from "next/font/google"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import SignUpMessage from "@/components/accountUpdate/messages/signUp/SignUpMessage"

const fontGabarito = Gabarito({ subsets: ["latin"], variable: "--font-title" })
const fontCaveat = Caveat({ subsets: ["latin"], variable: "--font-freestyle" })

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <h1
          className={cn(
            "mt-6 w-[340px] text-center text-[44px] font-bold leading-[1] text-gray-800 sm:mt-10 sm:w-[460px] sm:text-6xl",
            fontGabarito.className
          )}
        >
          From <span className="text-rose-500">hours</span> to{" "}
          <span className="text-rose-500">dreams</span>{" "}
          <span className="relative">
            <span className="relative z-[2]">achieved</span>
            <img
              src="/images/underline.svg"
              className="absolute left-0 top-10 z-[1] w-64 sm:top-14"
              alt="Text underline"
            />
          </span>
        </h1>
      </div>

      <img
        src="/images/home_title.jpg"
        className="mx-auto h-72 sm:h-96"
        alt="Person working with an hourglass in the background"
        title={`<a href="https://www.freepik.com/free-vector/work-time-concept-illustration_7117898.htm#query=time&position=37&from_view=search&track=sph&uuid=ecb0e5cc-d97d-43b1-afc2-422d67dda999">Image by storyset</a> on Freepik`}
      />

      <p className="mx-auto mb-4 max-w-[420px] text-center text-lg leading-relaxed text-gray-700 sm:mb-3 sm:text-xl">
        Supercharge your focus, accomplish your goals, track your progress, be
        part of the community, and achieve your dreams.
      </p>

      <p
        className={cn(
          "mb-5 text-center text-3xl font-semibold text-gray-800 sm:text-4xl",
          fontCaveat.className
        )}
      >
        No account needed, it&apos;s{" "}
        <span className="relative top-[2px] text-4xl font-bold text-rose-500 sm:text-5xl">
          free!
        </span>
      </p>

      <div className="mx-auto mb-10 flex max-w-[320px] gap-3 sm:mb-16">
        <Button
          className="bg-multi-color h-12 w-20 rounded-xl text-xl brightness-100 hover:brightness-125 sm:text-2xl"
          asChild
        >
          <motion.button whileTap={{ scale: 0.97 }}>Join</motion.button>
        </Button>
        <span className="m-auto text-xl">or</span>
        <Button
          className="h-12 rounded-xl  bg-rose-500 text-[18px] hover:bg-rose-400"
          asChild
        >
          <motion.button whileTap={{ scale: 0.97 }}>
            Start using for free
          </motion.button>
        </Button>
      </div>

      <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
        Set your objectives
      </h2>
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="ml-3 flex flex-col gap-3 sm:gap-5">
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">Add dreams</h5>
            <p className="font-medium text-gray-500">
              Large overarching goals that a user works towards over a year or
              more.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">Add goals</h5>
            <p className="font-medium text-gray-500">
              Larger objective composed of smaller tasks.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">Add tasks</h5>
            <p className="font-medium text-gray-500">
              Work that can be completed in under a day.
            </p>
          </div>
        </div>
        <div className="my-auto">
          <img
            src="/images/home_1.svg"
            alt="Dream, goal, and task relationship diagram"
          />
        </div>
      </div>
      <SignUpMessage />
    </div>
  )
}
