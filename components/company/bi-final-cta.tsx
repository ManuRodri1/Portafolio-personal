"use client"

import { useCompanyLanguage } from "@/contexts/company-language-context"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BIFinalCTA() {
  const { t } = useCompanyLanguage()

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E244B 0%, #1E244B 70%, #2a3354 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-sans">{t("bi.finalCta.text")}</h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#E94547] text-white rounded-lg hover:bg-[#d63d3f] transition-all duration-300 text-lg font-medium font-sans group hover:shadow-xl hover:scale-105"
        >
          {t("bi.finalCta.button")}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
