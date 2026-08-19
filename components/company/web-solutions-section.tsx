"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { motion } from "framer-motion"
import Image from "next/image"

const solutions = [
  {
    id: "corporate",
    image: "/images/corporate-20-26-20business-20websites.png",
    alt: "Corporate & Business Websites",
  },
  {
    id: "ecommerce",
    image: "/images/ecommerce-20solutions.png",
    alt: "Ecommerce Solutions",
  },
  {
    id: "redesign",
    image: "/images/website-20redesign-20-26-20optimization.png",
    alt: "Website Redesign & Optimization",
  },
  {
    id: "seo",
    image: "/images/seo.png",
    alt: "SEO-Driven Websites",
  },
]

export default function WebSolutionsSection() {
  const { t } = useCompanyLanguage()

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#1E244B] via-[#E94547]/20 to-white">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          {t("web.solutions.title")}
        </motion.h2>
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
              {/* Image - order-2 on mobile to appear after text */}
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

              {/* Content - order-1 on mobile to appear before image */}
              <div className="w-full lg:w-1/2 order-1 lg:order-none">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E244B]">
                    {t(`web.solutions.${solution.id}.title`)}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t(`web.solutions.${solution.id}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
