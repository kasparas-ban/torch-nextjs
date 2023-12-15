"use client"

import { Caveat, Gabarito } from "next/font/google"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import SignUpMessage from "@/components/accountUpdate/messages/signUp/SignUpMessage"
import HomeTitle from "@/public/images/home_title.jpg"

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
            <Image
              src="/images/underline.svg"
              className="absolute left-0 top-10 z-[1] w-64 sm:top-14"
              alt="Text underline"
              width={256}
              height={20}
            />
          </span>
        </h1>
      </div>

      <Image
        src={HomeTitle}
        className="mx-auto h-72 w-auto sm:h-96"
        alt="Person working with an hourglass in the background"
        title={`<a href="https://www.freepik.com/free-vector/work-time-concept-illustration_7117898.htm#query=time&position=37&from_view=search&track=sph&uuid=ecb0e5cc-d97d-43b1-afc2-422d67dda999">Image by storyset</a> on Freepik`}
        priority={true}
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

      <h2 className="mb-4 text-2xl font-bold text-gray-700 sm:mb-6 sm:text-3xl">
        Set your objectives
      </h2>
      <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row">
        <div className="ml-3 flex max-w-[360px] flex-col gap-3 sm:gap-5">
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">Add dreams</h5>
            <p className="text-gray-500">
              Large overarching goals that a user works towards over a year or
              more.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">Add goals</h5>
            <p className="text-gray-500">
              Larger objective composed of smaller tasks.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">Add tasks</h5>
            <p className="text-gray-500">
              Work that can be completed in under a day.
            </p>
          </div>
        </div>
        <div className="my-auto">
          <Image
            src="/images/home_1.svg"
            alt="Dream, goal, and task relationship diagram"
            width={391}
            height={259}
          />
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-gray-700 sm:mb-6 sm:text-3xl">
        Get focused
      </h2>
      <div className="mb-12 flex flex-col gap-8 sm:flex-row">
        <div className="flex w-full flex-col gap-10 sm:ml-3 sm:gap-5">
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="ml-3 flex flex-col gap-1 sm:ml-0">
              <h5 className="text-lg font-bold text-gray-700">
                Plan your tasks in pomodoro sessions
              </h5>
              <p className="text-gray-500">
                Work for 25 min, then take a 5 min break.
              </p>
            </div>
            <Image
              src="/images/home_2_1.svg"
              className="mx-auto mt-5 w-80 sm:m-0"
              alt="Diagram depicting one session of length 25 min and a break afterwards of 5 min."
              width={320}
              height={58}
            />
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="ml-3 flex flex-col gap-1 sm:ml-0">
              <h5 className="text-lg font-bold text-gray-700">
                Put in the hours
              </h5>
              <p className="text-gray-500">
                Take a longer 15 min break after 4 sessions.
              </p>
            </div>
            <Image
              src="/images/home_2_2.svg"
              alt="Diagram depicting 4 sessions and a 15 min break afterwards."
              className="mx-auto mt-5 w-80 sm:m-0"
              width={320}
              height={56}
            />
          </div>
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="ml-3 flex flex-col gap-1 sm:ml-0">
              <h5 className="text-lg font-bold text-gray-700">
                Configure session length
              </h5>
              <p className="max-w-[340px] text-gray-500">
                Set the length of your focus sessions and breaks to your liking.
              </p>
            </div>
            <Image
              src="/images/home_2_3.svg"
              alt="Input fields for setting session and break length."
              className="mx-auto mt-5 w-80 sm:m-0"
              width={320}
              height={80}
            />
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-gray-700 sm:mb-6 sm:text-3xl">
        Track your progress
      </h2>
      <div className="mb-12 flex flex-col gap-8 sm:flex-row">
        <div className="ml-3 flex flex-col gap-3 sm:gap-5">
          <div className="flex flex-col gap-1">
            <h5 className="text-lg font-bold text-gray-700">
              Get detailed statistics
            </h5>
            <p className="text-gray-500 sm:max-w-[400px]">
              Time spent focusing, time spent on tasks, observe your progress
              visually.
            </p>
          </div>
        </div>
        <div className="my-auto">
          <Image
            src="/images/home_3.svg"
            alt="A goal and its subtasks with a percentage of progress next to each."
            width={493}
            height={179}
          />
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-gray-700 sm:mb-6 sm:text-3xl">
        More coming soon
      </h2>
      <div className="mb-12 flex flex-col gap-8 sm:flex-row">
        <div className="ml-3 flex flex-col gap-3 sm:gap-5">
          <div className="flex flex-col gap-3">
            <h5 className="flex gap-2 text-lg font-bold text-gray-700">
              Calendar planning
              <span className="rounded-2xl bg-blue-300 px-2 py-1 text-sm font-semibold text-gray-900">
                coming soon
              </span>
            </h5>
            <ul className="ml-3 list-disc space-y-3 sm:ml-0">
              <li className="text-gray-500">
                Observe the progress you make day by day.
              </li>
              <li className="text-gray-500">
                More granular statistics on the progress you make day by day,
                month by month.
              </li>
              <li className="text-gray-500">
                Analyze the data, make plans for the future.
              </li>
            </ul>
          </div>
        </div>
        <div className="my-auto">
          <Image
            src="/images/home_4.svg"
            alt="A graph showing the time spend focusing day by day."
            width={345}
            height={165}
          />
        </div>
      </div>
      <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:gap-0">
        <div className="ml-3 flex flex-col gap-3 sm:gap-5">
          <div className="flex flex-col gap-3">
            <h5 className="flex gap-2 text-lg font-bold text-gray-700">
              Detailed statistics
              <span className="rounded-2xl bg-blue-300 px-2 py-1 text-sm font-semibold text-gray-900">
                coming soon
              </span>
            </h5>
            <ul className="ml-3 list-disc space-y-3 sm:ml-0">
              <li className="text-gray-500">
                Track where most of your time is spent.
              </li>
              <li className="text-gray-500">
                Set clear priorities and make sure you stick to them.
              </li>
              <li className="text-gray-500">
                Meet all the deadlines you&apos;ve set for yourself.
              </li>
            </ul>
          </div>
        </div>
        <div className="my-auto">
          <Image
            src="/images/home_5.svg"
            alt="A diagram showing the time spent focusing sorted by tasks."
            className="mx-auto max-w-[320px]"
            width={320}
            height={135}
          />
        </div>
      </div>
      <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:gap-0">
        <div className="ml-3 flex flex-col gap-3 sm:gap-5">
          <div className="flex max-w-[380px] flex-col gap-3">
            <h5 className="flex gap-2 text-lg font-bold text-gray-700">
              Building community
              <span className="rounded-2xl bg-blue-300 px-2 py-1 text-sm font-semibold text-gray-900">
                coming soon
              </span>
            </h5>
            <ul className="ml-3 list-disc space-y-3 sm:ml-0">
              <li className="text-gray-500">
                See what your peers are working towards.
              </li>
              <li className="text-gray-500">
                Exchange tips and advice with the people that have reached the
                goals you work towards.
              </li>
              <li className="text-gray-500">
                Inspire and motivate each other to reach for the highest goals.
              </li>
            </ul>
          </div>
        </div>
        <div className="my-auto">
          <Image
            src="/images/home_6.svg"
            alt="A list of people with their avatars and their total time spent focusing ranked by country and total time spent."
            className="mx-auto max-w-[320px]"
            width={320}
            height={143}
          />
        </div>
      </div>

      <SignUpMessage />
    </div>
  )
}
