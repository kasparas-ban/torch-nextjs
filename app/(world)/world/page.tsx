import ComingSoon from "@/components/CommingSoon"

export const metadata = {
  title: "World",
}

export default function WorldPage() {
  return (
    <div className="mx-auto max-w-[650px]">
      <h1 className="mb-6 flex items-center text-5xl font-bold text-gray-400">
        World
      </h1>
      <ComingSoon />
    </div>
  )
}
