import { profile } from "@/lib/profile"

export type PortfolioLanguage = "en" | "es"

export type LocalizedText = Record<PortfolioLanguage, string>

export interface PortfolioProject {
  eyebrow: LocalizedText
  title: LocalizedText
  problem: LocalizedText
  context: LocalizedText
  role: LocalizedText
  system: LocalizedText
  technologies: string[]
  capabilities: string[]
  media: PortfolioProjectMedia
  evidence: LocalizedText
  privacy: LocalizedText
  detailHref?: string
}

export type PortfolioProjectMedia =
  | {
      kind: "flow"
      label: LocalizedText
      note: LocalizedText
      steps: LocalizedText[]
    }
  | {
      kind: "image"
      src: string
      alt: LocalizedText
      width: number
      height: number
      caption?: LocalizedText
    }
  | {
      kind: "gallery"
      items: Array<{
        src: string
        alt: LocalizedText
        width: number
        height: number
        caption?: LocalizedText
      }>
    }

export interface PortfolioExperience {
  position: LocalizedText
  organization: string
  period: LocalizedText
  domain: LocalizedText
  contribution: LocalizedText
}

export interface PortfolioBuildArea {
  number: string
  title: LocalizedText
  problems: LocalizedText
  capabilities: string[]
  evidence: LocalizedText
  status: LocalizedText
  relatedHref: string
  relatedLabel: LocalizedText
}

export const portfolioLinks = {
  email: `mailto:${profile.email}`,
  hiringEmail:
    `mailto:${profile.email}?subject=Hiring%20or%20technical%20opportunity`,
  collaborationEmail:
    `mailto:${profile.email}?subject=Professional%20collaboration`,
  linkedin: profile.urls.linkedIn,
  github: profile.urls.github,
  resume: profile.resumeUrl,
} as const

