"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cities, listings, propertyTypes } from "@/data/properties";

export default function PropertiesPage() {
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
          if (!`${l.title} ${l.area} ${l.city} ${l.type}`.toLowerCase().includes(q)) return false;
        }
        return true;
      }),
    [purpose, city, type, beds, verifiedOnly, query],
  );

  const selectClass =
    "w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pt-10">
        <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Browse properties</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Every listing shows who you are dealing with — an owner or a verified agency. No hidden brokers.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] lg:sticky lg:top-24">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </p>

            <div className="mt-5 grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1">
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

            <div className="mt-5 space-y-4">
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
                <span className="text-sm text-foreground">Verified listings only</span>
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

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
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
      </main>

      <SiteFooter />
    </div>
  );
}
