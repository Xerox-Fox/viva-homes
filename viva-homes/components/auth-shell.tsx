import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-14">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <img
            src="/viva-logo.jpg"
            alt="Viva Homes logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-cover"
          />
          <span className="text-sm font-extrabold uppercase tracking-[0.28em] text-primary">Viva</span>
        </Link>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
          <h1 className="text-2xl font-extrabold text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </main>
  );
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.2h6.5c-.1 1.1-.8 2.7-2.3 3.8l3.6 2.8c2.1-2 3.7-4.9 3.7-8.6z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.6-2.8c-1 .7-2.3 1.2-4.2 1.2-3.1 0-5.8-2.1-6.8-5l-3.7 2.9C3.4 21.3 7.4 24 12 24z"
        />
        <path fill="#FBBC05" d="M5.2 14.5A7.4 7.4 0 0 1 4.8 12c0-.9.2-1.7.4-2.5L1.5 6.6A12 12 0 0 0 0 12c0 1.9.5 3.8 1.5 5.4l3.7-2.9z" />
        <path
          fill="#EA4335"
          d="M12 4.8c2.2 0 3.7.9 4.5 1.7l3.2-3.1C17.9 1.5 15.2 0 12 0 7.4 0 3.4 2.7 1.5 6.6l3.7 2.9C6.2 6.6 8.9 4.8 12 4.8z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
