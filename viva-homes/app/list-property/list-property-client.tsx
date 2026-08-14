"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cities, propertyTypes } from "@/data/properties";

const steps = [
  "Describe the property and upload photos",
  "Our team verifies ownership and details",
  "Your ad goes live and enquiries reach you directly",
];

export default function ListPropertyPage() {
  const [submitted, setSubmitted] = useState(false);

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-gold";
  const label = "text-xs font-medium text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
              List your property, keep the commission
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Homeowners and agencies post directly on Viva Homes. Renters and buyers contact you through the
              platform, so you stay in control of the conversation and the price.
            </p>

            <ol className="mt-8 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            {submitted ? (
              <div className="py-14 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
                <h2 className="mt-4 text-xl font-bold text-primary">Listing submitted</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our verification team will reach out within 24 hours to confirm the details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full border border-primary/20 px-5 py-2 text-sm font-semibold text-primary"
                >
                  Post another property
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label className="block">
                  <span className={label}>Listing title</span>
                  <input required placeholder="e.g. Sunlit 2-bedroom in Bole" className={field} />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={label}>Purpose</span>
                    <select className={field}>
                      <option>For rent</option>
                      <option>For sale</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className={label}>Property type</span>
                    <select className={field}>
                      {propertyTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={label}>City</span>
                    <select className={field}>
                      {cities.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={label}>Area / sub-city</span>
                    <input required placeholder="Bole, Rwanda St." className={field} />
                  </label>
                  <label className="block">
                    <span className={label}>Price (ETB)</span>
                    <input required type="number" min={0} placeholder="42000" className={field} />
                  </label>
                  <label className="block">
                    <span className={label}>Size (m²)</span>
                    <input type="number" min={0} placeholder="110" className={field} />
                  </label>
                  <label className="block">
                    <span className={label}>Bedrooms</span>
                    <input type="number" min={0} placeholder="2" className={field} />
                  </label>
                  <label className="block">
                    <span className={label}>Bathrooms</span>
                    <input type="number" min={0} placeholder="2" className={field} />
                  </label>
                </div>

                <label className="block">
                  <span className={label}>Description</span>
                  <textarea
                    rows={4}
                    placeholder="Tell renters and buyers what makes this home worth seeing."
                    className={field}
                  />
                </label>

                <label className="block">
                  <span className={label}>Phone number</span>
                  <input required placeholder="+251 9.." className={field} />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Submit for verification
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
