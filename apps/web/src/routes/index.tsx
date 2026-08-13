import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  Handshake,
  Heart,
  LayoutGrid,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cities, listings, propertyTypes } from "@/data/properties";
import heroImg from "@/assets/hero-addis.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viva Homes | Rent & Buy Homes in Ethiopia" },
      {
        name: "description",
        content:
          "Viva Homes is Ethiopia's digital housing platform. Browse verified rentals and homes for sale, and deal directly with owners and trusted agencies.",
      },
      { property: "og:title", content: "Viva Homes | Rent & Buy Homes in Ethiopia" },
      {
        property: "og:description",
        content:
          "Find, rent, and buy homes in Ethiopia without coercive middlemen. Verified listings and direct contact with owners and agencies.",
      },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Search, title: "Property search", body: "Filter by city, price, size and type until the results match exactly what you need." },
  { icon: Handshake, title: "Rent or buy", body: "One platform for monthly rentals and outright purchase requests." },
  { icon: LayoutGrid, title: "Property management", body: "Owners and agencies manage every listing, enquiry and booking in one place." },
  { icon: BadgeCheck, title: "Verification", body: "Ownership and details are checked before a listing carries the verified badge." },
  { icon: Heart, title: "Favorites & reviews", body: "Save homes you like and leave honest reviews based on real experience." },
  { icon: ShieldCheck, title: "Strong authentication", body: "Accounts are protected so your identity and contacts stay private." },
  { icon: CreditCard, title: "Secure payments", body: "Deposits and fees move through the platform, not through a stranger's pocket." },
  { icon: Bell, title: "Notifications", body: "Get alerted the moment someone responds to your post or booking." },
];

function Index() {
  const [purpose, setPurpose] = useState<"rent" | "buy">("rent");
  const featured = listings.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Modern apartment building in Addis Ababa at golden hour"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,oklch(0.16_0.035_259/0.94),oklch(0.16_0.035_259/0.55))]" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Ethiopia's housing platform
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] text-primary-foreground sm:text-6xl">
            Find a home without going <span className="text-gradient-gold">through a broker</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75">
            Browse verified rentals and homes for sale across Ethiopia, then deal directly with the owner or a
            credible agency — no coercive middlemen, no invented rates.
          </p>

          {/* Search panel */}
          <div className="mt-10 max-w-3xl rounded-3xl border border-primary-foreground/10 bg-card/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur">
            <div className="inline-flex rounded-full bg-secondary p-1">
              {(["rent", "buy"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`rounded-full px-5 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    purpose === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {p === "rent" ? "Rent" : "Buy"}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_1fr_1fr_auto]">
              <select className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold">
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold">
                <option>Any type</option>
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <select className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold">
                <option>Any bedrooms</option>
                {["1+", "2+", "3+", "4+"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Search className="h-4 w-4" /> Search
              </Link>
            </div>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
            {[
              ["1,200+", "Listings published"],
              ["85", "Verified agencies"],
              ["0", "Hidden broker fees"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-extrabold text-primary-foreground">{value}</dt>
                <dd className="text-xs uppercase tracking-widest text-primary-foreground/60">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Problem / solution */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">The problem</p>
            <h2 className="mt-4 text-2xl font-extrabold text-primary">A market run by middlemen</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>Renters and buyers depend on networks of dishonest, sometimes coercive brokers.</li>
              <li>Added expenses and unregulated rates on nearly every transaction.</li>
              <li>Information asymmetry keeps honest prices out of sight.</li>
              <li>Owners and agencies carry the burden of digitising alone.</li>
            </ul>
          </div>
          <div className="surface-navy rounded-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Our solution</p>
            <h2 className="mt-4 text-2xl font-extrabold">One centralised, honest marketplace</h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
              <li>Browse properties that match your criteria and request more information instantly.</li>
              <li>Deal directly with the owner or a verified agency.</li>
              <li>Central management of every listing at a far lower cost.</li>
              <li>Regulation and accountability on both sides of the deal.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">Featured homes</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fresh listings from owners and verified agencies.</p>
          </div>
          <Link to="/properties" className="text-sm font-semibold text-gold hover:underline">
            View all properties →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <PropertyCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">What to expect</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <Icon className="h-5 w-5 text-gold" />
              <h3 className="mt-4 text-sm font-bold text-card-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agencies CTA */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="surface-navy overflow-hidden rounded-3xl px-8 py-14 text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold sm:text-3xl">
            Are you a homeowner or a real-estate agency?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/70">
            Publish your properties, get verified, and reach renters and buyers directly on Viva Homes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/list-property"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              List a property
            </Link>
            <Link
              to="/agencies"
              className="rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              For agencies
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
