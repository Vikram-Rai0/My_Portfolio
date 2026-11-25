import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow mb-3">— Admin</p>
        <h1 className="mb-8 text-3xl font-extrabold text-ink">Sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
