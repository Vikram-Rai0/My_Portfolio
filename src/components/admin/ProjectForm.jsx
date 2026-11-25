"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { saveProject } from "@/app/admin/actions";

const FIELD =
  "w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-muted focus:border-forest focus:outline-none";

function Field({ label, name, error, hint, children }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[12px] text-ink-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-[12px] font-medium text-ink">{error}</p>}
    </div>
  );
}

export default function ProjectForm({ project }) {
  const [state, action, pending] = useActionState(saveProject, null);
  const v = state?.values ?? project;
  const errors = state?.errors ?? {};

  const [images, setImages] = useState(v.images);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const slugRef = useRef(null);

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setUploadMessage("");

    const body = new FormData();
    body.append("file", file);
    body.append("slug", slugRef.current?.value ?? "");

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.error ?? "Upload failed.");

      setImages((current) => (current.trim() ? `${current.trimEnd()}\n${result.url}` : result.url));
      setUploadMessage("Uploaded. The URL was added below. Save the project to publish it.");
    } catch (error) {
      setUploadMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="space-y-6">
      {project.id && <input type="hidden" name="id" value={project.id} />}

      {errors.form && (
        <p role="alert" className="rounded-xl border border-line bg-paper-sage px-4 py-3 text-[14px] text-ink">
          {errors.form}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" name="title" error={errors.title}>
          <input id="title" name="title" defaultValue={v.title} required className={FIELD} />
        </Field>
        <Field label="Slug (URL)" name="slug" error={errors.slug} hint="Used in /projects/<slug>. Lowercase, hyphens.">
          <input id="slug" name="slug" ref={slugRef} defaultValue={v.slug} required className={FIELD} />
        </Field>
        <Field label="Year" name="year" error={errors.year}>
          <input id="year" name="year" defaultValue={v.year} required className={FIELD} />
        </Field>
        <Field label="Status (optional)" name="status" error={errors.status} hint='e.g. "In production"'>
          <input id="status" name="status" defaultValue={v.status} className={FIELD} />
        </Field>
        <Field label="Display order" name="order" error={errors.order} hint="Lower numbers appear first.">
          <input id="order" name="order" type="number" min="0" defaultValue={v.order} required className={FIELD} />
        </Field>
        <Field label="Illustration (shown when there are no screenshots)" name="visual" error={errors.visual}>
          <select id="visual" name="visual" defaultValue={v.visual} className={FIELD}>
            <option value="availability">availability</option>
            <option value="architecture">architecture</option>
            <option value="analytics">analytics</option>
          </select>
        </Field>
        <Field label="Live URL (optional)" name="liveUrl" error={errors.liveUrl}>
          <input id="liveUrl" name="liveUrl" defaultValue={v.liveUrl} placeholder="https://" className={FIELD} />
        </Field>
        <Field label="GitHub URL" name="githubUrl" error={errors.githubUrl}>
          <input id="githubUrl" name="githubUrl" defaultValue={v.githubUrl} placeholder="https://github.com/…" required className={FIELD} />
        </Field>
      </div>

      <Field label="Tagline (optional)" name="tagline" error={errors.tagline}>
        <input id="tagline" name="tagline" defaultValue={v.tagline} className={FIELD} />
      </Field>

      <Field label="Description" name="description" error={errors.description}>
        <textarea id="description" name="description" rows={4} defaultValue={v.description} required className={`${FIELD} resize-y`} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tech stack" name="stack" error={errors.stack} hint="Comma or line separated.">
          <textarea id="stack" name="stack" rows={4} defaultValue={v.stack} className={`${FIELD} resize-y`} />
        </Field>
        <Field label="Highlights" name="highlights" error={errors.highlights} hint="One per line.">
          <textarea id="highlights" name="highlights" rows={4} defaultValue={v.highlights} className={`${FIELD} resize-y`} />
        </Field>
      </div>

      <Field label="Screenshots" name="images" error={errors.images} hint="One per line: a /public path or an uploaded image URL. The first one is the cover.">
        <textarea
          id="images"
          name="images"
          rows={4}
          value={images}
          onChange={(event) => setImages(event.target.value)}
          className={`${FIELD} resize-y font-mono text-[12px]`}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-ink transition-colors hover:bg-paper-sage">
            {uploading ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleUpload} disabled={uploading} className="sr-only" />
          </label>
          <span role="status" className="text-[12px] text-ink-soft">{uploadMessage}</span>
        </div>
      </Field>

      <Field
        label="Case-study content (JSON)"
        name="details"
        error={errors.details}
        hint="overview, problem, objectives, features, alsoUsed, architecture, process, challenges, caseStudy, technicalNotes."
      >
        <textarea
          id="details"
          name="details"
          rows={18}
          spellCheck={false}
          defaultValue={v.details}
          className={`${FIELD} resize-y font-mono text-[12px] leading-relaxed`}
        />
      </Field>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-[14px] text-ink">
          <input type="checkbox" name="published" defaultChecked={v.published} className="h-4 w-4 accent-forest" />
          Published
        </label>
        <label className="flex items-center gap-2 text-[14px] text-ink">
          <input type="checkbox" name="featured" defaultChecked={v.featured} className="h-4 w-4 accent-forest" />
          Show on homepage
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-8 py-3 font-mono text-[12px] uppercase tracking-wide text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save project"}
        </button>
        <Link href="/admin" className="font-mono text-[12px] uppercase tracking-wide text-ink-soft hover:text-ink">
          Cancel
        </Link>
      </div>
    </form>
  );
}