export const selectedSystems: PortfolioProject[] = [
  {
    eyebrow: {
      en: "Operational Business Intelligence System",
      es: "Sistema de Business Intelligence operacional",
    },
    title: {
      en: "From operational records to decision-ready analytics",
      es: "De registros operacionales a analítica lista para decidir",
    },
    problem: {
      en: "Operational information is often distributed across sources and difficult to interpret consistently.",
      es: "La información operacional suele estar distribuida entre fuentes y ser difícil de interpretar de manera consistente.",
    },
    context: {
      en: "Operational and executive analytics where traceability, clear definitions, and repeatable refresh processes matter.",
      es: "Analítica operacional y ejecutiva donde importan la trazabilidad, las definiciones claras y los procesos de actualización repetibles.",
    },
    role: {
      en: "Business Intelligence development, data modeling, ETL, and analytical delivery.",
      es: "Desarrollo de Business Intelligence, modelado de datos, ETL y entrega analítica.",
    },
    system: {
      en: "A structured analytics layer that connects source preparation, business logic, semantic modeling, and decision-facing dashboards.",
      es: "Una capa analítica estructurada que conecta preparación de fuentes, lógica de negocio, modelado semántico y dashboards para la toma de decisiones.",
    },
    technologies: ["Power BI", "DAX", "SQL Server", "Microsoft Fabric", "ETL"],
    capabilities: ["Data preparation", "Semantic modeling", "Decision support"],
    media: {
      kind: "flow",
      label: { en: "System approach", es: "Enfoque del sistema" },
      note: {
        en: "Conceptual representation of the system approach—not a client architecture.",
        es: "Representación conceptual del enfoque—no es una arquitectura de cliente.",
      },
      steps: [
        { en: "Sources", es: "Fuentes" },
        { en: "Data preparation", es: "Preparación" },
        { en: "Semantic model", es: "Modelo semántico" },
        { en: "Business logic", es: "Lógica de negocio" },
        { en: "Power BI", es: "Power BI" },
        { en: "Decision", es: "Decisión" },
      ],
    },
    evidence: {
      en: "Public evidence can show the system approach, technology stack, sanitized dashboard patterns, and modeling decisions.",
      es: "La evidencia pública puede mostrar el enfoque del sistema, el stack, patrones de dashboards sanitizados y decisiones de modelado.",
    },
    privacy: {
      en: "Employer, client, operational, and record-level data remain private. No confidential captures are published.",
      es: "Los datos de empleadores, clientes, operaciones y registros permanecen privados. No se publican capturas confidenciales.",
    },
  },
  {
    eyebrow: {
      en: "Strategic Digital Platform",
      es: "Plataforma digital estratégica",
    },
    title: {
      en: "A maintainable web system for content, services, and discovery",
      es: "Un sistema web mantenible para contenido, servicios y descubrimiento",
    },
    problem: {
      en: "A professional digital presence needs more than pages: it needs a coherent content model, dependable delivery, and clear paths for different audiences.",
      es: "Una presencia digital profesional necesita más que páginas: requiere un modelo de contenido coherente, entrega confiable y rutas claras para distintas audiencias.",
    },
    context: {
      en: "A bilingual professional and commercial platform combining editorial content, project records, service information, and technical SEO.",
      es: "Una plataforma profesional y comercial bilingüe que combina contenido editorial, proyectos, servicios y SEO técnico.",
    },
    role: {
      en: "Product framing, information architecture, software development, content integration, and deployment.",
      es: "Definición de producto, arquitectura de información, desarrollo de software, integración de contenido y despliegue.",
    },
    system: {
      en: "A Next.js application with server-rendered routes, structured content, bilingual interfaces, and a data-backed publishing workflow.",
      es: "Una aplicación Next.js con rutas renderizadas en servidor, contenido estructurado, interfaces bilingües y un flujo de publicación respaldado por datos.",
    },
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Airtable"],
    capabilities: ["Information architecture", "Content systems", "Technical SEO"],
    media: {
      kind: "flow",
      label: { en: "Delivery model", es: "Modelo de entrega" },
      note: {
        en: "A conceptual view of the public platform and its delivery layers.",
        es: "Una vista conceptual de la plataforma pública y sus capas de entrega.",
      },
      steps: [
        { en: "Content model", es: "Modelo de contenido" },
        { en: "Application", es: "Aplicación" },
        { en: "Data integration", es: "Integración de datos" },
        { en: "Publishing", es: "Publicación" },
        { en: "Delivery", es: "Entrega" },
      ],
    },
    evidence: {
      en: "This live site, its public routes, project pages, blog publishing flow, and responsive interface provide direct evidence.",
      es: "Este sitio en vivo, sus rutas públicas, páginas de proyectos, flujo de publicación del blog e interfaz responsive ofrecen evidencia directa.",
    },
    privacy: {
      en: "Only public-facing implementation details are shown. Credentials, private records, and client-sensitive material are excluded.",
      es: "Solo se muestran detalles públicos de implementación. Se excluyen credenciales, registros privados y material sensible de clientes.",
    },
  },
]

