# Portfolio design direction

Scope: `/portfolio` only. The commercial JMDR Digital Solutions routes retain their existing design system until a later approved phase.

## Direction

Human Systems Engineer with Editorial Discipline and a Bounded AI Lab.

The portfolio pairs professional narrative with inspectable proof. Major sections use an alternating split composition: a claim or context on one side and a structured system description, timeline, or evidence surface on the other. The AI area is intentionally bounded and labeled as in development.

Phase 2B.1 adds a human editorial layer without changing the system: a 58/42 portrait-led Hero, a second studio portrait in About, a compact single sticky header, and a semantic Technology Index. The Microsoft event photograph remains unused because its dominant logo could imply an affiliation that the page does not claim.

## Visual system

- Canvas: `#F7F5EF`
- Structural ink: `#152138`
- Deep navy technical surface: `#10213A`
- Systems blue: `#315E8C`
- Controlled coral accent: `#D45C50`
- Status moss: `#59735A`
- Steel: `#8491A3`
- Display: Archivo
- Body: Source Sans 3
- Technical labels and data: IBM Plex Mono

Tokens are defined in `/tokens.css` under the `.portfolio-shell` namespace. Route styles live in `/app/portfolio/portfolio.css`; they must not be promoted to global tokens until the broader brand architecture is approved.

## Composition rules

- Prefer editorial bands, tabular evidence, definitions, and process sequences over repeated generic cards.
- Use light surfaces for the main reading experience.
- Reserve dark surfaces for systems, code-adjacent material, architecture, and the bounded AI preview.
- Use coral for focus, active signals, and a small number of meaningful accents—not section backgrounds.
- Use diagrams to explain relationships; do not add decorative terminal chrome, grids, particles, glows, glass effects, or animated counters.
- Claims must be supported by public evidence or explicitly marked as private, limited, or in development.
- Use rectangular studio photography with controlled crops; never present the person as an avatar, floating badge, or decorative cutout.
- Technology marks support recognition but never replace visible technology names. Unsupported brand marks use restrained textual identifiers rather than approximate logos.

## Interaction and accessibility

- Touch targets are at least 44 px.
- Interactive labels remain on one line; containers reflow instead.
- Focus is visible and immediate.
- Hover effects are additive and never required for understanding.
- Motion is optional, minimal, and disabled under `prefers-reduced-motion`.
- Mobile navigation is a disclosure with CV directly accessible and Connect plus language controls available in the opened menu.

## Content contract

The hero, positioning, professional areas, throughline, primary experience, about text, calls to action, and contact details must render from versioned local content. Airtable may enrich the published-notes section, but a missing integration must never degrade the essential page or expose a technical error.
