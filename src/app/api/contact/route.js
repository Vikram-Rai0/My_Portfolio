import { NextResponse, after } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, hashIp } from "@/lib/request";

const MAX_PER_HOUR = 5;

function singleLine(value) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

async function notifyByEmail({ name, email, message }) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${singleLine(name)}`,
      text: `From: ${singleLine(name)} <${email}>\n\n${message}`,
    });
    if (error) console.error("[contact] Resend error:", error.message);
  } catch (error) {
    // The message is already saved; a failed notification must not fail the request.
    console.error("[contact] Email notification failed:", error?.message ?? error);
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(z.flattenError(parsed.error).fieldErrors).map(
        ([field, messages]) => [field, messages?.[0]]
      )
    );
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot filled in: pretend success so bots don't learn anything.
  if (website) return NextResponse.json({ ok: true });

  const ipHash = hashIp(getClientIp(request.headers));

  try {
    const limit = await rateLimit(`contact:${ipHash}`, {
      limit: MAX_PER_HOUR,
      windowSeconds: 60 * 60,
    });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    await db.message.create({
      data: {
        name,
        email,
        body: message,
        ipHash,
        userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
      },
    });
  } catch (error) {
    console.error("[contact] Failed to save message:", error?.message ?? error);
    return NextResponse.json(
      { error: "Could not send your message. Please email me directly." },
      { status: 500 }
    );
  }

  after(() => notifyByEmail({ name, email, message }));

  return NextResponse.json({ ok: true });
}
