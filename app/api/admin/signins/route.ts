import { NextResponse } from "next/server"
import { getSignInLog } from "@/lib/signin-log"

/**
 * GET /api/admin/signins
 * Returns the list of users who have signed in to your platform (Google + email).
 * In production, protect this route (e.g. require admin auth or a secret key).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 500)
  const log = getSignInLog(limit)
  return NextResponse.json({ signIns: log, count: log.length })
}
