import { useAuth } from "@clerk/clerk-react"
import { FormattedItems, ResponseItem } from "@/types/itemTypes"

import { HOST } from "../utils/apiConfig"
import { CustomError, ItemLoadFetchErrorMsg } from "../utils/errorMsgs"
import { formatItemResponse } from "../utils/responseFormatters"

export const useItemsList = () => {
  const { getToken } = useAuth()

  const fetcher = async () => {
    let formattedItems = {
      tasks: [],
      goals: [],
      dreams: [],
    } as FormattedItems

    try {
      const token = await getToken()
      // if (!token) throw new Error("Token not found")

      const rawResponse = await fetch(`http://localhost:3003/api/items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const jsonResponse: ResponseItem[] = await rawResponse.json()

      formattedItems = formatItemResponse(jsonResponse)
    } catch (err) {
      throw new CustomError(err as string, ItemLoadFetchErrorMsg)
    }

    return formattedItems
  }

  // return useSWR("items", fetcher)
  return {
    data: { tasks: [], goals: [], dreams: [] },
    isLoading: false,
    error: false,
  }
}
