import "server-only"

const SUPABASE_REVALIDATE_SECONDS = 600

function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  const key = publishableKey || anonKey

  if (!url || !key) return null

  try {
    return {
      url: new URL(url).toString().replace(/\/$/, ""),
      key,
      usesLegacyAnonKey: !publishableKey && Boolean(anonKey),
    }
  } catch {
    console.error("[portfolio] Supabase URL is invalid.")
    return null
  }
}

export function hasPublicSupabaseConfig() {
  return getPublicSupabaseConfig() !== null
}

export async function selectPublicRows<T>(table: string, query: URLSearchParams): Promise<T[]> {
  const config = getPublicSupabaseConfig()
  if (!config) throw new Error("Supabase public configuration is unavailable.")

  const response = await fetch(`${config.url}/rest/v1/${table}?${query.toString()}`, {
    headers: {
      apikey: config.key,
      ...(config.usesLegacyAnonKey ? { Authorization: `Bearer ${config.key}` } : {}),
      Accept: "application/json",
    },
    next: {
      revalidate: SUPABASE_REVALIDATE_SECONDS,
      tags: ["portfolio-data"],
    },
  })

  if (!response.ok) {
    throw new Error(`Supabase request failed for ${table} (${response.status}).`)
  }

  return (await response.json()) as T[]
}
