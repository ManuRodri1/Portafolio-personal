"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { AlertCircle, Database, Clock } from "lucide-react"

export default function BIChallengeSection() {
  const { t } = useCompanyLanguage()

  const challenges = [
    {
      icon: Database,
      titleKey: "bi.challenge.point1.title",
      descKey: "bi.challenge.point1.desc",
    },
    {
      icon: Clock,
      titleKey: "bi.challenge.point2.title",
      descKey: "bi.challenge.point2.desc",
    },
    {
      icon: AlertCircle,
      titleKey: "bi.challenge.point3.title",
      descKey: "bi.challenge.point3.desc",
    },
  ]

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E244B 0%, #1E244B 30%, #E94547 65%, rgba(255,255,255,0.95) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-sans text-center mb-8">
          {t("bi.challenge.title")}
        </h2>

        <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed text-center max-w-4xl mx-auto mb-16">
          {t("bi.challenge.description")}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#E94547]/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#E94547]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E244B] font-sans">{t(challenge.titleKey)}</h3>
                <p className="text-gray-600 font-sans leading-relaxed">{t(challenge.descKey)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
