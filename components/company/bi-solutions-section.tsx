"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { motion } from "framer-motion"
import Image from "next/image"

const solutions = [
  {
    id: "operational",
    image: "/images/operational-20intelligence-20dashboard.png",
    alt: "Operational Intelligence Dashboard",
  },
  {
    id: "executive",
    image: "/images/executive-20dashboard.png",
    alt: "Executive Dashboard",
  },
  {
    id: "financial",
    image: "/images/financial-20-26-20performance-20analytics-20dashboard.png",
    alt: "Financial & Performance Analytics Dashboard",
  },
  {
    id: "custom",
    image: "/images/custom-20analytics-20-20advanced-20analytics-20dashboard.png",
    alt: "Custom Analytics Dashboard",
  },
]

export default function BISolutionsSection() {
  const { t } = useCompanyLanguage()

  return (
    <section
      id="bi-solutions"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(30,36,75,0.06) 30%, rgba(233,69,71,0.08) 60%, rgba(255,255,255,0.95) 100%)",
      }}
    >
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-[#1E244B]"
        >
          {t("bi.solutions.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
        >
          {t("bi.solutions.intro")}
        </motion.p>
      </div>

      {/* Solutions Grid - Alternating Layout */}
      <div className="container mx-auto px-6 space-y-24">
        {solutions.map((solution, index) => {
          const isReversed = index % 2 !== 0

          return (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`flex flex-col ${
                isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 lg:gap-16`}
            >
              <div className="w-full lg:w-1/2 order-2 lg:order-none">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={solution.image || "/placeholder.svg"}
                    alt={solution.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority={index === 0}
                  />
                </motion.div>
              </div>

              <div className="w-full lg:w-1/2 order-1 lg:order-none">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E244B]">
                    {t(`bi.solutions.${solution.id}.title`)}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t(`bi.solutions.${solution.id}.description`)}
                  </p>

                  {/* Use Cases */}
                  <div className="space-y-3">
                    <p className="font-semibold text-[#1E244B] mb-3">{t("bi.solutions.usecases.label")}:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-gray-600">
                        <span className="text-[#E94547] mt-1">•</span>
                        <span>{t(`bi.solutions.${solution.id}.usecase1`)}</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-600">
                        <span className="text-[#E94547] mt-1">•</span>
                        <span>{t(`bi.solutions.${solution.id}.usecase2`)}</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-600">
                        <span className="text-[#E94547] mt-1">•</span>
                        <span>{t(`bi.solutions.${solution.id}.usecase3`)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
