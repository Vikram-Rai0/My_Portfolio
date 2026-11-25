import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

const NAV_LINK =
  "font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:text-ink";

export default async function ProtectedAdminLayout({ children }) {
  await requireAdmin();
  const unread = await db.message.count({ where: { read: false } });

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <nav className="flex items-center gap-6" aria-label="Admin">
            <Link href="/admin" className={NAV_LINK}>Projects</Link>
            <Link href="/admin/messages" className={NAV_LINK}>
              Messages{unread > 0 && <span className="ml-1.5 rounded-full bg-ink px-1.5 py-0.5 text-[10px] text-paper">{unread}</span>}
            </Link>
            <Link href="/" target="_blank" className={NAV_LINK}>View site ↗</Link>
          </nav>
          <form action={logout}>
            <button type="submit" className={NAV_LINK}>Sign out</button>
          </form>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
