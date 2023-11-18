import { AddUserReq, ProfileResp, UpdateProfileReq } from "@/types/userTypes"

import { HOST } from "../utils/apiConfig"

export const addUser = (token: string, user: AddUserReq) =>
  fetch(`${HOST}/api/add-user`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(user),
  }).then(res => res.json() as Promise<ProfileResp>)

export const updateUser = (token: string, user: UpdateProfileReq) =>
  fetch(`${HOST}/api/update-user`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(user),
  }).then(res => res.json() as Promise<ProfileResp>)

export const getUserInfo = (token: string) =>
  fetch(`${HOST}/api/user-info`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => res.json() as Promise<ProfileResp>)
