"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

const FIELD =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink focus:border-forest focus:outline-none";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="eyebrow mb-2 block">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={FIELD} />
      </div>
      <div>
        <label htmlFor="password" className="eyebrow mb-2 block">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={FIELD} />
      </div>

      <p role="alert" className="min-h-5 text-[13px] text-ink-soft">{state?.error}</p>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-6 py-3.5 font-mono text-[12px] uppercase tracking-wide text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
