import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, filename } = body as { image: string; filename: string }

    if (!image || !filename) {
      return NextResponse.json({ error: "Missing image data or filename" }, { status: 400 })
    }

    // Validate data URL format
    const match = image.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/)
    if (!match) {
      return NextResponse.json(
        { error: "Invalid image format. Only JPEG, PNG, and WebP are supported." },
        { status: 400 }
      )
    }

    const mimeType = match[1]
    const base64Data = match[2]
    const buffer = Buffer.from(base64Data, "base64")

    // Check size (5MB limit)
    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image exceeds 5MB limit" }, { status: 413 })
    }

    // Determine extension from MIME type
    const ext = mimeType === "image/jpeg" ? ".jpg" : mimeType === "image/png" ? ".png" : ".webp"

    // Sanitize filename and create unique name
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "").replace(/\.(jpeg|png|webp)$/i, "")
    const uniqueName = `${safeName}-${Date.now()}${ext}`

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Write file to public/uploads/
    const filePath = join(uploadsDir, uniqueName)
    await writeFile(filePath, buffer)

    const url = `/uploads/${uniqueName}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Upload failed. Storage may be full." },
      { status: 500 }
    )
  }
}
