import { useAuth } from "@clerk/nextjs"
import useSWR from "swr"

import { FormattedItems, ResponseItem } from "@/types/itemTypes"

import { HOST } from "./apiConfig"
import {
  CustomError,
  ItemLoadFetchErrorMsg,
  ItemLoadNotSignedInErrorMsg,
  ItemLoadServerErrorMsg,
  PostFetchErrorMsg,
} from "./errorMsgs"
import { formatItemResponse } from "./responseFormatters"

// export const useItemsList = (enabled = true) => {
//   const { getToken } = useAuth()
//   const { setIsStorageUsed } = useStorage()
//   const { setItems } = useListStore()

//   const { isLoading, error, data } = useQuery<FormattedItems, CustomError>(
//     ["items"],
//     async () => {
//       let items = { tasks: [], goals: [], dreams: [] } as FormattedItems
//       const token = await getToken()

//       if (token) {
//         const response = await fetch(`${HOST}/api/items`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//           .then(res => {
//             if (!res.ok) throw new CustomError("", ItemLoadServerErrorMsg)
//             return res.json()
//           })
//           .then(data => {
//             const formattedItems = formatItemResponse(data)
//             setIsStorageUsed(false)
//             setItems(formattedItems)
//             return formattedItems
//           })
//           .catch(err => {
//             setIsStorageUsed(true)
//             throw new CustomError(err, ItemLoadFetchErrorMsg)
//           })
//         items = response
//       } else {
//         setIsStorageUsed(true)
//         throw new CustomError("", ItemLoadNotSignedInErrorMsg)
//       }

//       return items
//     },
//     {
//       refetchOnWindowFocus: false,
//       retry: 2,
//       enabled,
//     }
//   )
//   return { isLoading, error, data }
// }

// export const useAddNewItem = () => {
//   const { getToken } = useAuth()

//   const { data, mutate, isLoading, isError, isSuccess, mutateAsync, reset } =
//     useMutation({
//       mutationFn: async (newItem: NewTaskType | NewGoalType | NewDreamType) => {
//         const token = await getToken()
//         if (token) {
//           return fetch(`${HOST}/api/add-item`, {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             body: JSON.stringify(newItem),
//           })
//             .then(res => {
//               if (!res.ok) throw new CustomError("", PostFetchErrorMsg)
//               return res.json() as Promise<ItemResponse>
//             })
//             .catch(err => {
//               throw new CustomError(err, PostFetchErrorMsg)
//             })
//         } else {
//           // TODO: add to localStorage
//         }
//         return undefined
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["items"] })
//       },
//     })

//   return { isLoading, isError, isSuccess, data, mutate, mutateAsync, reset }
// }

// export const useUpdateItem = () => {
//   const { getToken } = useAuth()

//   const { data, mutate, isLoading, isError, isSuccess, mutateAsync, reset } =
//     useMutation({
//       mutationFn: async (
//         item: UpdateTaskType | UpdateGoalType | UpdateDreamType
//       ) => {
//         const token = await getToken()
//         if (token) {
//           return fetch(`${HOST}/api/update-item`, {
//             method: "PUT",
//             headers: { Authorization: `Bearer ${token}` },
//             body: JSON.stringify(item),
//           })
//             .then(res => {
//               if (!res.ok) throw new CustomError("", PostFetchErrorMsg)
//               return res.json() as Promise<ItemResponse>
//             })
//             .catch(err => {
//               throw new CustomError(err, PostFetchErrorMsg)
//             })
//         } else {
//           // TODO: add to localStorage
//         }
//         return undefined
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["items"] })
//       },
//     })

//   return { isLoading, isError, isSuccess, data, mutate, mutateAsync, reset }
// }

// export const useUpsertItem = () => {
//   const { getToken } = useAuth()

//   const { data, mutate, isLoading, isError, isSuccess, mutateAsync, reset } =
//     useMutation({
//       mutationFn: async (
//         item:
//           | NewTaskType
//           | NewGoalType
//           | NewDreamType
//           | UpdateTaskType
//           | UpdateGoalType
//           | UpdateDreamType
//       ) => {
//         const token = await getToken()
//         const endpoint = (item as UpdateTaskType).itemID
//           ? `${HOST}/api/update-item`
//           : `${HOST}/api/add-item`
//         const method = (item as UpdateTaskType).itemID ? "PUT" : "POST"

//         if (token) {
//           return fetch(endpoint, {
//             method: method,
//             headers: { Authorization: `Bearer ${token}` },
//             body: JSON.stringify(item),
//           })
//             .then(res => {
//               if (!res.ok) throw new CustomError("", PostFetchErrorMsg)
//               return res.json() as Promise<ItemResponse>
//             })
//             .catch(err => {
//               throw new CustomError(err, PostFetchErrorMsg)
//             })
//         } else {
//           // TODO: add to localStorage
//         }
//         return undefined
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["items"] })
//       },
//     })

//   return { isLoading, isError, isSuccess, data, mutate, mutateAsync, reset }
// }

// export const useRemoveItem = () => {
//   const { getToken } = useAuth()

//   const { data, mutate, isLoading, isError, isSuccess, mutateAsync, reset } =
//     useMutation({
//       mutationFn: async (itemID: number) => {
//         const token = await getToken()
//         if (token) {
//           return fetch(`${HOST}/api/remove-item/${itemID}`, {
//             method: "DELETE",
//             headers: { Authorization: `Bearer ${token}` },
//           })
//             .then(res => {
//               if (!res.ok) throw new CustomError("", PostFetchErrorMsg)
//               return res.json() as Promise<ItemResponse>
//             })
//             .catch(err => {
//               throw new CustomError(err, PostFetchErrorMsg)
//             })
//         } else {
//           // TODO: add to localStorage
//         }
//         return undefined
//       },
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["items"] })
//       },
//     })

//   return { isLoading, isError, isSuccess, data, mutate, mutateAsync, reset }
// }
