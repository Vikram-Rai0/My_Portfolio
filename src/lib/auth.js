import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export const SESSION_COOKIE = "admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set and at least 32 characters long.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email) {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(getKey());
}

export async function verifySessionToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getKey(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export async function setSessionCookie(email) {
  const token = await createSessionToken(email);
  const store = await cookies();

  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Checks the single admin account configured through env vars. */
export async function checkCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64;

  if (!adminEmail || !hashB64) return false;

  const hash = Buffer.from(hashB64, "base64").toString("utf8");
  const emailOk = email.trim().toLowerCase() === adminEmail;
  // Always run bcrypt so response time doesn't reveal whether the email matched.
  const passwordOk = await bcrypt.compare(password, hash);

  return emailOk && passwordOk;
}
