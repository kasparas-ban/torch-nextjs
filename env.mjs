import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_BE_HOSTNAME_DEV: z.string().url().min(1),
    NEXT_PUBLIC_BE_HOSTNAME: z.string().url().min(1),
  },
  client: {
    NEXT_PUBLIC_FE_HOSTNAME_DEV: z.string().url().min(1),
    NEXT_PUBLIC_FE_HOSTNAME: z.string().url().min(1),
  },
})