"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { profile } from "@/lib/profile"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#contact", label: t("nav.contact") },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-[#0B132B]/95 via-[#1C2541]/95 to-[#0B132B]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(255,96,82,0.15)]"
          : "bg-gradient-to-r from-[#0B132B]/90 via-[#1C2541]/90 to-[#0B132B]/90 backdrop-blur-sm"
      }`}
      style={{ borderBottom: "1px solid rgba(255, 96, 82, 0.3)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - Increased size and added coral glow */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF6052] blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full" />
              <Image
                src="/jmdr-logo.png"
                alt="JMDR Logo"
                width={160}
                height={80}
                className="h-14 md:h-16 w-auto relative z-10 drop-shadow-lg transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - White text with coral hover effect */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#FF6052] transition-colors relative group font-medium text-sm tracking-wide"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6052] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(255,96,82,0.8)]" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            {/* Flag Language Switcher */}
            <div className="flex items-center gap-3">
              <img
                width="32"
                height="32"
                src="/images/design-mode/usa.png"
                alt="English"
                className={`cursor-pointer hover:scale-110 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,96,82,0.6)] ${
                  language === "en" ? "opacity-100 scale-105 drop-shadow-[0_0_8px_rgba(255,96,82,0.8)]" : "opacity-60"
                }`}
                onClick={() => language !== "en" && toggleLanguage()}
              />
              <img
                width="32"
                height="32"
                src="/images/design-mode/dominican-republic.png"
                alt="Español"
                className={`cursor-pointer hover:scale-110 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,96,82,0.6)] ${
                  language === "es" ? "opacity-100 scale-105 drop-shadow-[0_0_8px_rgba(255,96,82,0.8)]" : "opacity-60"
                }`}
                onClick={() => language !== "es" && toggleLanguage()}
              />
            </div>

            {/* Resume Dropdown - More elegant styling with coral border and hover effects */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 border-[#FF6052] text-[#FF6052] hover:bg-[#FF6052] hover:text-white hover:border-[#FF6052] transition-all duration-300 bg-transparent font-semibold backdrop-blur-sm shadow-md hover:shadow-[0_0_20px_rgba(255,96,82,0.4)] hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("nav.downloadCV")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1C2541] border-[#FF6052]/30">
                <DropdownMenuItem
                  asChild
                  className="text-white hover:text-[#FF6052] hover:bg-[#FF6052]/10 focus:text-[#FF6052] focus:bg-[#FF6052]/10"
                >
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    English Resume
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-white hover:text-[#FF6052] hover:bg-[#FF6052]/10 focus:text-[#FF6052] focus:bg-[#FF6052]/10"
                >
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Currículum en Español
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button - Updated for white icon */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Menu - Updated for white text */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(255,96,82,0.3)]">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-[#FF6052] transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-[rgba(255,96,82,0.3)]">
                <div className="flex gap-2">
                  <img
                    width="28"
                    height="28"
                    src="/images/design-mode/usa.png"
                    alt="English"
                    className={`cursor-pointer ${language === "en" ? "opacity-100" : "opacity-50"}`}
                    onClick={() => language !== "en" && toggleLanguage()}
                  />
                  <img
                    width="28"
                    height="28"
                    src="/images/design-mode/dominican-republic.png"
                    alt="Español"
                    className={`cursor-pointer ${language === "es" ? "opacity-100" : "opacity-50"}`}
                    onClick={() => language !== "es" && toggleLanguage()}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-[#FF6052] text-[#FF6052] bg-transparent hover:bg-[#FF6052] hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("nav.downloadCV")}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1C2541] border-[#FF6052]/30">
                    <DropdownMenuItem asChild className="text-white hover:text-[#FF6052] hover:bg-[#FF6052]/10">
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        English Resume
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-white hover:text-[#FF6052] hover:bg-[#FF6052]/10">
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        CV Español
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
