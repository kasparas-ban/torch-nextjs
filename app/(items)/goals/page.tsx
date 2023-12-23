import { ItemsHeader } from "../ItemsHeader"
import ItemsListWrapper from "../ItemsListWrapper"

export const metadata = {
  // TODO: need to be "Tasks" or "Dreams" as well
  title: "Goals",
}

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-[650px]">
      <ItemsHeader />
      <ItemsListWrapper />
    </div>
  )
}
