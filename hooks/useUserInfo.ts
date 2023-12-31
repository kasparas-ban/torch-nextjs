import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "@/api/endpoints/userAPI"

export default function useUserInfo() {
  const { getToken } = useAuth()

  const fetchUserInfo = async () => {
    const token = await getToken()
    if (token) {
      const userInfo = await getUserInfo(token)
      return userInfo
    }
    throw Error("Failed to get user info")
  }

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
    staleTime: Infinity,
  })
}
