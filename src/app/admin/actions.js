"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkCredentials,
  clearSessionCookie,
  requireAdmin,
  setSessionCookie,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, hashIp } from "@/lib/request";
import { loginSchema, projectSchema } from "@/lib/validation";

/** Refresh every public page that shows project data. */
function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}

// ---------- auth ----------

export async function login(_previous, formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return { error: "Enter your email and password." };

  const ipHash = hashIp(getClientIp(await headers()));
  const limit = await rateLimit(`login:${ipHash}`, { limit: 10, windowSeconds: 15 * 60 });

  if (!limit.allowed) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }

  const ok = await checkCredentials(parsed.data.email, parsed.data.password);

  if (!ok) return { error: "Invalid email or password." };

  await setSessionCookie(parsed.data.email.trim().toLowerCase());
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}

// ---------- projects ----------

const lines = (value) =>
  String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const list = (value) =>
  String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

export async function saveProject(_previous, formData) {
  await requireAdmin();

  const id = Number(formData.get("id")) || null;

  // Raw values are returned on error so the form keeps what was typed.
  const values = Object.fromEntries(
    [
      "slug", "title", "year", "status", "tagline", "description", "order",
      "liveUrl", "githubUrl", "visual", "stack", "highlights", "images", "details",
    ].map((key) => [key, String(formData.get(key) ?? "")])
  );
  values.featured = formData.get("featured") === "on";
  values.published = formData.get("published") === "on";

  let details;

  try {
    details = JSON.parse(values.details.trim() || "{}");
  } catch (error) {
    return { values, errors: { details: `Invalid JSON: ${error.message}` } };
  }

  const parsed = projectSchema.safeParse({
    ...values,
    stack: list(values.stack),
    highlights: lines(values.highlights),
    images: lines(values.images),
    details,
  });

  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      const where = issue.path.length > 1 ? ` (${issue.path.slice(1).join(" → ")})` : "";
      errors[key] ??= `${issue.message}${where}`;
    }
    return { values, errors };
  }

  const data = {
    ...parsed.data,
    status: parsed.data.status ?? null,
    tagline: parsed.data.tagline ?? null,
    liveUrl: parsed.data.liveUrl ?? null,
  };

  try {
    if (id) {
      await db.project.update({ where: { id }, data });
    } else {
      await db.project.create({ data });
    }
  } catch (error) {
    if (error?.code === "P2002") {
      return { values, errors: { slug: "Another project already uses this slug." } };
    }
    if (error?.code === "P2025") {
      return { values, errors: { form: "This project no longer exists." } };
    }
    console.error("[admin] saveProject:", error?.message ?? error);
    return { values, errors: { form: "Could not save the project. Check the server logs." } };
  }

  revalidateSite();
  redirect("/admin");
}

export async function deleteProject(formData) {
  await requireAdmin();
  const id = Number(formData.get("id"));

  if (id) {
    await db.project.delete({ where: { id } }).catch(() => {});
    revalidateSite();
  }

  revalidatePath("/admin");
}

// ---------- messages ----------

export async function deleteMessage(formData) {
  await requireAdmin();
  const id = Number(formData.get("id"));

  if (id) await db.message.delete({ where: { id } }).catch(() => {});

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function toggleMessageRead(formData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const read = formData.get("read") === "true";

  if (id) await db.message.update({ where: { id }, data: { read } }).catch(() => {});

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
