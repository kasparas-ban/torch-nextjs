import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_BE_HOSTNAME_DEV: z.string().url().min(1),
    NEXT_PUBLIC_BE_HOSTNAME: z.string().url().min(1),
  },
  client: {
    NEXT_PUBLIC_BE_HOSTNAME_DEV: z.string().url().min(1),
    NEXT_PUBLIC_BE_HOSTNAME: z.string().url().min(1),
    NEXT_PUBLIC_FE_HOSTNAME_DEV: z.string().url().min(1),
    NEXT_PUBLIC_FE_HOSTNAME: z.string().url().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BE_HOSTNAME_DEV: process.env.NEXT_PUBLIC_BE_HOSTNAME_DEV,
    NEXT_PUBLIC_BE_HOSTNAME: process.env.NEXT_PUBLIC_BE_HOSTNAME,
    NEXT_PUBLIC_FE_HOSTNAME_DEV: process.env.NEXT_PUBLIC_FE_HOSTNAME_DEV,
    NEXT_PUBLIC_FE_HOSTNAME: process.env.NEXT_PUBLIC_FE_HOSTNAME,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
})