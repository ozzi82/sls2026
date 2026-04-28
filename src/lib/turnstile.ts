interface TurnstileResult {
  success: boolean
  error?: string
}

export async function verifyTurnstile(token: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification")
    return { success: true }
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    )
    const data = await res.json()
    if (data.success) return { success: true }
    return { success: false, error: "Verification failed" }
  } catch (err) {
    console.error("Turnstile verification error:", err)
    return { success: false, error: "Verification service unavailable" }
  }
}
