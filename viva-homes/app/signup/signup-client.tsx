"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AuthShell, GoogleButton } from "@/components/auth-shell";
import { authClient } from "@/lib/auth-client";

type AppRole = "client" | "agent" | "home_owner";

const roles: { value: AppRole; label: string; description: string }[] = [
  { value: "client", label: "Client", description: "I want to rent or buy a home" },
  { value: "agent", label: "Agent", description: "I work with an agency or as a broker" },
  { value: "home_owner", label: "Home owner", description: "I want to list my property" },
];

const inputClass =
  "w-full rounded-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/40";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AppRole>("client");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    await authClient.signUp.email({
      name,
      email,
      password,
      role,
      callbackURL: "/dashboard",
    } as Parameters<typeof authClient.signUp.email>[0],
    {
      onRequest: () => {
        setLoading(true)
      },
      onSuccess: () => {
        setLoading(false)
        router.push("/dashboard")
        router.refresh()
      },
      onError: (ctx) => {
        setLoading(false)
        setError(ctx.error.message || "Failed to create account.")
      }
    }
  )
    
  }

  async function handleSocialSignup(provider: "google") {
    setError(null);
    setLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        console.error("Google signup error:", result.error);

        setError(result.error.message || "Google signup failed.");
        toast.error(result.error.message || "Google signup failed.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Google signup error:", error);

      setError("Unable to connect to the authentication server.");
      toast.error("Unable to connect to the authentication server.");
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthShell
        title="Check your email"
        subtitle={`We sent a confirmation link to ${email}. Confirm it to activate your account.`}
        footer={
          <Link href="/login" className="font-semibold text-primary">
            Back to sign in
          </Link>
        }
      >
        <p className="text-sm text-muted-foreground">
          Didn&apos;t get it? Check your spam folder, or sign up again with a different address.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Viva Homes and deal directly — no coercive middlemen."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset className="space-y-3">
          <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">I am a</legend>
          <div className="grid gap-2">
            {roles.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-colors ${
                  role === option.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/60"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={() => setRole(option.value)}
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                />
                <span>
                  <span className="block text-sm font-semibold text-foreground">{option.label}</span>
                  <span className="block text-xs text-muted-foreground">{option.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Full name">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Abebe Bekele"
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
        <Field label="Phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+251 9.."
            className={inputClass}
          />
        </Field>
        <Field label="Password">
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className={inputClass}
          />
        </Field>

        <Field label="Confirm Password">
          <input
            required
            type="password"
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat the same password"
            className={inputClass}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleButton onClick={() => handleSocialSignup} disabled={loading} />
    </AuthShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
