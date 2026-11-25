"use client";

import { useState } from "react";

const FIELD =
  "w-full rounded-xl border border-line bg-paper-sage/50 px-4 py-3 text-[14px] text-ink placeholder:text-ink-muted transition-colors focus:border-forest focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        setStatus("success");
        setMessage("Thanks, your message has been sent. I’ll reply by email.");
        return;
      }

      setStatus("error");
      setErrors(result.fieldErrors ?? {});
      setMessage(result.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-[12px] text-ink-soft">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative w-full text-left"
      aria-label="Send me a message"
    >
      <p className="eyebrow mb-6">— Send a message</p>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="eyebrow mb-2 block">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={FIELD}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="contact-email" className="eyebrow mb-2 block">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={FIELD}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="contact-message" className="eyebrow mb-2 block">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={4000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${FIELD} resize-y`}
          />
          {fieldError("message")}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-ink px-8 py-3.5 font-mono text-[12px] uppercase tracking-wide text-paper transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`min-h-5 text-[13px] ${
            status === "success" ? "text-forest" : "text-ink-soft"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}