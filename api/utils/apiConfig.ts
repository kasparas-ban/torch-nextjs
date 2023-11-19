export const HOST =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BE_HOSTNAME_DEV
    : process.env.NEXT_PUBLIC_BE_HOSTNAME

export const FE_HOST =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_FE_HOSTNAME_DEV
    : process.env.NEXT_PUBLIC_FE_HOSTNAME
