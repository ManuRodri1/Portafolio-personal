"use client"

import Image from "next/image"
import { Mail, Linkedin, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { profile } from "@/lib/profile"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Linkedin,
      href: profile.urls.linkedIn,
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: profile.urls.github,
      label: "GitHub",
    },
    {
      icon: Mail,
      href: `mailto:${profile.email}`,
      label: "Email",
    },
  ]

  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#0B132B",
        borderTop: "2px solid #FF6052",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center">
            <Image
              src="/jmdr-logo.png"
              alt="JMDR Logo"
              width={160}
              height={80}
              className="h-16 md:h-18 w-auto drop-shadow-[0_0_15px_rgba(255,96,82,0.3)]"
            />
          </div>

          <p className="text-white/80 text-sm text-center max-w-2xl">
            © {currentYear} {profile.fullName} — {t("footer.rights")}
          </p>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white/70 hover:text-[#FF6052] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,96,82,0.6)] rounded-full"
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
