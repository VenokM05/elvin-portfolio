import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().default(""),
})
const MAX_BODY_BYTES = 32768
const reply = (body: object, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } })

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) return reply({ error: "This request is not allowed." }, 403)
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply({ error: "Please submit the contact form as JSON." }, 415)
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return reply({ error: "Message is too large." }, 413)
  const reader = request.body?.getReader()
  if (!reader) return reply({ error: "Message is required." }, 400)
  let bytes = 0
  let body = ""
  try {
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel()
        return reply({ error: "Message is too large." }, 413)
      }
      body += decoder.decode(value, { stream: true })
    }
    body += decoder.decode()
  } catch {
    return reply({ error: "Unable to read your message. Please try again." }, 400)
  } finally { reader.releaseLock() }

  let parsed: ReturnType<typeof contactSchema.safeParse>
  try { parsed = contactSchema.safeParse(JSON.parse(body)) }
  catch { return reply({ error: "Invalid message format." }, 400) }
  if (!parsed.success) return reply({ error: "Enter your name, a valid email, and a message of 10–5,000 characters." }, 400)

  const formId = process.env.FORMSPREE_FORM_ID?.trim()
  if (!formId || !/^[a-zA-Z0-9]{6,64}$/.test(formId)) {
    return reply({ error: "The contact form is not available yet. Please use the direct email link." }, 503)
  }
  try {
    const { name, email, message } = parsed.data
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message }), cache: "no-store", signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) {
      return reply({ error: response.status === 429 ? "Too many messages. Please wait and try again, or email me directly." : "Your message could not be confirmed. Please try again or email me directly." }, response.status === 429 ? 429 : 502)
    }
    return reply({ ok: true }, 200)
  } catch {
    return reply({ error: "Delivery could not be confirmed. Please try again later or email me directly." }, 502)
  }
}
