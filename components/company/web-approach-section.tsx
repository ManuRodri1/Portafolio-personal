"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { Target, Layout, Code, Search } from "lucide-react"

export default function WebApproachSection() {
  const { t } = useCompanyLanguage()

  const steps = [
    {
      number: "01",
      icon: Target,
      titleKey: "web.approach.step1.title",
      descKey: "web.approach.step1.desc",
    },
    {
      number: "02",
      icon: Layout,
      titleKey: "web.approach.step2.title",
      descKey: "web.approach.step2.desc",
    },
    {
      number: "03",
      icon: Code,
      titleKey: "web.approach.step3.title",
      descKey: "web.approach.step3.desc",
    },
    {
      number: "04",
      icon: Search,
      titleKey: "web.approach.step4.title",
      descKey: "web.approach.step4.desc",
    },
  ]

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(233,69,71,0.15) 40%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#1E244B] font-sans text-center mb-8">
          {t("web.approach.title")}
        </h2>

        {/* Section Intro */}
        <p className="text-lg md:text-xl text-gray-700 font-sans leading-relaxed text-center max-w-4xl mx-auto mb-16">
          {t("web.approach.intro")}
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#E94547]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E94547]" />
                    </div>
                  </div>

                  {/* Step Content */}
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
      </div>
    </section>
  )
}
