export type Listing = {
  id: string;
  title: string;
  city: string;
  area: string;
  type: "Apartment" | "Villa" | "Condominium" | "Studio" | "House";
  purpose: "rent" | "buy";
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  image: string;
  verified: boolean;
  owner: string;
  ownerKind: "Agency" | "Owner";
};

export const listings: Listing[] = [
  {
    id: "bole-2br",
    title: "Sunlit 2-bedroom apartment",
    city: "Addis Ababa",
    area: "Bole, Rwanda St.",
    type: "Apartment",
    purpose: "rent",
    price: 42000,
    bedrooms: 2,
    bathrooms: 2,
    size: 110,
    image: "/prop-1.jpg",
    verified: true,
    owner: "Zenith Realty",
    ownerKind: "Agency",
  },
  {
    id: "cmc-villa",
    title: "Family villa with garden",
    city: "Addis Ababa",
    area: "CMC, Ayat Road",
    type: "Villa",
    purpose: "buy",
    price: 28500000,
    bedrooms: 5,
    bathrooms: 4,
    size: 340,
    image: "/prop-2.jpg",
    verified: true,
    owner: "Selam Bekele",
    ownerKind: "Owner",
  },
  {
    id: "kazanchis-condo",
    title: "High-floor condo with city view",
    city: "Addis Ababa",
    area: "Kazanchis",
    type: "Condominium",
    purpose: "rent",
    price: 33000,
    bedrooms: 3,
    bathrooms: 2,
    size: 128,
    image: "/prop-3.jpg",
    verified: false,
    owner: "Habesha Properties",
    ownerKind: "Agency",
  },
  {
    id: "gerji-studio",
    title: "Furnished studio near Gerji",
    city: "Addis Ababa",
    area: "Gerji Mebrat Hail",
    type: "Studio",
    purpose: "rent",
    price: 15500,
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    image: "/prop-4.jpg",
    verified: true,
    owner: "Dawit Alemu",
    ownerKind: "Owner",
  },
  {
    id: "hawassa-house",
    title: "Terraced house with lawn",
    city: "Hawassa",
    area: "Piassa",
    type: "House",
    purpose: "buy",
    price: 13750000,
    bedrooms: 4,
    bathrooms: 3,
    size: 260,
    image: "/prop-5.jpg",
    verified: true,
    owner: "Rift Valley Homes",
    ownerKind: "Agency",
  },
  {
    id: "beka-tower",
    title: "New-build apartment in Beka Tower",
    city: "Addis Ababa",
    area: "Old Airport",
    type: "Apartment",
    purpose: "buy",
    price: 19200000,
    bedrooms: 3,
    bathrooms: 2,
    size: 145,
    image: "/hero-addis.jpg",
    verified: true,
    owner: "Zenith Realty",
    ownerKind: "Agency",
  },
];

export const cities = ["Addis Ababa", "Hawassa", "Adama", "Bahir Dar", "Mekelle"];
export const propertyTypes = ["Apartment", "Villa", "Condominium", "Studio", "House"];

export function formatPrice(listing: Listing) {
  const value = new Intl.NumberFormat("en-US").format(listing.price);
  return listing.purpose === "rent" ? `ETB ${value}/mo` : `ETB ${value}`;
}
