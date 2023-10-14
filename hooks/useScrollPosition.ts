import { useEffect, useState } from "react"

export function useScrollPosition() {
  const [yScroll, setYScroll] = useState(0)

  useEffect(() => {
    const setScroll = () => setYScroll(window.scrollY)
    window.addEventListener("scroll", setScroll)
    return () => window.removeEventListener("scroll", setScroll)
  }, [])

  return { yScroll }
}
