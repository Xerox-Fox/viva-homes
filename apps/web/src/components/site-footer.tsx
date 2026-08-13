import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="surface-navy mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.3em]">Viva Homes</p>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Making finding and owning homes easier in Ethiopia.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/properties">Homes for rent</Link></li>
            <li><Link to="/properties">Homes for sale</Link></li>
            <li><Link to="/list-property">List a property</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Agencies</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/agencies">Partner with us</Link></li>
            <li>Verification</li>
            <li>Listing management</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li>hello@vivahomes.et</li>
            <li>+251 900 000 000</li>
            <li>Addis Ababa, Ethiopia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 px-5 py-5 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Viva Homes. All rights reserved.
      </div>
    </footer>
  );
}