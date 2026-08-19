"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"

export default function CompanyHeader() {
  const { language, toggleLanguage, t } = useCompanyLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [isVideoComplete, setIsVideoComplete] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)

  const handleVideoEnd = () => {
    setIsVideoComplete(true)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsDarkBackground(true)
        return
      }

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition < windowHeight * 0.7) {
        setIsDarkBackground(true)
      } else if (scrollPosition < windowHeight * 0.95) {
        setIsDarkBackground(true)
      } else {
        setIsDarkBackground(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const textColorClass = isDarkBackground ? "text-white/90" : "text-[#1E244B]/90"
  const hoverColorClass = "hover:text-[#FF6052]"

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // If not on home page, navigate to home first
    if (pathname !== "/") {
      router.push("/#contact")
    } else {
      // Already on home, just scroll
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center relative z-50">
              {!isVideoComplete ? (
                <video
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Animation_JMDR_Tech_Branding-zkKqNfdRGwrERUvWxj8NvfAjqMOqMa.mp4"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="h-12 w-auto"
                  style={{ width: "120px", height: "48px" }}
                />
              ) : (
                <Image
                  src="/jmdr-logo.png"
                  alt="JMDR"
                  width={120}
                  height={48}
                  className="h-12 w-auto transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,96,82,0.6)]"
                />
              )}
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className={cn(
                  textColorClass,
                  hoverColorClass,
                  "transition-colors duration-300 relative group font-sans",
                )}
              >
                {t("nav.home")}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6052] group-hover:w-full transition-all duration-300" />
              </Link>

              <div className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1",
                    textColorClass,
                    hoverColorClass,
                    "transition-colors duration-300 relative font-sans",
                  )}
                >
                  {t("nav.about")}
                  <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6052] group-hover:w-full transition-all duration-300" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-[#1C2541] rounded-lg shadow-xl p-2 min-w-[160px] border border-[#FF6052]/20">
                    <Link
                      href="/portfolio"
                      className="block px-4 py-2 text-white/80 hover:text-[#FF6052] hover:bg-[#FF6052]/10 rounded transition-colors duration-200 font-sans"
                    >
                      {t("nav.portfolio")}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1",
                    textColorClass,
                    hoverColorClass,
                    "transition-colors duration-300 relative font-sans",
                  )}
                >
                  {t("nav.services")}
                  <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6052] group-hover:w-full transition-all duration-300" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-[#1C2541] rounded-lg shadow-xl p-2 min-w-[200px] border border-[#FF6052]/20">
                    <Link
                      href="/services/business-intelligence"
                      className="block px-4 py-2 text-white/80 hover:text-[#FF6052] hover:bg-[#FF6052]/10 rounded transition-colors duration-200 font-sans"
                    >
                      {t("nav.services.bi")}
                    </Link>
                    <Link
                      href="/services/web-solutions"
                      className="block px-4 py-2 text-white/80 hover:text-[#FF6052] hover:bg-[#FF6052]/10 rounded transition-colors duration-200 font-sans"
                    >
                      {t("nav.services.web")}
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                className={cn(
                  textColorClass,
                  hoverColorClass,
                  "transition-colors duration-300 relative group font-sans",
                )}
              >
                {t("nav.blog")}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6052] group-hover:w-full transition-all duration-300" />
              </Link>

              <a
                href="#contact"
                onClick={handleContactClick}
                className={cn(
                  textColorClass,
                  hoverColorClass,
                  "transition-colors duration-300 relative group font-sans cursor-pointer",
                )}
              >
                {t("nav.contact")}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6052] group-hover:w-full transition-all duration-300" />
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center transition-transform duration-200 hover:scale-105 relative z-50"
                aria-label="Toggle language"
              >
                {language === "en" ? (
                  <Image
                    src="https://img.icons8.com/color/48/usa.png"
                    alt="English"
                    width={32}
                    height={32}
                    className={cn(
                      "cursor-pointer transition-all duration-300",
                      language === "en" ? "brightness-100 drop-shadow-[0_0_8px_rgba(255,96,82,0.5)]" : "brightness-75",
                    )}
                  />
                ) : (
                  <Image
                    src="https://img.icons8.com/color/48/dominican-republic.png"
                    alt="Español"
                    width={32}
                    height={32}
                    className={cn(
                      "cursor-pointer transition-all duration-300",
                      language === "es" ? "brightness-100 drop-shadow-[0_0_8px_rgba(255,96,82,0.5)]" : "brightness-75",
                    )}
                  />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  textColorClass,
                  hoverColorClass,
                  "lg:hidden transition-colors duration-300 relative z-50",
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#0B132B]/95 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full flex items-center justify-center">
            <nav className="flex flex-col items-center gap-8 text-center">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white/90 hover:text-[#FF6052] transition-colors duration-300 font-sans"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white/90 hover:text-[#FF6052] transition-colors duration-300 font-sans"
              >
                {t("nav.portfolio")}
              </Link>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-2xl text-white/90 hover:text-[#FF6052] transition-colors duration-300 font-sans flex items-center gap-2"
                >
                  {t("nav.services")}
                  <ChevronDown
                    size={20}
                    className={cn("transition-transform duration-300", isServicesOpen && "rotate-180")}
                  />
                </button>
                {isServicesOpen && (
                  <div className="flex flex-col gap-3 pl-6">
                    <Link
                      href="/services/business-intelligence"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg text-white/80 hover:text-[#FF6052] transition-colors duration-300 font-sans"
                    >
                      {t("nav.services.bi")}
                    </Link>
                    <Link
                      href="/services/web-solutions"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg text-white/80 hover:text-[#FF6052] transition-colors duration-300 font-sans"
                    >
                      {t("nav.services.web")}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white/90 hover:text-[#FF6052] transition-colors duration-300 font-sans"
              >
                {t("nav.blog")}
              </Link>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="text-2xl text-white/90 hover:text-[#FF6052] transition-colors duration-300 font-sans cursor-pointer"
              >
                {t("nav.contact")}
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
