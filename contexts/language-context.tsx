"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { OFFICIAL_NAME } from "@/lib/profile"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
  getSEOMetadata: () => { title: string; description: string }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const metadata = getSEOMetadata()
    document.title = metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description)
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  const getSEOMetadata = () => {
    return seoMetadata[language]
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, getSEOMetadata }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

const seoMetadata: Record<Language, { title: string; description: string }> = {
  en: {
    title: `${OFFICIAL_NAME} | Software Engineer & Business Intelligence Consultant`,
    description:
      "Software Engineer and Business Intelligence Consultant specializing in data analytics, Power BI, Pentaho BI, SQL Server, and process automation. Explore projects, experience, and insights from JMDR.",
  },
  es: {
    title: `${OFFICIAL_NAME} | Ingeniero de Software y Consultor de Inteligencia de Negocios`,
    description:
      "Ingeniero de Software y Consultor de Inteligencia de Negocios especializado en análisis de datos, Power BI, Pentaho BI, SQL Server y automatización de procesos. Explora proyectos, experiencia e información de JMDR.",
  },
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.downloadCV": "Download Resume",

    // Hero
    "hero.name": OFFICIAL_NAME,
    "hero.title": "Software Engineer & Business Intelligence",
    "hero.description":
      "I design and develop intelligent, data-driven solutions that connect analytics, operations, and technology transforming information into actionable strategies.",
    "hero.cta1": "Get in Touch",
    "hero.cta2": "View Projects",

    // About
    "about.title": "About Me",
    "about.subtitle": "Connecting Data, Technology, and Strategy",
    "about.p1":
      `I'm ${OFFICIAL_NAME} (JMDR) — a Software Engineer and Business Intelligence professional passionate about transforming data into actionable strategies that drive organizational growth, operational efficiency, and smarter decision-making.`,
    "about.p2":
      "My background blends web development, data analytics, business modeling, and process optimization, allowing me to build solutions that seamlessly connect technology, operations, and strategic decision-making with both technical precision and analytical clarity.",
    "about.p3":
      "Throughout my experience, I have built and managed more than 26 professional dashboards, integrating data from multiple enterprise systems, designing ETL pipelines, automating key operational reports, and developing analytical models that empower operational, managerial, and executive teams to make better decisions every day.",
    "about.p4":
      "My technical expertise is complemented by a strong ability to translate business requirements into scalable, measurable solutions that create real impact. From operational control systems and corporate BI architectures to process automation and modern web applications, my focus remains the same: solving real problems with intelligent, data-driven solutions.",
    "about.p5":
      "Today, my mission is to continue creating systems that elevate organizational performance by integrating Power BI, Pentaho BI, SQL Server, DAX, web development, and modern engineering practices to deliver immediate and meaningful value.",
    "about.readMore": "Read More",
    "about.readLess": "Read Less",
    "about.expertiseTitle": "Core Areas",
    "about.expertise1": "Business Intelligence",
    "about.expertise1Detail": "Power BI, Pentaho BI, SQL Server",
    "about.expertise2": "Data Modeling",
    "about.expertise2Detail": "DAX, OLAP Cubes",
    "about.expertise3": "Web Design",
    "about.expertise3Detail": "HTML, CSS, UI/UX Responsive",
    "about.expertise4": "Process Automation",
    "about.expertise4Detail": "Agile Management",

    // Experience
    "exp.title": "Professional Experience",
    "exp.subtitle": "Building Data-Driven Solutions",
    "exp.present": "Present",

    // Education
    "edu.title": "Education & Certifications",
    "edu.educationTitle": "Education",
    "edu.certificationsTitle": "Certifications",
    "edu.expected": "Expected Dec 2025",

    // Skills
    "skills.title": "Technical Skills",
    "skills.subtitle": "Tools & Technologies",
    "skills.bi": "Business Intelligence",
    "skills.programming": "Programming & Frameworks",
    "skills.project": "Project Management",
    "skills.web": "Web Design & Development",

    // Projects
    "projects.title": "Featured Projects",
    "projects.subtitle": "Data Analytics & Development",
    "projects.description": "A showcase of my work in Business Intelligence, Data Analytics, and Web Development.",
    "projects.placeholder": "Projects section coming soon. Connect your Airtable API to display dynamic project data.",
    "projects.viewProject": "View Project",

    // Contact
    "contact.title": "Let's Connect",
    "contact.subtitle": "Get in Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.info": "Contact Information",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  es: {
    // Navigation
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contacto",
    "nav.downloadCV": "Descargar CV",

    // Hero
    "hero.name": OFFICIAL_NAME,
    "hero.title": "Ingeniero de Software e Inteligencia de Negocios",
    "hero.description":
      "Diseño y desarrollo soluciones inteligentes basadas en datos que conectan analítica, operaciones y tecnología — transformando información en estrategias accionables.",
    "hero.cta1": "Contáctame",
    "hero.cta2": "Ver Proyectos",

    // About
    "about.title": "Sobre Mí",
    "about.subtitle": "Conectando Datos, Tecnología y Estrategia",
    "about.p1":
      `Soy ${OFFICIAL_NAME} (JMDR), ingeniero de software y profesional de Business Intelligence enfocado en convertir datos en estrategias accionables que impulsen crecimiento, eficiencia y decisiones inteligentes dentro de las organizaciones.`,
    "about.p2":
      "Mi trayectoria combina desarrollo web, análisis de datos, modelado empresarial, y optimización de procesos, permitiéndome crear soluciones que conectan tecnología, operaciones y estrategia con precisión técnica y visión analítica.",
    "about.p3":
      "A lo largo de mi carrera he desarrollado y administrado más de 26 dashboards profesionales, integrando datos de diferentes sistemas empresariales, diseñando pipelines de ETL, automatizando reportes críticos y aplicando modelos de análisis que ayudan a equipos operativos, gerenciales y ejecutivos a tomar mejores decisiones cada día.",
    "about.p4":
      "Mi experiencia técnica se complementa con una fuerte capacidad para traducir necesidades del negocio en soluciones medibles, escalables y de impacto real. Desde sistemas de control operacional, BI corporativo y automatización de procesos, hasta aplicaciones web modernas y herramientas internas, mi enfoque siempre ha sido el mismo: resolver problemas reales con soluciones inteligentes basadas en datos.",
    "about.p5":
      "Hoy mi objetivo es continuar construyendo sistemas que eleve el rendimiento de las empresas, integrando Power BI, Pentaho BI, SQL Server, DAX, Web Development y frameworks modernos, mientras sigo desarrollando productos digitales y aplicando prácticas de ingeniería que aporten valor inmediato.",
    "about.readMore": "Leer Más",
    "about.readLess": "Leer Menos",
    "about.expertiseTitle": "Áreas Clave",
    "about.expertise1": "Inteligencia de Negocios",
    "about.expertise1Detail": "Power BI, Pentaho BI, SQL Server",
    "about.expertise2": "Modelado de Datos",
    "about.expertise2Detail": "DAX, Cubos OLAP",
    "about.expertise3": "Diseño Web",
    "about.expertise3Detail": "HTML, CSS, UI/UX Responsivo",
    "about.expertise4": "Automatización de Procesos",
    "about.expertise4Detail": "Gestión Ágil",

    // Experience
    "exp.title": "Experiencia Profesional",
    "exp.subtitle": "Construyendo Soluciones Basadas en Datos",
    "exp.present": "Presente",

    // Education
    "edu.title": "Educación y Certificaciones",
    "edu.educationTitle": "Educación",
    "edu.certificationsTitle": "Certificaciones",
    "edu.expected": "Esperado Dic 2025",

    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.subtitle": "Herramientas y Tecnologías",
    "skills.bi": "Inteligencia de Negocios",
    "skills.programming": "Programación y Frameworks",
    "skills.project": "Gestión de Proyectos",
    "skills.web": "Diseño y Desarrollo Web",

    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.subtitle": "Análisis de Datos y Desarrollo",
    "projects.description":
      "Una muestra de mi trabajo en Inteligencia de Negocios, Análisis de Datos y Desarrollo Web.",
    "projects.placeholder":
      "Sección de proyectos próximamente. Conecta tu API de Airtable para mostrar datos dinámicos de proyectos.",
    "projects.viewProject": "Ver Proyecto",

    // Contact
    "contact.title": "Contáctame",
    "contact.subtitle": "Ponte en Contacto",
    "contact.name": "Nombre",
    "contact.email": "Correo",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.info": "Información de Contacto",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
  },
}