export const professionalExperience: PortfolioExperience[] = [
  {
    position: {
      en: "Business Intelligence Developer",
      es: "Desarrollador de Business Intelligence",
    },
    organization: "Kids First Services",
    period: { en: "2026 — Present", es: "2026 — Actualidad" },
    domain: {
      en: "Business intelligence and organizational analytics.",
      es: "Business intelligence y analítica organizacional.",
    },
    contribution: {
      en: "Business intelligence work within an organizational analytics context.",
      es: "Trabajo de business intelligence dentro de un contexto de analítica organizacional.",
    },
  },
  {
    position: {
      en: "Digital Brand & Web Infrastructure Associate",
      es: "Asociado de marca digital e infraestructura web",
    },
    organization: "Successment",
    period: { en: "2025 — Present", es: "2025 — Actualidad" },
    domain: {
      en: "Digital platforms, web infrastructure, and brand systems.",
      es: "Plataformas digitales, infraestructura web y sistemas de marca.",
    },
    contribution: {
      en: "Support for web infrastructure and digital brand systems.",
      es: "Apoyo a infraestructura web y sistemas de marca digital.",
    },
  },
  {
    position: {
      en: "Business Intelligence Consultant",
      es: "Consultor de Business Intelligence",
    },
    organization: "SPN Software",
    period: { en: "2025 — 2026", es: "2025 — 2026" },
    domain: {
      en: "Analytics, data preparation, and decision-support systems.",
      es: "Analítica, preparación de datos y sistemas de apoyo a decisiones.",
    },
    contribution: {
      en: "Business intelligence work using data preparation and decision-support methods.",
      es: "Trabajo de business intelligence mediante preparación de datos y métodos de apoyo a decisiones.",
    },
  },
  {
    position: {
      en: "Operational Control Analyst",
      es: "Analista de control operacional",
    },
    organization: "Dominican Watchman",
    period: { en: "2023 — 2025", es: "2023 — 2025" },
    domain: {
      en: "Operational control, reporting, and process visibility.",
      es: "Control operacional, reportes y visibilidad de procesos.",
    },
    contribution: {
      en: "Operational control and reporting experience that established the portfolio's operational foundation.",
      es: "Experiencia en control operacional y reportes que estableció la base operacional del portafolio.",
    },
  },
  {
    position: { en: "Supervisor", es: "Supervisor" },
    organization: "Dominican Watchman",
    period: { en: "2022 — 2023", es: "2022 — 2023" },
    domain: {
      en: "Frontline operations and team coordination.",
      es: "Operaciones de primera línea y coordinación de equipos.",
    },
    contribution: {
      en: "Progressive responsibility in frontline operations and team coordination.",
      es: "Responsabilidad progresiva en operaciones de primera línea y coordinación de equipos.",
    },
  },
  {
    position: { en: "Teller", es: "Cajero" },
    organization: "Dominican Watchman",
    period: { en: "2020 — 2022", es: "2020 — 2022" },
    domain: {
      en: "Transaction operations and service execution.",
      es: "Operaciones transaccionales y ejecución de servicio.",
    },
    contribution: {
      en: "The role marks the start of the verified operations-to-systems progression shown on this page.",
      es: "El rol marca el inicio de la progresión verificada de operaciones a sistemas que presenta esta página.",
    },
  },
]

export const buildAreas: PortfolioBuildArea[] = [
  {
    number: "01",
    title: {
      en: "Analytics & Decision Systems",
      es: "Analítica y sistemas de decisión",
    },
    problems: {
      en: "Fragmented operational data, unclear performance signals, and reporting that is difficult to repeat.",
      es: "Datos operacionales fragmentados, señales de desempeño poco claras y reportes difíciles de repetir.",
    },
    capabilities: ["Power BI", "DAX", "SQL Server", "Microsoft Fabric", "ETL"],
    evidence: {
      en: "Operational and executive analytics, semantic models, and data preparation workflows.",
      es: "Analítica operacional y ejecutiva, modelos semánticos y flujos de preparación de datos.",
    },
    status: { en: "Professional practice", es: "Práctica profesional" },
    relatedHref: "#work",
    relatedLabel: { en: "View related work", es: "Ver trabajo relacionado" },
  },
  {
    number: "02",
    title: {
      en: "Automation & Software Systems",
      es: "Automatización y sistemas de software",
    },
    problems: {
      en: "Manual workflows, disconnected tools, and digital processes that do not scale cleanly.",
      es: "Flujos manuales, herramientas desconectadas y procesos digitales que no escalan de forma limpia.",
    },
    capabilities: ["Python", "Next.js", "TypeScript", "React", "APIs"],
    evidence: {
      en: "Web applications, data-connected interfaces, automated processes, and maintainable delivery systems.",
      es: "Aplicaciones web, interfaces conectadas a datos, procesos automatizados y sistemas mantenibles.",
    },
    status: { en: "Professional practice", es: "Práctica profesional" },
    relatedHref: "#work",
    relatedLabel: { en: "View related work", es: "Ver trabajo relacionado" },
  },
  {
    number: "03",
    title: {
      en: "Applied AI Experiments",
      es: "Experimentos de IA aplicada",
    },
    problems: {
      en: "Private knowledge access, document retrieval, and data questions that need grounded, inspectable answers.",
      es: "Acceso privado al conocimiento, recuperación documental y preguntas sobre datos que necesitan respuestas fundamentadas e inspeccionables.",
    },
    capabilities: ["Local AI", "RAG", "Document intelligence", "Data-connected assistants"],
    evidence: {
      en: "JMDR Private Intelligence is being developed as a bounded environment for responsible experimentation.",
      es: "JMDR Private Intelligence se desarrolla como un entorno acotado para experimentación responsable.",
    },
    status: { en: "In development", es: "En desarrollo" },
    relatedHref: "#applied-ai",
    relatedLabel: { en: "View current experiment", es: "Ver experimento actual" },
  },
]

