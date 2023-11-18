export const HOST =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BE_HOSTNAME_DEV
    : process.env.NEXT_PUBLIC_BE_HOSTNAME
