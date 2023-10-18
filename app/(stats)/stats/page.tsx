import ComingSoon from "@/components/CommingSoon"

export const metadata = {
  title: "Stats",
}

export default function StatsPage() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-5xl font-bold text-gray-400">
        Stats
      </h1>
      <ComingSoon />
    </>
  )
}