export const throughline = [
  {
    number: "01",
    title: { en: "Operational foundation", es: "Base operacional" },
    status: { en: "Foundation", es: "Base" },
    body: {
      en: "Direct experience with processes, service execution, coordination, and operational control.",
      es: "Experiencia directa con procesos, ejecución de servicio, coordinación y control operacional.",
    },
  },
  {
    number: "02",
    title: { en: "Business Intelligence", es: "Business Intelligence" },
    status: { en: "Core practice", es: "Práctica principal" },
    body: {
      en: "Turning operational information into models, dashboards, and repeatable decision support.",
      es: "Transformación de información operacional en modelos, dashboards y apoyo repetible a decisiones.",
    },
  },
  {
    number: "03",
    title: { en: "Software systems", es: "Sistemas de software" },
    status: { en: "Delivery layer", es: "Capa de entrega" },
    body: {
      en: "Extending analytics with applications, integrations, interfaces, and automation.",
      es: "Extensión de la analítica con aplicaciones, integraciones, interfaces y automatización.",
    },
  },
  {
    number: "04",
    title: { en: "Applied AI", es: "IA aplicada" },
    status: { en: "Current expansion", es: "Expansión actual" },
    body: {
      en: "Building toward private, grounded assistants connected to documents, data, and tools.",
      es: "Construcción progresiva de asistentes privados y fundamentados, conectados a documentos, datos y herramientas.",
    },
  },
] satisfies Array<{
  number: string
  title: LocalizedText
  status: LocalizedText
  body: LocalizedText
}>

