"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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

const services = [
  {
    id: "bi",
    title: "services.overview.bi.title",
    description: "services.overview.bi.description",
    image: "/images/custom-20analytics-20-20advanced-20analytics-20dashboard.png",
    alt: "Business Intelligence Dashboard",
    href: "/services/business-intelligence",
    cta: "services.overview.bi.cta",
  },
  {
    id: "web",
    title: "services.overview.web.title",
    description: "services.overview.web.description",
    image: "/images/corporate-20-26-20business-20websites.png",
    alt: "Web Solutions",
    href: "/services/web-solutions",
    cta: "services.overview.web.cta",
  },
]

export default function ServicesOverview() {
  const { t } = useCompanyLanguage()

  return (
    <section className="relative py-32 overflow-hidden bg-[#0B0F17]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A295F]/30 via-transparent to-[#FF5757]/20 blur-3xl" />

      <ElegantShape width={480} height={110} rotate={-10} delay={0.2} className="left-[-8%] top-[10%]" />
      <ElegantShape width={360} height={90} rotate={12} delay={0.4} className="right-[-5%] bottom-[15%]" />
      <ElegantShape width={200} height={65} rotate={-14} delay={0.3} className="left-[12%] bottom-[5%]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("services.overview.title")}</h2>
          <p className="text-lg text-[#E6E9EF]/70 max-w-3xl mx-auto leading-relaxed">
            {t("services.overview.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid - Alternating Layout */}
        <div className="space-y-32">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 lg:gap-16`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 order-2 lg:order-none">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10"
                  >
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      priority={index === 0}
                    />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 order-1 lg:order-none">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t(service.title)}</h3>
                    <p className="text-lg text-[#E6E9EF]/80 mb-8 leading-relaxed">{t(service.description)}</p>

                    <Link href={service.href}>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#E94547] text-white font-semibold rounded-lg shadow-md hover:bg-[#d63e40] transition-all duration-300"
                      >
                        {t(service.cta)}
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent pointer-events-none" />
    </section>
  )
}
