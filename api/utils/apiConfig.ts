import { env } from "@/env.mjs"

export const HOST =
  process.env.NODE_ENV === "development"
    ? env.NEXT_PUBLIC_BE_HOSTNAME_DEV
    : env.NEXT_PUBLIC_BE_HOSTNAME

export const FE_HOST =
  process.env.NODE_ENV === "development"
    ? env.NEXT_PUBLIC_FE_HOSTNAME_DEV
    : env.NEXT_PUBLIC_FE_HOSTNAME
