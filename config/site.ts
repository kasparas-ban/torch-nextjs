import { FE_HOST } from "@/api/utils/apiConfig"
import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Torch",
  description:
    "Take control of your time, work on your goals, and achieve your dreams with a community of other doists!",
  url: FE_HOST,
  ogImage: `${FE_HOST}/og.jpg`,
  links: {
    twitter: "https://twitter.com/torch",
    github: "https://github.com/torch-nextjs",
  },
}
