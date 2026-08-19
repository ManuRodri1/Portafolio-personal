"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"

export default function WebChallengeSection() {
  const { t } = useCompanyLanguage()

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E244B 0%, #1E244B 30%, #E94547 65%, rgba(255,255,255,0.95) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white font-sans text-center mb-8">
          {t("web.challenge.title")}
        </h2>

        {/* Section Content */}
        <div className="space-y-6 text-center">
          <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed max-w-4xl mx-auto">
            {t("web.challenge.paragraph1")}
          </p>
          <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed max-w-4xl mx-auto">
            {t("web.challenge.paragraph2")}
          </p>
          <p className="text-lg md:text-xl text-white font-sans leading-relaxed max-w-4xl mx-auto font-medium">
            {t("web.challenge.paragraph3")}
          </p>
        </div>
      </div>
    </section>
  )
}
