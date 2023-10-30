import RootClerkProvider from "@/app/ClerkProvider"

import { ItemsHeader } from "../ItemsHeader"
import ItemsListWrapper from "../ItemsListWrapper"

export const metadata = {
  title: "Goals",
}

export default function ItemsPage() {
  return (
    <>
      <ItemsHeader />
      <ItemsListWrapper />
    </>
  )
}
