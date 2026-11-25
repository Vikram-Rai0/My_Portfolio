import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

/** Checks the real file signature, not just the declared type. */
function matchesSignature(bytes, type) {
  const ascii = (start, end) => String.fromCharCode(...bytes.slice(start, end));

  switch (type) {
    case "image/jpeg":
      return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case "image/png":
      return bytes[0] === 0x89 && ascii(1, 4) === "PNG";
    case "image/webp":
      return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
    case "image/avif":
      return ascii(4, 12).startsWith("ftyp") && /avif|avis/.test(ascii(8, 16));
    default:
      return false;
  }
}

export async function POST(request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image uploads are not configured (BLOB_READ_WRITE_TOKEN is missing)." },
      { status: 501 }
    );
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const slug = String(form?.get("slug") ?? "misc").replace(/[^a-z0-9-]/g, "").slice(0, 60) || "misc";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const extension = ALLOWED[file.type];

  if (!extension) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP or AVIF images are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 400 });
  }

  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());

  if (!matchesSignature(header, file.type)) {
    return NextResponse.json({ error: "File content does not match its type." }, { status: 400 });
  }

  try {
    const blob = await put(`projects/${slug}/${Date.now()}.${extension}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("[upload]", error?.message ?? error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
