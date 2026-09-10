// Server-only: R2 environment validation with fail-fast startup errors.
//
// Imported by server modules (r2-client getters) so misconfigured production
// deployments crash loudly at first use instead of silently falling back to
// localhost credentials. Never import this file from client components.
import { z } from "zod"

const r2VarNames = [
  "R2_BUCKET_NAME",
  "R2_PUBLIC_URL",
  "R2_ENDPOINT",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
] as const

export type R2EnvVarName = (typeof r2VarNames)[number]

const nonEmptyString = z.string().min(1)

function isProduction(env: NodeJS.ProcessEnv): boolean {
  return env.NODE_ENV === "production"
}

/**
 * Fail-fast validation for R2 configuration. In production every required
 * R2 variable must be a non-empty string; the first missing variable throws
 * a named error identifying it. In non-production environments this is a
 * no-op so local dev keeps its localhost fallbacks.
 */
export function assertProductionR2Env(
  env: NodeJS.ProcessEnv = process.env,
): void {
  if (!isProduction(env)) {
    return
  }
  for (const name of r2VarNames) {
    const parsed = nonEmptyString.safeParse(env[name])
    if (!parsed.success) {
      throw new Error(
        `[env] ${name} is required in production but is missing or empty. Set ${name} before starting the server.`,
      )
    }
  }
}

/**
 * List the required R2 variable names that are missing or empty. Useful for
 * startup diagnostics that want the full picture instead of fail-fast.
 */
export function getMissingR2EnvVars(
  env: NodeJS.ProcessEnv = process.env,
): R2EnvVarName[] {
  const missing: R2EnvVarName[] = []
  for (const name of r2VarNames) {
    if (!nonEmptyString.safeParse(env[name]).success) {
      missing.push(name)
    }
  }
  return missing
}
