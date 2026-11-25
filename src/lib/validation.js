import { z } from "zod";

// ---------- helpers ----------

const httpUrl = z
  .string()
  .trim()
  .refine((value) => /^https?:\/\/[^\s]+$/i.test(value), {
    message: "Must be a full http(s) URL",
  });

/** "" or missing -> undefined, otherwise must be an http(s) URL. */
const optionalHttpUrl = z.preprocess(
  (value) => (value === "" || value == null ? undefined : value),
  httpUrl.optional()
);

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().max(300).optional()
);

/**
 * A file in /public (/projects/x/1.jpg) or an upload on Vercel Blob.
 * next/image only serves hosts listed in next.config.mjs, so arbitrary URLs
 * are rejected here instead of crashing the page at render time.
 */
const imageRef = z
  .string()
  .trim()
  .refine(
    (value) =>
      /^\/(?!\/)[^\s]*$/.test(value) ||
      /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/[^\s]+$/i.test(value),
    { message: "Use a /public path or an image uploaded from this dashboard" }
  );

// ---------- project details (case-study JSON) ----------

const textItem = z.object({
  title: z.string().min(1),
  text: z.string().optional(),
});

const detailsSchema = z
  .object({
    overview: z.array(z.string()).optional(),
    problem: z.array(z.string()).optional(),
    objectives: z.array(z.string()).optional(),
    features: z.array(textItem).optional(),
    alsoUsed: z.array(z.string()).optional(),
    architecture: z
      .object({
        summary: z.string().optional(),
        layers: z
          .array(z.object({ name: z.string().min(1), text: z.string() }))
          .optional(),
      })
      .strict()
      .optional(),
    process: z.array(textItem).optional(),
    challenges: z
      .array(
        z.object({
          title: z.string().min(1),
          challenge: z.string(),
          resolution: z.string(),
        })
      )
      .optional(),
    caseStudy: z
      .object({
        background: z.array(z.string()).optional(),
        decisions: z.array(textItem).optional(),
        implementation: z.array(textItem).optional(),
        lessons: z.array(z.string()).optional(),
      })
      .strict()
      .optional(),
    technicalNotes: z
      .record(
        z.string(),
        z.object({ title: z.string().min(1), description: z.string() })
      )
      .optional(),
  })
  .strict();

// ---------- project ----------

export const VISUALS = ["availability", "architecture", "analytics"];

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and hyphens only"),
  title: z.string().trim().min(1, "Title is required").max(120),
  year: z.string().trim().min(1, "Year is required").max(12),
  status: optionalText,
  tagline: optionalText,
  description: z.string().trim().min(1, "Description is required").max(2000),
  order: z.coerce.number().int().min(0).max(9999),
  liveUrl: optionalHttpUrl,
  githubUrl: httpUrl,
  visual: z.enum(VISUALS),
  featured: z.boolean(),
  published: z.boolean(),
  stack: z.array(z.string().trim().min(1).max(60)).max(30),
  highlights: z.array(z.string().trim().min(1).max(300)).max(30),
  images: z.array(imageRef).max(12),
  details: detailsSchema,
});

// ---------- contact form ----------

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().max(200).pipe(z.email("Please enter a valid email")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(4000, "Message is too long"),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(200).optional(),
});

// ---------- admin login ----------

export const loginSchema = z.object({
  email: z.string().trim().max(200),
  password: z.string().min(1).max(200),
});
