"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { profile } from "@/lib/profile"

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: profile.fullName,
      href: profile.urls.linkedIn,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "ManuRodri1",
      href: profile.urls.github,
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy mb-4">{t("contact.title")}</h2>
          <div className="w-24 h-1 bg-[#FF6052] mx-auto" />
          <p className="mt-4 text-lg text-slate-gray">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="animate-on-scroll opacity-0 [animation-delay:200ms]">
            <Card className="p-8 h-full">
              <h3 className="text-2xl font-serif font-bold text-navy mb-6">{t("contact.info")}</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="p-3 bg-[#FF6052]/10 rounded-lg group-hover:bg-[#FF6052]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#FF6052]" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-gray">{info.label}</p>
                        <p className="font-medium text-navy">{info.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll opacity-0 [animation-delay:400ms]">
            <Card className="p-8">
              <form action="https://formspree.io/f/xpwybjpo" method="POST" className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder={t("contact.name")}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="border-slate-gray/20 focus:border-[#FF6052]"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={t("contact.email")}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="border-slate-gray/20 focus:border-[#FF6052]"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={t("contact.subject")}
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    required
                    className="border-slate-gray/20 focus:border-[#FF6052]"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("contact.message")}
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    className="border-slate-gray/20 focus:border-[#FF6052] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FF6052] hover:bg-[#FF6052]/90 text-white font-semibold"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t("contact.send")}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
