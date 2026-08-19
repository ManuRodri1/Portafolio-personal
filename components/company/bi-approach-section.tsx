"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { Users, BarChart3, Wrench, TrendingUp } from "lucide-react"

export default function BIApproachSection() {
  const { t } = useCompanyLanguage()

  const steps = [
    {
      number: "01",
      icon: Users,
      titleKey: "bi.approach.step1.title",
      descKey: "bi.approach.step1.desc",
    },
    {
      number: "02",
      icon: BarChart3,
      titleKey: "bi.approach.step2.title",
      descKey: "bi.approach.step2.desc",
    },
    {
      number: "03",
      icon: Wrench,
      titleKey: "bi.approach.step3.title",
      descKey: "bi.approach.step3.desc",
    },
    {
      number: "04",
      icon: TrendingUp,
      titleKey: "bi.approach.step4.title",
      descKey: "bi.approach.step4.desc",
    },
  ]

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(233,69,71,0.08) 50%, rgba(255,255,255,0.98) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1E244B] font-sans text-center mb-8">
          {t("bi.approach.title")}
        </h2>

        <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed text-center max-w-4xl mx-auto mb-16">
          {t("bi.approach.intro")}
        </p>

        {/* Steps Grid - unchanged */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#E94547]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E94547]" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl font-bold text-[#E94547]/20 font-sans">{step.number}</span>
                      <h3 className="text-xl font-bold text-[#1E244B] font-sans">{t(step.titleKey)}</h3>
                    </div>
                    <p className="text-gray-600 font-sans leading-relaxed">{t(step.descKey)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              const nextSection = document.getElementById("bi-solutions")
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="text-[#E94547] hover:text-[#1E244B] font-sans text-sm font-medium transition-colors duration-300 inline-flex items-center space-x-2"
          >
            <span>{t("bi.approach.cta")}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
