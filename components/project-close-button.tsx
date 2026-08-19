"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProjectCloseButton() {
  const router = useRouter()
  const [returnUrl, setReturnUrl] = useState<string>("/")
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  useEffect(() => {
    const referrer = sessionStorage.getItem("projectReferrer")
    const savedScroll = sessionStorage.getItem("projectScrollPosition")

    if (referrer) {
      setReturnUrl(referrer)
    }
    if (savedScroll) {
      setScrollPosition(Number.parseInt(savedScroll, 10))
    }
  }, [])

  const handleClose = () => {
    router.push(returnUrl)

    // Restore scroll position after navigation
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      })

      // Clean up session storage
      sessionStorage.removeItem("projectReferrer")
      sessionStorage.removeItem("projectScrollPosition")
    }, 100)
  }

  return (
    <button
      onClick={handleClose}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all group"
      aria-label="Close project detail"
    >
      <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  )
}
