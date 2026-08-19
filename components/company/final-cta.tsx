"use client"

import type React from "react"

import { useState } from "react"
import { useCompanyLanguage } from "@/contexts/company-language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Linkedin, Instagram, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-[#FF5757]/20",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-md border border-white/10",
            "shadow-[0_8px_40px_rgba(0,0,0,0.35)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function FinalCTA() {
  const { t } = useCompanyLanguage()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus("submitting")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/xpwybjpo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormState({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B0F17]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A295F]/30 via-transparent to-[#FF5757]/20 blur-3xl" />

      <ElegantShape width={520} height={120} rotate={-8} delay={0.2} className="left-[-8%] top-[15%]" />
      <ElegantShape width={380} height={100} rotate={14} delay={0.4} className="right-[-3%] bottom-[20%]" />
      <ElegantShape width={220} height={70} rotate={-12} delay={0.3} className="left-[15%] bottom-[8%]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN - FORM */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t("finalCta.title")}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">{t("finalCta.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder={t("finalCta.form.name")}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  disabled={submitStatus === "submitting"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#E94547] focus:bg-white/15 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t("finalCta.form.email")}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  disabled={submitStatus === "submitting"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#E94547] focus:bg-white/15 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  placeholder={t("finalCta.form.subject")}
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  required
                  disabled={submitStatus === "submitting"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#E94547] focus:bg-white/15 transition-all disabled:opacity-50"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={t("finalCta.form.message")}
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  disabled={submitStatus === "submitting"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#E94547] focus:bg-white/15 resize-none transition-all disabled:opacity-50"
                />
              </div>
              <Button
                type="submit"
                disabled={submitStatus === "submitting"}
                className="w-full bg-[#E94547] hover:bg-[#E94547]/90 text-white font-semibold text-lg py-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                {submitStatus === "submitting" ? t("finalCta.form.sending") || "Sending..." : t("finalCta.form.send")}
              </Button>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    {t("finalCta.form.successMessage") || "Your message was sent successfully."}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    {t("finalCta.form.errorMessage") || "Something went wrong. Please try again."}
                  </p>
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col justify-center items-center space-y-12">
            {/* JMDR Logo */}
            <div className="w-full flex justify-center">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                <Image src="/jmdr-logo.png" alt="JMDR Logo" fill className="object-contain" priority />
              </div>
            </div>

            {/* Contact Email */}
            <div className="space-y-3 text-center">
              <h3 className="text-xl font-semibold text-white/90">{t("finalCta.contactLabel")}</h3>
              <a
                href="mailto:Jdejesus@jmrodri.site.com"
                className="flex items-center gap-3 text-white/70 hover:text-[#E94547] transition-colors justify-center"
              >
                <Mail className="w-5 h-5" />
                <span>Jdejesus@jmrodri.site.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-4 text-center w-full">
              <h3 className="text-xl font-semibold text-white/90">{t("finalCta.socialLabel")}</h3>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/company/jmdr-digital-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-[#E94547] rounded-lg transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/jmdr.digital.solutions?igsh=c2lla2twZW41Ynh6&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-[#E94547] rounded-lg transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
