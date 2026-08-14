import { BadgeCheck, Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { formatPrice, type Listing } from "@/data/properties";

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <article className="card-lift overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative">
        <img
          src={listing.image}
          alt={`${listing.title} in ${listing.area}`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-52 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          For {listing.purpose === "rent" ? "rent" : "sale"}
        </span>
        <button
          aria-label="Save to favorites"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-primary transition-colors hover:text-gold"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-card-foreground">{listing.title}</h3>
          {listing.verified && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent-foreground">
              <BadgeCheck className="h-3.5 w-3.5 text-gold" /> Verified
            </span>
          )}
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {listing.area}, {listing.city}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{listing.bedrooms} bd</span>
          <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" />{listing.bathrooms} ba</span>
          <span className="inline-flex items-center gap-1.5"><Ruler className="h-4 w-4" />{listing.size} m²</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-extrabold text-primary">{formatPrice(listing)}</p>
            <p className="text-xs text-muted-foreground">
              {listing.ownerKind}: {listing.owner}
            </p>
          </div>
          <button className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            Contact
          </button>
        </div>
      </div>
    </article>
  );
}
