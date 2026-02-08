/**
 * In-memory log of sign-ins so you can see who signed in to your platform.
 * For production, replace with a database (e.g. save to a table).
 */

export type SignInEntry = {
  email: string
  name: string | null
  provider: string // "google" | "credentials"
  signedInAt: string // ISO date
}

const signInLog: SignInEntry[] = []
const MAX_ENTRIES = 500

export function recordSignIn(entry: Omit<SignInEntry, "signedInAt">) {
  signInLog.unshift({
    ...entry,
    signedInAt: new Date().toISOString(),
  })
  if (signInLog.length > MAX_ENTRIES) signInLog.pop()
}

export function getSignInLog(limit = 100): SignInEntry[] {
  return signInLog.slice(0, limit)
}
