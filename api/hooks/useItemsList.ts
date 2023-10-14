import { useAuth } from "@clerk/nextjs"
import useSWR from "swr"

import { FormattedItems, ResponseItem } from "@/types/itemTypes"

import { HOST } from "../apiConfig"
import { CustomError, ItemLoadFetchErrorMsg } from "../errorMsgs"
import { formatItemResponse } from "../responseFormatters"

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
      if (!token) throw new Error("Token not found")

      const rawResponse = await fetch(`${HOST}/api/items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const jsonResponse: ResponseItem[] = await rawResponse.json()

      formattedItems = formatItemResponse(jsonResponse)
    } catch (err) {
      throw new CustomError(err as string, ItemLoadFetchErrorMsg)
    }

    return formattedItems
  }

  return useSWR("items", fetcher)
}
