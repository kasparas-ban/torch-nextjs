import { ItemsHeader } from "../ItemsHeader"
import ItemsList from "../ItemsList"

export const metadata = {
  title: "Goals",
}

export default function ItemsPage() {
  return (
    <div className="pt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px]">
        <ItemsHeader />
        {/* <ItemsList /> */}
      </div>
    </div>
  )
}
