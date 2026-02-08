"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type SignInEntry = {
  email: string
  name: string | null
  provider: string
  signedInAt: string
}

export default function SignInsPage() {
  const [signIns, setSignIns] = useState<SignInEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/signins")
      .then((r) => r.json())
      .then((data) => {
        setSignIns(data.signIns ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-2xl font-bold mb-2">Who signed in to your platform</h1>
        <p className="text-muted-foreground text-sm mb-6">
          This list shows everyone who signed in (Google or email/password). It is stored in your app, not in Google Cloud.
        </p>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : signIns.length === 0 ? (
          <p className="text-muted-foreground">No sign-ins yet. Sign in from the auth page to see entries here.</p>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Provider</th>
                  <th className="text-left p-3 font-medium">Signed in at</th>
                </tr>
              </thead>
              <tbody>
                {signIns.map((entry, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-3">{entry.email}</td>
                    <td className="p-3">{entry.name ?? "—"}</td>
                    <td className="p-3">{entry.provider}</td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(entry.signedInAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
