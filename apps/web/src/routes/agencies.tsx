import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Building2, LayoutGrid, MessagesSquare, Network, Wallet } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import agencyImg from "@/assets/agency.jpg";

export const Route = createFileRoute("/agencies")({
  head: () => ({
    meta: [
      { title: "For Real-Estate Agencies | Viva Homes" },
      {
        name: "description",
        content:
          "Advertise listings, manage your portfolio, get verified and talk to clients directly. Viva Homes gives Ethiopian agencies a digital home.",
      },
      { property: "og:title", content: "For Real-Estate Agencies | Viva Homes" },
      {
        property: "og:description",
        content: "Listing ads, networking, property management, verification and communication tools for agencies.",
      },
    ],
  }),
  component: AgenciesPage,
});

const services = [
  { icon: Building2, title: "Listing property ads", body: "Publish and refresh unlimited property ads from one dashboard." },
  { icon: Network, title: "Networking", body: "Reach renters, buyers and fellow agencies inside one ecosystem." },
  { icon: LayoutGrid, title: "Property management", body: "Track availability, enquiries and bookings across your portfolio." },
  { icon: BadgeCheck, title: "Credibility & verification", body: "Earn a verified badge that signals trust to every visitor." },
  { icon: MessagesSquare, title: "Communication tools", body: "Answer enquiries, share documents and schedule viewings in-app." },
  { icon: Wallet, title: "Lower cost of sale", body: "Cut advertising spend and the layers of agents between you and clients." },
];

function AgenciesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">For agencies</p>
            <h1 className="mt-4 text-3xl font-extrabold text-primary sm:text-4xl">
              Credible agencies belong at the centre of the housing market
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We believe real-estate agencies are critical to an efficient housing economy. Viva Homes integrates
              them into a reliable platform that brings regulation and trust to both sides of every transaction.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/list-property"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Apply for partnership
              </Link>
              <Link
                to="/properties"
                className="rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary"
              >
                See live listings
              </Link>
            </div>
          </div>
          <img
            src={agencyImg}
            alt="Real-estate agency team working in a modern office"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
        </section>

        <section className="mx-auto max-w-6xl px-5 pt-20">
          <h2 className="text-2xl font-extrabold text-primary">What agencies get</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-lift rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <Icon className="h-5 w-5 text-gold" />
                </span>
                <h3 className="mt-4 font-bold text-card-foreground">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}