export const portfolioCopy = {
  en: {
    skip: "Skip to content",
    nav: {
      work: "Work",
      experience: "Experience",
      aiLab: "AI Lab",
      insights: "Ideas",
      connect: "Connect",
      cv: "CV",
      menu: "Menu",
      close: "Close",
      commercial: "JMDR Digital Solutions",
    },
    headerNote:
      "For consulting and implementation engagements, I work through JMDR Digital Solutions.",
    hero: {
      eyebrow: `${profile.fullName} · Dominican Republic`,
      title: "Business Intelligence Developer",
      supportingTitle: "Software Engineer · Applied AI Builder",
      value:
        "I build data, software, and applied AI systems that turn operational complexity into measurable decisions.",
      primary: "View selected work",
      secondary: "Connect",
    },
    evidence: [
      "Operational and executive analytics",
      "Data modeling and ETL",
      "Automation and software systems",
      "Power BI · SQL · Microsoft Fabric · Python · Next.js",
    ],
    sections: {
      technology: ["Technology index", "A real stack, organized by practice."],
      work: ["Selected systems", "Evidence before claims."],
      throughline: ["Professional throughline", "A progression built from practice."],
      build: ["What I build", "Three connected areas, at honest stages."],
      experience: ["Experience", "The operating context behind the systems."],
      ai: ["Applied AI preview", "A bounded lab, clearly in development."],
      insights: ["Ideas and insights", "Ideas, learnings, and published work."],
      about: ["About", "Technical work grounded in operations."],
      connect: ["Connect", "Choose the conversation that fits."],
    },
    projectLabels: {
      problem: "Problem",
      context: "Context",
      role: "My role",
      system: "System built",
      technologies: "Technologies",
      capabilities: "Related capabilities",
      evidence: "Evidence available",
      privacy: "Privacy limitations",
      detail: "Explore related projects",
    },
    buildLabels: {
      problems: "Problems addressed",
      capabilities: "Capabilities",
      evidence: "Evidence",
      status: "Current status",
    },
    experienceLabels: {
      domain: "Problem domain",
      contribution: "Contribution",
    },
    experienceIntro:
      "An operational foundation that evolved into data, software, and decision systems.",
    ai: {
      name: "JMDR Private Intelligence",
      status: "In development",
      focus: "Current focus",
      stageLabel: "Current stage",
      stage: "Research & prototyping",
      body:
        "An applied research track for private, local, and grounded AI systems—developed through careful research and reproducible prototypes.",
      items: [
        "Private local AI",
        "Document intelligence",
        "Retrieval-augmented generation (RAG)",
        "Data-connected assistants",
        "Responsible experimentation",
      ],
      note: "Evidence will be published as experiments become reproducible.",
    },
    insights: {
      published: "Published notes",
      exploring: "Currently exploring",
      topics: [
        "Business Intelligence and data modeling",
        "Local AI and RAG",
        "Software systems and automation",
        "Building in public",
      ],
      read: "Read article",
      visit: "View all real articles",
    },
    about:
      "I am a Business Intelligence developer and software engineer based in the Dominican Republic. My foundation is operational: I learned how processes, controls, and frontline decisions work before moving deeper into analytics. That path now informs how I build data models, decision systems, software, and responsible applied AI experiments. The goal is continuity—systems that remain understandable, useful, and grounded in real work.",
    cta: [
      {
        label: "Hiring or technical opportunities",
        body: "For BI, data systems, software engineering, and adjacent applied AI roles.",
        action: "Discuss an opportunity",
      },
      {
        label: "Professional collaboration and networking",
        body: "For events, technical exchange, content, and thoughtful professional connections.",
        action: "Connect on LinkedIn",
      },
      {
        label: "Commercial projects",
        body: "Consulting and implementation engagements are handled through JMDR Digital Solutions.",
        action: "Visit JMDR Digital Solutions",
      },
    ],
    footer: {
      location: "Dominican Republic",
      contact: "Contact",
      language: "Language",
      discipline: "Business Intelligence · Software Engineering · Applied AI",
      explore: "Explore",
      connect: "Connect",
      commercial: "Commercial",
      copyright: `© 2026 ${profile.fullName}. All rights reserved.`,
    },
  },
  es: {
    skip: "Saltar al contenido",
    nav: {
      work: "Trabajo",
      experience: "Experiencia",
      aiLab: "AI Lab",
      insights: "Ideas",
      connect: "Conectar",
      cv: "CV",
      menu: "Menú",
      close: "Cerrar",
      commercial: "JMDR Digital Solutions",
    },
    headerNote:
      "Para consultoría e implementaciones, trabajo a través de JMDR Digital Solutions.",
    hero: {
      eyebrow: `${profile.fullName} · República Dominicana`,
      title: "Desarrollador de Business Intelligence",
      supportingTitle: "Ingeniero de software · Construyendo IA aplicada",
      value:
        "Construyo sistemas de datos, software e IA aplicada que convierten operaciones complejas en decisiones más claras y medibles.",
      primary: "Ver trabajo seleccionado",
      secondary: "Conectar",
    },
    evidence: [
      "Analítica operacional y ejecutiva",
      "Modelado de datos y ETL",
      "Automatización y sistemas de software",
      "Power BI · SQL · Microsoft Fabric · Python · Next.js",
    ],
    sections: {
      technology: ["Índice tecnológico", "Un stack real, organizado por práctica."],
      work: ["Sistemas seleccionados", "Primero, la evidencia."],
      throughline: ["Trayectoria profesional", "Una trayectoria construida desde la práctica."],
      build: ["Lo que construyo", "Tres áreas que se complementan."],
      experience: ["Experiencia", "La experiencia detrás de los sistemas."],
      ai: ["Vista previa de IA aplicada", "Un laboratorio acotado, claramente en desarrollo."],
      insights: ["Ideas y aprendizajes", "Ideas, aprendizajes y trabajo publicado."],
      about: ["Sobre mí", "Tecnología construida desde la operación."],
      connect: ["Conectar", "Elige la conversación adecuada."],
    },
    projectLabels: {
      problem: "Problema",
      context: "Contexto",
      role: "Mi rol",
      system: "Sistema construido",
      technologies: "Tecnologías",
      capabilities: "Capacidades relacionadas",
      evidence: "Evidencia disponible",
      privacy: "Limitaciones de privacidad",
      detail: "Explorar proyectos relacionados",
    },
    buildLabels: {
      problems: "Problemas que aborda",
      capabilities: "Capacidades",
      evidence: "Evidencia",
      status: "Estado actual",
    },
    experienceLabels: {
      domain: "Dominio del problema",
      contribution: "Contribución",
    },
    experienceIntro:
      "Una base operacional que evolucionó hacia datos, software y sistemas de decisión.",
    ai: {
      name: "JMDR Private Intelligence",
      status: "En desarrollo",
      focus: "Enfoque actual",
      stageLabel: "Etapa actual",
      stage: "Investigación y prototipado",
      body:
        "Una línea de investigación aplicada sobre sistemas de IA privados, locales y fundamentados, desarrollada con investigación cuidadosa y prototipos reproducibles.",
      items: [
        "IA local y privada",
        "Inteligencia documental",
        "Generación aumentada por recuperación (RAG)",
        "Asistentes conectados a datos",
        "Experimentación responsable",
      ],
      note: "La evidencia se publicará a medida que los experimentos sean reproducibles.",
    },
    insights: {
      published: "Notas publicadas",
      exploring: "Explorando actualmente",
      topics: [
        "Business Intelligence y modelado de datos",
        "IA local y RAG",
        "Sistemas de software y automatización",
        "Construcción en público",
      ],
      read: "Leer artículo",
      visit: "Ver todos los artículos reales",
    },
    about:
      "Comencé trabajando directamente con operaciones, procesos y controles. Esa experiencia me enseñó a reconocer qué información hace falta para decidir y dónde se rompe un flujo de trabajo. Desde ahí evolucioné hacia Business Intelligence, modelado de datos y sistemas de decisión; luego incorporé ingeniería de software para construir soluciones más completas. Hoy amplío esa práctica con IA aplicada, especialmente sistemas privados, RAG y asistentes conectados a datos, manteniendo la misma prioridad: que la tecnología sea comprensible y útil en el trabajo real.",
    cta: [
      {
        label: "Oportunidades laborales o técnicas",
        body: "Para roles de BI, sistemas de datos, ingeniería de software y áreas adyacentes de IA aplicada.",
        action: "Conversar sobre una oportunidad",
      },
      {
        label: "Colaboración profesional y networking",
        body: "Para eventos, intercambio técnico, contenido y conexiones profesionales con intención.",
        action: "Conectar en LinkedIn",
      },
      {
        label: "Proyectos comerciales",
        body: "La consultoría y las implementaciones se gestionan mediante JMDR Digital Solutions.",
        action: "Visitar JMDR Digital Solutions",
      },
    ],
    footer: {
      location: "República Dominicana",
      contact: "Contacto",
      language: "Idioma",
      discipline: "Business Intelligence · Ingeniería de software · IA aplicada",
      explore: "Explorar",
      connect: "Conectar",
      commercial: "Comercial",
      copyright: `© 2026 ${profile.fullName}. Todos los derechos reservados.`,
    },
  },
} as const
