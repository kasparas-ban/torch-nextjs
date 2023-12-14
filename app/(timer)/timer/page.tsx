import TimerContainer from "@/components/timer/TimerContainer"

export const metadata = {
  title: "Timer",
}

export default function TimerPage() {
  return (
    <div className="mx-auto max-w-[650px]">
      <h1 className="mb-6 flex items-center text-5xl font-bold text-gray-400">
        Timer
      </h1>
      <TimerContainer />
    </div>
  )
}
