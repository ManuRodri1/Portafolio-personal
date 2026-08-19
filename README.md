# Portafolio personal — Jose Manuel De Jesus Rodriguez

Sitio profesional bilingüe construido con Next.js para presentar experiencia en Business Intelligence, ingeniería de software e IA aplicada, junto con la oferta comercial de JMDR Digital Solutions.

## Tecnologías

- Next.js 16 y React 19
- TypeScript
- Supabase para el contenido relacional del portafolio
- Airtable para los blogs y rutas comerciales existentes
- CSS y Tailwind CSS 4
- Vercel Analytics

## Requisitos

- Node.js 20.9 o superior
- npm
- Credenciales públicas de Supabase para cargar los datos del portafolio
- Credenciales de Airtable para las rutas que todavía consumen Airtable

## Configuración local

1. Instala las dependencias:

   ```bash
   npm ci
   ```

2. Crea el archivo local de variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

3. Completa las variables necesarias en `.env.local`. Nunca publiques este archivo.

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre `http://localhost:3000`.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave pública recomendada para Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Nombre legado compatible para la clave pública |
| `AIRTABLE_API_KEY` | Acceso del servidor a Airtable |
| `AIRTABLE_BASE_ID` | Identificador de la base de Airtable |
| `AIRTABLE_TABLE_NAME` | Tabla de proyectos; usa `Projects` por defecto |

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor local de desarrollo |
| `npm run lint` | Revisión de ESLint |
| `npm run typecheck` | Validación de TypeScript sin emitir archivos |
| `npm run build` | Build optimizado de producción |
| `npm run check` | Ejecuta lint, typecheck y build |
| `npm start` | Sirve un build de producción existente |

## Rutas principales

- `/` — JMDR Digital Solutions
- `/portfolio` — portafolio profesional
- `/blog` — publicaciones existentes desde Airtable
- `/services/business-intelligence`
- `/services/web-solutions`

## Integraciones de datos

El portafolio consume Supabase mediante acceso público protegido por RLS. Los blogs todavía utilizan Airtable; su migración a Supabase Insights está planificada como una fase independiente.

No incluyas credenciales, claves de servicio ni archivos `.env.local` en commits. El repositorio contiene únicamente `.env.example` con valores vacíos.

## Verificación continua

El workflow de GitHub Actions en `.github/workflows/ci.yml` ejecuta instalación limpia, lint, typecheck y build en cada push o pull request dirigido a `main`.

## Derechos

© 2026 Jose Manuel De Jesus Rodriguez. Todos los derechos reservados.
