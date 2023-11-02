import { UpdateProfileReq } from "@/types/userTypes"

import { HOST } from "../utils/apiConfig"

export const updateUser = (token: string, user: UpdateProfileReq) =>
  fetch(`${HOST}/api/update-user`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(user),
  })
