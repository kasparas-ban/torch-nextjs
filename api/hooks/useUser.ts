import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { UpdateProfileReq } from "@/types/userTypes"

import { updateUser } from "../endpoints/userAPI"
import { CustomError, ItemLoadFetchErrorMsg } from "../utils/errorMsgs"

export const useUpdateUser = () => {
  const { getToken } = useAuth()

  const fetcher = async (data: UpdateProfileReq) => {
    try {
      const token = await getToken()
      if (!token) throw new Error("Token not found")
      const updatedUser = await updateUser(token, data)

      return updatedUser
    } catch (err) {
      throw new CustomError(err as string, ItemLoadFetchErrorMsg)
    }
  }

  return useMutation({
    mutationFn: (data: UpdateProfileReq) => fetcher(data),
  })
}
