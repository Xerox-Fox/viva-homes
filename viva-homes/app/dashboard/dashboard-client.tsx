"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const demoUser = {
  name: "Abebe Bekele",
  email: "abebe@example.com",
  role: "client" as const,
};

const roleLabels: Record<string, string> = {
  client: "Client",
  home_owner: "Home Owner",
  agent: "Real Estate Agent",
  admin: "Administrator",
};

export default function DashboardPage() {
  const router = useRouter();
  const user = demoUser;
  const role = user.role;

  function handleSignOut() {
    router.push("/login");
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Dashboard</p>

        <h1 className="mt-3 text-3xl font-extrabold text-foreground">Welcome, {user.name}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          You are signed in as {roleLabels[role] ?? "a member"}.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Account</h2>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium text-foreground">{user.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium text-foreground">{user.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="font-medium text-foreground">{roleLabels[role] ?? "—"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Next steps</h2>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {role === "home_owner" || role === "agent" ? (
                <Link href="/list-property" className="font-semibold text-primary">
                  List a property →
                </Link>
              ) : null}

              <Link href="/properties" className="font-semibold text-primary">
                Browse verified homes →
              </Link>

              {role === "agent" ? (
                <Link href="/agencies" className="font-semibold text-primary">
                  Agency services →
                </Link>
              ) : null}

              <button
                onClick={handleSignOut}
                className="mt-2 w-fit rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
