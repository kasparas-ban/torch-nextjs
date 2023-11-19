import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateEmailReq, UpdateProfileReq } from "@/types/userTypes"

import { updateUser, updateUserEmail } from "../endpoints/userAPI"
import { CustomError, ItemLoadFetchErrorMsg } from "../utils/errorMsgs"

export const useUpdateUser = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}

export const useUpdateUserEmail = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const fetcher = async (data: UpdateEmailReq) => {
    try {
      const token = await getToken()
      if (!token) throw new Error("Token not found")
      const updatedUser = await updateUserEmail(token, data)

      return updatedUser
    } catch (err) {
      throw new CustomError(err as string, ItemLoadFetchErrorMsg)
    }
  }

  return useMutation({
    mutationFn: (data: UpdateEmailReq) => fetcher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}
