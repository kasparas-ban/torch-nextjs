export const HOST =
  process.env.NODE_ENV === "development"
    ? process.env.BE_HOSTNAME_DEV
    : process.env.BE_HOSTNAME
