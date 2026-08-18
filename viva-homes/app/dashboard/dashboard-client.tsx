"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Eye,
  Heart, 
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Settings,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { DashHeader } from "@/components/dashboard-header";
import { cities, listings, propertyTypes } from "@/data/properties";
import { DashSidebar } from "@/components/dashboard-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";


const roleLabels: Record<string, string> = {
  client: "Client",
  home_owner: "Home Owner",
  agent: "Real Estate Agent",
  admin: "Administrator",
};

type Section = "overview" | "available" | "listings" | "saved" | "messages" | "account";

const demoMessages = [
  {
    id: 1,
    name: "Selam Bekele",
    initials: "SB",
    snippet: "Hi! Is the villa on CMC still available for a viewing this Saturday?",
    time: "2h",
    unread: true,
  },
  {
    id: 2,
    name: "Zenith Realty",
    initials: "ZR",
    snippet: "Your listing request for Beka Tower has been approved. 🎉",
    time: "1d",
    unread: true,
  },
  {
    id: 3,
    name: "Dawit Alemu",
    initials: "DA",
    snippet: "Thanks for the quick response — we would love to schedule a tour.",
    time: "3d",
    unread: false,
  },
  {
    id: 4,
    name: "Viva Homes Team",
    initials: "VH",
    snippet: "Welcome to Viva Homes! Here is how to get the most out of your account.",
    time: "5d",
    unread: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [section, setSection] = useState<Section>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // All hooks must run before any conditional return
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <>
        <DashHeader />

        <main className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-sm text-muted-foreground">Loading your account...</p>
        </main>

        <SiteFooter />
      </>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const role = user.role ?? "client";
  const isHost = role === "home_owner" || role === "agent";
  const firstName = user.name.split(" ")[0];
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const myListings = isHost
    ? listings.filter((l) => (role === "agent" ? l.ownerKind === "Agency" : l.ownerKind === "Owner"))
    : [];

  const totalViews = myListings.reduce((sum, _, i) => sum + 120 + i * 87, 0);
  const totalEnquiries = myListings.reduce((sum, _, i) => sum + 6 + i * 4, 0);
  const savedCount = 3;

  const navItems: { id: Section; label: string; icon: typeof Home }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "available", label: "Available homes", icon: Search },
    ...(isHost ? [{ id: "listings" as const, label: "Your listings", icon: Home }] : []),
    { id: "saved", label: "Saved homes", icon: Heart },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "account", label: "Account", icon: Settings },
  ];

  const stats = [
    { icon: Home, value: isHost ? myListings.length : "0", label: "Active listings", delta: isHost ? "+1 this month" : null },
    { icon: Eye, value: totalViews.toLocaleString(), label: "Total views", delta: "+18% vs last week" },
    { icon: MessageSquare, value: totalEnquiries, label: "Enquiries", delta: isHost ? "+6% vs last week" : null },
    { icon: Heart, value: savedCount, label: "Saved homes", delta: "2 new this week" },
  ];

  const activity = [
    { text: "New enquiry on Sunlit 2-bedroom apartment", time: "2 hours ago", tone: "bg-primary" },
    { text: "Your listing Beka Tower was verified", time: "Yesterday", tone: "bg-gold" },
    { text: "You saved Family villa with garden", time: "3 days ago", tone: "bg-muted-foreground" },
  ];

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return (
    <>
      <DashHeader />

      <main className="w-full py-10">
        {/* Sidebar - fixed left */}
        <DashSidebar
          section={section}
          setSection={setSection}
          navItems={navItems}
          onSignOut={handleSignOut}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main content - transitions based on sidebar state */}
        <div
          className="w-full px-5 py-5 transition-all duration-300 ease-in-out lg:pr-5"
          style={{ paddingLeft: sidebarCollapsed ? "96px" : "260px" }}
        >
          <section className="mx-auto max-w-5xl min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="surface-navy flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ring-2 ring-gold/50">
                  {initials}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Dashboard</p>
                  <h1 className="mt-1 text-2xl font-extrabold text-primary sm:text-3xl">
                    Welcome back, {firstName}
                  </h1>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                      <User className="h-3 w-3" />
                      {roleLabels[role] ?? "Member"}
                    </span>
                    {user.email}
                  </p>
                </div>
              </div>

              {isHost ? (
                <Link
                  href="/list-property"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Building2 className="h-4 w-4" /> List a property
                </Link>
              ) : null}
            </div>

            <div className="mt-8">
              {section === "overview" ? (
                <OverviewSection
                  stats={stats}
                  activity={activity}
                  isHost={isHost}
                  role={role}
                  savedCount={savedCount}
                />
              ) : null}

              {section === "available" ? (
                <AvailableHomesSection />
              ) : null}

              {section === "listings" ? (
                <ListingsSection myListings={myListings} />
              ) : null}

              {section === "saved" ? (
                <SavedSection />
              ) : null}

              {section === "messages" ? (
                <MessagesSection />
              ) : null}

              {section === "account" ? (
                <AccountSection
                  user={{ name: user.name, email: user.email }}
                  roleLabel={roleLabels[role] ?? "Member"}
                  onSignOut={handleSignOut}
                />
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function OverviewSection({
  stats,
  activity,
  isHost,
  role,
  savedCount,
}: {
  stats: { icon: typeof Home; value: string | number; label: string; delta: string | null }[];
  activity: { text: string; time: string; tone: string }[];
  isHost: boolean;
  role: string;
  savedCount: number;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, delta }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-gold">
                <Icon className="h-4 w-4" />
              </span>
              {delta ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-semibold text-gold">
                  <TrendingUp className="h-3 w-3" />
                  {delta}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-2xl font-extrabold text-primary">{value}</p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-sm font-bold text-primary">Quick actions</h2>
          <div className="mt-4 flex flex-col gap-2">
            {isHost ? (
              <QuickAction
                href="/list-property"
                icon={Building2}
                title="List a property"
                body="Publish a new home for rent or sale"
              />
            ) : null}
            <QuickAction href="/properties" icon={Search} title="Browse verified homes" body="Find your next home — no middlemen" />
            {role === "agent" ? (
              <QuickAction href="/agencies" icon={ShieldCheck} title="Agency services" body="Manage listings and verification" />
            ) : null}
            <QuickAction href="/properties" icon={Heart} title="Saved homes" body={`${savedCount} homes waiting for you`} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-sm font-bold text-primary">Recent activity</h2>
          <ul className="mt-4 space-y-4">
            {activity.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", item.tone)} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  body,
}: {
  href: string;
  icon: typeof Home;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-accent/60 hover:bg-secondary/40"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{body}</span>
      </span>
      <span className="ml-auto text-primary transition-transform group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </Link>
  );
}

function AvailableHomesSection() {
  const [purpose, setPurpose] = useState<"all" | "rent" | "buy">("all");
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [beds, setBeds] = useState("any");
  const [query, setQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const results = useMemo(
    () =>
      listings.filter((l) => {
        if (purpose !== "all" && l.purpose !== purpose) return false;
        if (city !== "all" && l.city !== city) return false;
        if (type !== "all" && l.type !== type) return false;
        if (beds !== "any" && l.bedrooms < Number(beds)) return false;
        if (verifiedOnly && !l.verified) return false;

        if (query) {
          const q = query.toLowerCase();
          if (!`${l.title} ${l.area} ${l.city} ${l.type}`.toLowerCase().includes(q)) {
            return false;
          }
        }

        return true;
      }),
    [purpose, city, type, beds, verifiedOnly, query],
  );

  const selectClass =
    "w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold";

  return (
    <>
      <div>
        <h2 className="text-lg font-extrabold text-primary">Available homes</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Browse all verified properties on the platform — no hidden brokers.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] lg:sticky lg:top-24">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </p>

          <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1">
            {(["all", "rent", "buy"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`rounded-lg py-2 text-xs font-semibold capitalize transition-colors ${
                  purpose === p
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">City</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className={`mt-1.5 ${selectClass}`}>
                <option value="all">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Property type</span>
              <select value={type} onChange={(e) => setType(e.target.value)} className={`mt-1.5 ${selectClass}`}>
                <option value="all">Any type</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Bedrooms</span>
              <select value={beds} onChange={(e) => setBeds(e.target.value)} className={`mt-1.5 ${selectClass}`}>
                <option value="any">Any</option>
                {["1", "2", "3", "4"].map((b) => (
                  <option key={b} value={b}>{b}+</option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              <span className="text-sm text-foreground">Verified only</span>
            </label>
          </div>
        </aside>

        <section>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by area, city or keyword"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {results.length} propert{results.length === 1 ? "y" : "ies"} found
          </p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((l) => (
              <PropertyCard key={l.id} listing={l} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="font-semibold text-primary">No properties match these filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening your search area or price range.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function ListingsSection({ myListings }: { myListings: typeof listings }) {
  if (myListings.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-soft)]">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Home className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-lg font-extrabold text-primary">No active listings yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Publish your first property and start receiving enquiries from verified renters and buyers.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/list-property"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            List a property
          </Link>
          <Link
            href="/properties"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-muted"
          >
            Browse homes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-primary">Your listings</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {myListings.length} active listing{myListings.length === 1 ? "" : "s"} — keep an eye on views and enquiries.
          </p>
        </div>
        <Link
          href="/list-property"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          + New listing
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {myListings.map((listing, i) => {
          const views = 120 + i * 87;
          const enquiries = 6 + i * 4;
          const status = i === 1 ? "Pending verification" : i === 2 ? "Draft" : "Active";
          const statusClass =
            status === "Active"
              ? "bg-gold/15 text-gold"
              : status === "Pending verification"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground";

          return (
            <div
              key={listing.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
            >
              <img
                src={listing.image}
                alt={listing.title}
                loading="lazy"
                width={96}
                height={72}
                className="h-16 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{listing.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {listing.area}, {listing.city}
                </p>
                <div className="mt-1.5 hidden items-center gap-4 text-xs font-semibold text-muted-foreground sm:flex">
                  <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {views} views</span>
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {enquiries} enquiries</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-primary">{listing.price.toLocaleString()} ETB</p>
                <p className="text-[11px] text-muted-foreground">
                  {listing.purpose === "rent" ? "per month" : "one-time"}
                </p>
                <span className={cn("mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold", statusClass)}>
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function SavedSection() {
  const saved = listings.filter((l) => l.verified).slice(0, 3);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-primary">Saved homes</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {saved.length} verified home{saved.length === 1 ? "" : "s"} saved — tap the heart to remove one.
          </p>
        </div>
        <Link href="/properties" className="text-sm font-semibold text-gold hover:underline">
          Browse all properties →
        </Link>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {saved.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
}

function MessagesSection() {
  return (
    <>
      <div>
        <h2 className="text-lg font-extrabold text-primary">Messages</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Conversations with owners, agencies and renters.</p>
      </div>

      <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        {demoMessages.map((message) => (
          <button
            key={message.id}
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40"
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-extrabold",
                message.unread ? "surface-navy ring-2 ring-gold/40" : "bg-secondary text-primary",
              )}
            >
              {message.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className={cn("truncate text-sm", message.unread ? "font-bold text-foreground" : "font-medium text-foreground")}>
                  {message.name}
                </span>
                {message.unread ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> : null}
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">{message.time}</span>
              </span>
              <span className={cn("mt-0.5 block truncate text-sm", message.unread ? "text-foreground" : "text-muted-foreground")}>
                {message.snippet}
              </span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function AccountSection({
  user,
  roleLabel,
  onSignOut,
}: {
  user: { name: string; email: string };
  roleLabel: string;
  onSignOut: () => void;
}) {
  const rows = [
    { icon: User, label: "Name", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    { icon: ShieldCheck, label: "Role", value: roleLabel },
  ];

  return (
    <>
      <div>
        <h2 className="text-lg font-extrabold text-primary">Account settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Your profile details and how you sign in to Viva Homes.</p>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <dl className="divide-y divide-border">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <dt className="w-24 shrink-0 text-sm text-muted-foreground">{label}</dt>
              <dd className="min-w-0 flex-1 text-sm font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 border-t border-border pt-6">
          <button
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
