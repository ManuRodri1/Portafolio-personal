"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "es"

interface CompanyLanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const CompanyLanguageContext = createContext<CompanyLanguageContextType | undefined>(undefined)

export function CompanyLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <CompanyLanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </CompanyLanguageContext.Provider>
  )
}

export function useCompanyLanguage() {
  const context = useContext(CompanyLanguageContext)
  if (!context) {
    throw new Error("useCompanyLanguage must be used within CompanyLanguageProvider")
  }
  return context
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.services": "Services",
    "nav.services.bi": "Business Intelligence",
    "nav.services.web": "Web Solutions",
    "nav.services.automation": "Automation",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Hero
    "hero.description":
      "We design data-driven digital systems that help organizations improve performance, visibility, and decision-making.",
    "hero.cta.primary": "Request a Consultation",
    "hero.cta.secondary": "Explore Our Work",
    "hero.label": "DATA • BUSINESS INTELLIGENCE • DIGITAL SYSTEMS",
    "hero.title": "JMDR Digital Solutions",
    "hero.accent": "Web, BI & Automation",
    "hero.trust": "Trusted by operations, logistics & data-driven teams",

    // BI Hero translations
    "bi.hero.title": "Business Intelligence",
    "bi.hero.subtitle": "Transforming data into actionable insights for smarter decisions.",
    "bi.hero.description":
      "We design strategic analytics solutions that help organizations make informed decisions, improve operational visibility, and drive measurable results through data.",
    "bi.hero.primaryCTA": "Request a Consultation",
    "bi.hero.secondaryCTA": "View BI Projects",

    // Challenge section translations
    "bi.challenge.title": "The Challenge",
    "bi.challenge.description":
      "Many organizations struggle with fragmented data, manual reporting, limited visibility, and delayed decision-making. As data grows, the lack of a unified analytics approach creates inefficiencies and operational risk.",
    "bi.challenge.point1.title": "Data Spread Across Systems",
    "bi.challenge.point1.desc":
      "Critical information scattered across multiple platforms makes it difficult to get a complete view of your business.",
    "bi.challenge.point2.title": "Reports That Arrive Too Late",
    "bi.challenge.point2.desc":
      "Manual reporting processes delay insights, preventing timely action when it matters most.",
    "bi.challenge.point3.title": "Incomplete Picture",
    "bi.challenge.point3.desc":
      "Decisions made without comprehensive data visibility increase risk and limit strategic potential.",

    // BI Approach section translations
    "bi.approach.title": "Our Business Intelligence Approach",
    "bi.approach.intro":
      "JMDR approaches business intelligence as a strategic system, not just a reporting layer. We focus on aligning data, processes, and decision-making to support operational and strategic goals.",
    "bi.approach.step1.title": "Understand the Business",
    "bi.approach.step1.desc":
      "We work closely with stakeholders to understand objectives, processes, and the decisions that truly matter.",
    "bi.approach.step2.title": "Design the Analytics Architecture",
    "bi.approach.step2.desc":
      "We design a data and analytics structure that ensures consistency, reliability, and scalability across the organization.",
    "bi.approach.step3.title": "Build & Integrate",
    "bi.approach.step3.desc":
      "We develop dashboards, reports, and data models that integrate multiple sources into a single, trusted view of performance.",
    "bi.approach.step4.title": "Optimize & Evolve",
    "bi.approach.step4.desc":
      "We continuously refine metrics and insights to ensure the solution evolves with the business.",
    "bi.approach.cta": "Learn how our solutions are applied",

    // BI Solutions section translations
    "bi.solutions.title": "Types of Business Intelligence Solutions",
    "bi.solutions.intro":
      "Our business intelligence solutions are designed to support different decision-making levels across the organization, from daily operations to executive strategy.",

    "bi.solutions.operational.title": "Operational Intelligence",
    "bi.solutions.operational.description":
      "Provides real-time visibility into daily operations, helping teams monitor performance, identify issues early, and respond quickly.",
    "bi.solutions.operational.usecase1": "Operational KPIs",
    "bi.solutions.operational.usecase2": "Process monitoring",
    "bi.solutions.operational.usecase3": "Daily performance tracking",

    "bi.solutions.executive.title": "Executive Dashboards",
    "bi.solutions.executive.description":
      "High-level analytics designed for leadership teams, focusing on strategic KPIs, trends, and overall business health.",
    "bi.solutions.executive.usecase1": "Strategic performance",
    "bi.solutions.executive.usecase2": "Executive reporting",
    "bi.solutions.executive.usecase3": "Decision support",

    "bi.solutions.financial.title": "Financial & Performance Analytics",
    "bi.solutions.financial.description":
      "Advanced analytics focused on financial performance, cost analysis, profitability, and long-term trends.",
    "bi.solutions.financial.usecase1": "Financial KPIs",
    "bi.solutions.financial.usecase2": "Trend analysis",
    "bi.solutions.financial.usecase3": "Performance comparisons",

    "bi.solutions.custom.title": "Custom Analytics Solutions",
    "bi.solutions.custom.description":
      "Tailored analytics solutions designed around specific business needs, complex data models, or unique processes.",
    "bi.solutions.custom.usecase1": "Custom metrics",
    "bi.solutions.custom.usecase2": "Cross-system analytics",
    "bi.solutions.custom.usecase3": "Advanced data modeling",

    "bi.solutions.usecases.label": "Use cases",
    "bi.solutions.cta": "Let's discuss the right solution for your organization",

    // Related Projects translations
    "bi.relatedProjects.title": "Related Business Intelligence Projects",
    "bi.relatedProjects.description":
      "Explore how we've applied our Business Intelligence approach to deliver measurable results for organizations across different industries.",
    "bi.relatedProjects.cta": "View Case Study",
    "bi.relatedProjects.viewAll": "View All Projects",
    "bi.relatedProjects.close": "Close Case Study",

    // Final CTA translations
    "bi.finalCta.text": "Let's discuss the right solution for your organization.",
    "bi.finalCta.button": "Work with JMDR",

    // Footer
    "footer.company": "JMDR Digital Solutions",
    "footer.tagline": "Data-Driven Digital Solutions",
    "footer.rights": "All rights reserved.",

    // Web Solutions translations
    // Web Hero
    "web.hero.title": "Web Solutions",
    "web.hero.subtitle":
      "We design, build, and optimize modern websites that support growth, automation, and brand positioning.",
    "web.hero.description":
      "From corporate websites and ecommerce platforms to SEO-optimized digital experiences, we create scalable web solutions that perform, convert, and evolve with your business.",
    "web.hero.cta.secondary": "View Web Projects",

    // Web Challenge
    "web.challenge.title": "The Challenge",
    "web.challenge.paragraph1": "Many websites look good on the surface but fail to deliver real business value.",
    "web.challenge.paragraph2":
      "They don't convert visitors into leads, struggle to scale with growth, lack automation, or remain invisible in search engines.",
    "web.challenge.paragraph3":
      "A modern website must be more than visual — it must be strategic, measurable, and built to support long-term growth.",

    // Web Approach
    "web.approach.title": "Our Web Solutions Approach",
    "web.approach.intro":
      "We approach web development as a structured, end-to-end process that aligns design, technology, and business objectives.",
    "web.approach.step1.title": "Strategy & Brand Alignment",
    "web.approach.step1.desc":
      "We define goals, audience, and positioning to ensure the website supports both business and brand objectives.",
    "web.approach.step2.title": "UX, Design & Architecture",
    "web.approach.step2.desc":
      "We design intuitive interfaces and solid technical structures focused on usability, performance, and scalability.",
    "web.approach.step3.title": "Development & Integration",
    "web.approach.step3.desc":
      "We build modern websites with integrated content management, payments, and automated workflows.",
    "web.approach.step4.title": "SEO & Optimization",
    "web.approach.step4.desc":
      "We optimize structure, performance, and content to ensure visibility, speed, and continuous improvement.",

    // Web Solutions section translations
    "web.solutions.title": "Types of Web Solutions",

    "web.solutions.corporate.title": "Corporate & Business Websites",
    "web.solutions.corporate.description":
      "Professional websites designed to communicate brand value, services, and credibility while generating qualified leads.",

    "web.solutions.ecommerce.title": "Ecommerce Solutions",
    "web.solutions.ecommerce.description":
      "Scalable ecommerce platforms with integrated payments, product management, and automated order workflows.",

    "web.solutions.redesign.title": "Website Redesign & Optimization",
    "web.solutions.redesign.description":
      "Modernization of existing websites focused on UX, performance improvements, and conversion optimization.",

    "web.solutions.seo.title": "SEO-Driven Websites",
    "web.solutions.seo.description":
      "Websites built with SEO-first architecture to improve visibility, search performance, and long-term growth.",

    // Web Related Projects translations
    "web.relatedProjects.title": "Related Web Projects",
    "web.relatedProjects.description":
      "Explore how we've applied our Web Solutions approach to deliver results for organizations across different industries.",
    "web.relatedProjects.cta": "View Case Study",

    // Blog translations
    "blog.hero.title": "Blog",
    "blog.hero.subtitle": "Insights on Business Intelligence, Web Solutions, Automation, and digital systems.",
    "blog.hero.description":
      "Expert analysis and practical guidance on building data-driven organizations, modern web solutions, and scalable digital systems.",
    "blog.search.placeholder": "Search articles...",
    "blog.filter.category": "Category",
    "blog.filter.tags": "Tags",
    "blog.filter.all": "All",
    "blog.results.showing": "Showing",
    "blog.results.posts": "articles",
    "blog.noPosts": "No articles found matching your filters.",
    "blog.readMore": "Read more",

    // Testimonials translations
    "testimonials.title": "What our clients said",
    "testimonials.subtitle": "Trusted by professionals and organizations that value clarity and performance.",

    // Services Overview translations
    "services.overview.title": "Our Services",
    "services.overview.subtitle":
      "JMDR delivers consulting-grade solutions in Business Intelligence and Web Development, designed to support growth, efficiency, and long-term strategic objectives.",

    "services.overview.bi.title": "Business Intelligence Solutions",
    "services.overview.bi.description":
      "We design and implement advanced analytics solutions that transform raw data into actionable insights, enabling better decision-making, operational visibility, and measurable performance improvements.",
    "services.overview.bi.cta": "Explore Business Intelligence",

    "services.overview.web.title": "Web Solutions",
    "services.overview.web.description":
      "We build modern, high-performance websites focused on clarity, scalability, and growth — from corporate websites to ecommerce platforms and SEO-driven digital experiences.",
    "services.overview.web.cta": "Explore Web Solutions",

    // Featured Projects translations
    "featured.title": "Featured Projects",
    "featured.subtitle":
      "Real projects showcasing how we transform data, design, and technology into strategic solutions for organizations.",
    "featured.cta": "View Project",
    "featured.viewAll": "View Full Portfolio",

    // Blog Preview translations
    "blogPreview.title": "Insights & Perspectives",
    "blogPreview.subtitle":
      "Expert analysis and practical guidance on Business Intelligence, Web Solutions, and modern digital systems.",
    "blogPreview.cta": "Read article",
    "blogPreview.visitBlog": "Visit the Blog",

    // Final CTA translations
    "finalCta.title": "Let's build something that works.",
    "finalCta.subtitle": "Tell us about your project or challenge, and we'll respond with clarity and direction.",
    "finalCta.form.name": "Your name",
    "finalCta.form.email": "Your email",
    "finalCta.form.subject": "Subject",
    "finalCta.form.message": "Tell us about your project or challenge...",
    "finalCta.form.send": "Send Message",
    "finalCta.form.sending": "Sending...",
    "finalCta.form.successMessage": "Your message was sent successfully.",
    "finalCta.form.errorMessage": "Something went wrong. Please try again.",
    "finalCta.contactLabel": "Email us directly",
    "finalCta.socialLabel": "Follow us",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Sobre Nosotros",
    "nav.portfolio": "Portafolio",
    "nav.services": "Servicios",
    "nav.services.bi": "Inteligencia de Negocios",
    "nav.services.web": "Soluciones Web",
    "nav.services.automation": "Automatización",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",

    // Hero
    "hero.description":
      "Diseñamos sistemas digitales basados en datos que ayudan a las organizaciones a mejorar el rendimiento, la visibilidad y la toma de decisiones.",
    "hero.cta.primary": "Solicitar una Consultoría",
    "hero.cta.secondary": "Explorar Nuestro Trabajo",
    "hero.label": "DATOS • INTELIGENCIA DE NEGOCIOS • SISTEMAS DIGITALES",
    "hero.title": "JMDR Digital Solutions",
    "hero.accent": "Web, BI y Automatización",
    "hero.trust": "Confiado por equipos de operaciones, logística y datos",

    // BI Hero translations in Spanish
    "bi.hero.title": "Inteligencia de Negocios",
    "bi.hero.subtitle": "Transformando datos en insights accionables para decisiones más inteligentes.",
    "bi.hero.description":
      "Diseñamos soluciones analíticas estratégicas que ayudan a las organizaciones a tomar decisiones informadas, mejorar la visibilidad operacional y obtener resultados medibles a través de datos.",
    "bi.hero.primaryCTA": "Solicitar una Consultoría",
    "bi.hero.secondaryCTA": "Ver Proyectos BI",

    // Challenge section translations in Spanish
    "bi.challenge.title": "El Desafío",
    "bi.challenge.description":
      "Muchas organizaciones luchan con datos fragmentados, reportes manuales, visibilidad limitada y toma de decisiones retrasada. A medida que los datos crecen, la falta de un enfoque analítico unificado crea ineficiencias y riesgo operacional.",
    "bi.challenge.point1.title": "Datos Dispersos en Sistemas",
    "bi.challenge.point1.desc":
      "Información crítica dispersa en múltiples plataformas dificulta obtener una visión completa de su negocio.",
    "bi.challenge.point2.title": "Reportes Que Llegan Tarde",
    "bi.challenge.point2.desc":
      "Los procesos manuales de reportes retrasan los insights, impidiendo acción oportuna cuando más importa.",
    "bi.challenge.point3.title": "Visión Incompleta",
    "bi.challenge.point3.desc":
      "Decisiones tomadas sin visibilidad completa de datos aumentan el riesgo y limitan el potencial estratégico.",

    // BI Approach section translations in Spanish
    "bi.approach.title": "Nuestro Enfoque de Inteligencia de Negocios",
    "bi.approach.intro":
      "JMDR aborda la inteligencia de negocios como un sistema estratégico, no solo como una capa de reportes. Nos enfocamos en alinear datos, procesos y toma de decisiones para apoyar objetivos operativos y estratégicos.",
    "bi.approach.step1.title": "Entender el Negocio",
    "bi.approach.step1.desc":
      "Trabajamos de cerca con los stakeholders para entender objetivos, procesos y las decisiones que realmente importan.",
    "bi.approach.step2.title": "Diseñar la Arquitectura Analítica",
    "bi.approach.step2.desc":
      "Diseñamos una estructura de datos y análisis que garantiza consistencia, confiabilidad y escalabilidad en toda la organización.",
    "bi.approach.step3.title": "Construir e Integrar",
    "bi.approach.step3.desc":
      "Desarrollamos dashboards, reportes y modelos de datos que integran múltiples fuentes en una vista única y confiable del rendimiento.",
    "bi.approach.step4.title": "Optimizar y Evolucionar",
    "bi.approach.step4.desc":
      "Refinamos continuamente las métricas e insights para asegurar que la solución evolucione con el negocio.",
    "bi.approach.cta": "Conozca cómo se aplican nuestras soluciones",

    // BI Solutions section translations in Spanish
    "bi.solutions.title": "Tipos de Soluciones de Inteligencia de Negocios",
    "bi.solutions.intro":
      "Nuestras soluciones de inteligencia de negocios están diseñadas para apoyar diferentes niveles de toma de decisiones en la organización, desde operaciones diarias hasta estrategia ejecutiva.",

    "bi.solutions.operational.title": "Inteligencia Operacional",
    "bi.solutions.operational.description":
      "Proporciona visibilidad en tiempo real de las operaciones diarias, ayudando a los equipos a monitorear el rendimiento, identificar problemas temprano y responder rápidamente.",
    "bi.solutions.operational.usecase1": "KPIs operacionales",
    "bi.solutions.operational.usecase2": "Monitoreo de procesos",
    "bi.solutions.operational.usecase3": "Seguimiento de rendimiento diario",

    "bi.solutions.executive.title": "Dashboards Ejecutivos",
    "bi.solutions.executive.description":
      "Analítica de alto nivel diseñada para equipos de liderazgo, enfocándose en KPIs estratégicos, tendencias y salud general del negocio.",
    "bi.solutions.executive.usecase1": "Rendimiento estratégico",
    "bi.solutions.executive.usecase2": "Reportes ejecutivos",
    "bi.solutions.executive.usecase3": "Soporte de decisiones",

    "bi.solutions.financial.title": "Analítica Financiera y de Rendimiento",
    "bi.solutions.financial.description":
      "Analítica avanzada enfocada en rendimiento financiero, análisis de costos, rentabilidad y tendencias a largo plazo.",
    "bi.solutions.financial.usecase1": "KPIs financieros",
    "bi.solutions.financial.usecase2": "Análisis de tendencias",
    "bi.solutions.financial.usecase3": "Comparaciones de rendimiento",

    "bi.solutions.custom.title": "Soluciones Analíticas Personalizadas",
    "bi.solutions.custom.description":
      "Soluciones analíticas diseñadas a medida según necesidades específicas del negocio, modelos de datos complejos o procesos únicos.",
    "bi.solutions.custom.usecase1": "Métricas personalizadas",
    "bi.solutions.custom.usecase2": "Analítica entre sistemas",
    "bi.solutions.custom.usecase3": "Modelado avanzado de datos",

    "bi.solutions.usecases.label": "Casos de uso",
    "bi.solutions.cta": "Conversemos sobre la solución adecuada para su organización",

    // Related Projects translations in Spanish
    "bi.relatedProjects.title": "Proyectos Relacionados de Inteligencia de Negocios",
    "bi.relatedProjects.description":
      "Explore cómo hemos aplicado nuestro enfoque de Inteligencia de Negocios para entregar resultados medibles a organizaciones de diferentes industrias.",
    "bi.relatedProjects.cta": "Ver Caso de Estudio",
    "bi.relatedProjects.viewAll": "Ver Todos los Proyectos",
    "bi.relatedProjects.close": "Cerrar Caso de Estudio",

    // Final CTA translations in Spanish
    "bi.finalCta.text": "Hablemos sobre la solución adecuada para su organización.",
    "bi.finalCta.button": "Trabajar con JMDR",

    // Footer
    "footer.company": "JMDR Digital Solutions",
    "footer.tagline": "Soluciones Digitales Basadas en Datos",
    "footer.rights": "Todos los derechos reservados.",

    // Web Solutions translations in Spanish
    // Web Hero
    "web.hero.title": "Soluciones Web",
    "web.hero.subtitle":
      "Diseñamos, construimos y optimizamos sitios web modernos que impulsan el crecimiento, la automatización y el posicionamiento de marca.",
    "web.hero.description":
      "Desde sitios web corporativos y plataformas de comercio electrónico hasta experiencias digitales optimizadas para SEO, creamos soluciones web escalables que funcionan, convierten y evolucionan con su negocio.",
    "web.hero.cta.secondary": "Ver Proyectos Web",

    // Web Challenge
    "web.challenge.title": "El Desafío",
    "web.challenge.paragraph1":
      "Muchos sitios web se ven bien en la superficie, pero no entregan valor real al negocio.",
    "web.challenge.paragraph2":
      "No convierten visitantes en leads, luchan para escalar con el crecimiento, carecen de automatización o permanecen invisibles en motores de búsqueda.",
    "web.challenge.paragraph3":
      "Un sitio web moderno debe ser más que visual — debe ser estratégico, medible y construido para apoyar el crecimiento a largo plazo.",

    // Web Approach
    "web.approach.title": "Nuestro Enfoque de Soluciones Web",
    "web.approach.intro":
      "Abordamos el desarrollo web como un proceso estructurado de principio a fin que alinea diseño, tecnología y objetivos de negocio.",
    "web.approach.step1.title": "Estrategia y Alineación de Marca",
    "web.approach.step1.desc":
      "Definimos objetivos, audiencia y posicionamiento para asegurar que el sitio web apoye tanto los objetivos de negocio como de marca.",
    "web.approach.step2.title": "UX, Diseño y Arquitectura",
    "web.approach.step2.desc":
      "Diseñamos interfaces intuitivas y estructuras técnicas sólidas enfocadas en usabilidad, rendimiento y escalabilidad.",
    "web.approach.step3.title": "Desarrollo e Integración",
    "web.approach.step3.desc":
      "Construimos sitios web modernos con gestión de contenido integrada, pagos y flujos de trabajo automatizados.",
    "web.approach.step4.title": "SEO y Optimización",
    "web.approach.step4.desc":
      "Optimizamos estructura, rendimiento y contenido para garantizar visibilidad, velocidad y mejora continua.",

    // Web Solutions section translations in Spanish
    "web.solutions.title": "Tipos de Soluciones Web",

    "web.solutions.corporate.title": "Sitios Web Corporativos y de Negocios",
    "web.solutions.corporate.description":
      "Sitios web profesionales diseñados para comunicar valor de marca, servicios y credibilidad mientras generan leads calificados.",

    "web.solutions.ecommerce.title": "Soluciones de Comercio Electrónico",
    "web.solutions.ecommerce.description":
      "Plataformas de comercio electrónico escalables con pagos integrados, gestión de productos y flujos de trabajo automatizados.",

    "web.solutions.redesign.title": "Rediseño y Optimización de Sitios Web",
    "web.solutions.redesign.description":
      "Modernización de sitios web existentes enfocada en UX, mejoras de rendimiento y optimización de conversiones.",

    "web.solutions.seo.title": "Sitios Web Orientados a SEO",
    "web.solutions.seo.description":
      "Sitios web construidos con arquitectura SEO-first para mejorar visibilidad, rendimiento de búsqueda y crecimiento a largo plazo.",

    // Web Related Projects translations in Spanish
    "web.relatedProjects.title": "Proyectos Web Relacionados",
    "web.relatedProjects.description":
      "Explore cómo hemos aplicado nuestro enfoque de Soluciones Web para entregar resultados a organizaciones de diferentes industrias.",
    "web.relatedProjects.cta": "Ver Caso de Estudio",

    // Blog translations in Spanish
    "blog.hero.title": "Blog",
    "blog.hero.subtitle":
      "Perspectivas sobre Inteligencia de Negocios, Soluciones Web, Automatización y sistemas digitales.",
    "blog.hero.description":
      "Análisis experto y orientación práctica sobre la construcción de organizaciones basadas en datos, soluciones web modernas y sistemas digitales escalables.",
    "blog.search.placeholder": "Buscar artículos...",
    "blog.filter.category": "Categoría",
    "blog.filter.tags": "Etiquetas",
    "blog.filter.all": "Todos",
    "blog.results.showing": "Mostrando",
    "blog.results.posts": "artículos",
    "blog.noPosts": "No se encontraron artículos que coincidan con sus filtros.",
    "blog.readMore": "Leer más",

    // Testimonials translations in Spanish
    "testimonials.title": "Lo que dicen nuestros clientes",
    "testimonials.subtitle": "Confiado por profesionales y organizaciones que valoran la claridad y el rendimiento.",

    // Services Overview translations in Spanish
    "services.overview.title": "Nuestros Servicios",
    "services.overview.subtitle":
      "JMDR ofrece soluciones de nivel consultivo en Inteligencia de Negocios y Desarrollo Web, diseñadas para apoyar el crecimiento, la eficiencia y los objetivos estratégicos a largo plazo.",

    "services.overview.bi.title": "Soluciones de Inteligencia de Negocios",
    "services.overview.bi.description":
      "Diseñamos e implementamos soluciones analíticas avanzadas que transforman datos sin procesar en información accionable, permitiendo una mejor toma de decisiones, visibilidad operativa y mejoras medibles en el rendimiento.",
    "services.overview.bi.cta": "Explorar Inteligencia de Negocios",

    "services.overview.web.title": "Soluciones Web",
    "services.overview.web.description":
      "Construimos sitios web modernos de alto rendimiento enfocados en claridad, escalabilidad y crecimiento — desde sitios web corporativos hasta plataformas de comercio electrónico y experiencias digitales impulsadas por SEO.",
    "services.overview.web.cta": "Explorar Soluciones Web",

    // Featured Projects translations
    "featured.title": "Proyectos Destacados",
    "featured.subtitle":
      "Proyectos reales que muestran cómo transformamos datos, diseño y tecnología en soluciones estratégicas para organizaciones.",
    "featured.cta": "Ver Proyecto",
    "featured.viewAll": "Ver Portafolio Completo",

    // Blog Preview translations in Spanish
    "blogPreview.title": "Perspectivas e Ideas",
    "blogPreview.subtitle":
      "Análisis experto y guía práctica sobre Inteligencia de Negocios, Soluciones Web y sistemas digitales modernos.",
    "blogPreview.cta": "Leer artículo",
    "blogPreview.visitBlog": "Visitar el Blog",

    // Final CTA translations in Spanish
    "finalCta.title": "Construyamos algo que funcione.",
    "finalCta.subtitle": "Cuéntanos sobre tu proyecto o desafío, y te responderemos con claridad y dirección.",
    "finalCta.form.name": "Tu nombre",
    "finalCta.form.email": "Tu correo electrónico",
    "finalCta.form.subject": "Asunto",
    "finalCta.form.message": "Cuéntanos sobre tu proyecto o desafío...",
    "finalCta.form.send": "Enviar Mensaje",
    "finalCta.form.sending": "Enviando...",
    "finalCta.form.successMessage": "Tu mensaje fue enviado exitosamente.",
    "finalCta.form.errorMessage": "Algo salió mal. Por favor, inténtalo de nuevo.",
    "finalCta.contactLabel": "Escríbenos directamente",
    "finalCta.socialLabel": "Síguenos",
  },
}
