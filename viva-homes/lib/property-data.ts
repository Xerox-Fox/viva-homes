import { PropertyPost } from "@/components/feed/property-card"

export interface ClaimItem {
  id: string
  category: "water" | "internet" | "parking" | "distance" | "bedrooms" | "electricity"
  title: string
  claimedText: string
  madeBy: string
  madeAt: string
  source: string
  status: "verified" | "mixed" | "disputed"
  verificationNote?: string
  evidenceCount: number
  experiencesCount: number
  evidenceThumbnails?: string[]
}

export interface VerificationItem {
  id: string
  title: string
  status: "verified" | "pending"
  date?: string
  method?: string
  explanation: string
}

export interface UserExperience {
  id: string
  user: {
    name: string
    avatar: string
    role: string
    duration: string
  }
  category: string
  advertised: string
  experienced: "better" | "as_advertised" | "worse"
  comment: string
  evidence?: string[]
  date: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: "verification" | "listing" | "report" | "transaction"
}

export interface AgentDetails {
  id: string
  name: string
  avatar: string
  isVerified: boolean
  role: "Verified Agent"
  trustScore: number
  verifiedTransactions: number
  metrics: {
    listingAccuracy: number
    priceTransparency: number
    communication: number
    reliability: number
  }
  bio: string
}

export interface PropertyDetailsData extends PropertyPost {
  matchScore: {
    overall: number
    pros: string[]
    warnings: string[]
  }
  claims: ClaimItem[]
  verifications: VerificationItem[]
  trustDimensions: {
    overall: number
    listingAccuracy: number
    propertyCondition: number
    utilities: number
    amenities: number
    locationAccuracy: number
  }
  experiences: UserExperience[]
  timeline: TimelineEvent[]
  agentDetails: AgentDetails
  neighborhood: {
    area: string
    city: string
    nearbyServices: {
      name: string
      distance: string
      iconType: "road" | "shop" | "hospital"
    }[]
  }
  similarProperties: PropertyPost[]
}

export const MOCK_PROPERTY_DETAILS: PropertyDetailsData = {
  id: "bole-atlas-luxury-apt-842",
  poster: {
    name: "Dawit Bekele",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    isVerified: true,
    rating: 4.9,
    reviewsCount: 48,
    role: "Verified Agent",
  },
  timestamp: "2d ago",
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
  ],
  verifiedBadge: "Location & Photos Verified",
  price: "35,000 ETB",
  priceLabel: "/ month",
  title: "Modern 2 Bedroom Apartment — Bole, Near Atlas",
  location: "Bole, Addis Ababa",
  specs: {
    beds: 2,
    baths: 2,
    area: 120,
    features: ["Dedicated Parking", "2000L Water Tank"],
  },
  trustScore: 92,
  claimsVerifiedCount: 8,
  description:
    "Quiet 3rd-floor apartment with reliable backup water system, fiber internet connection, and 24/7 security guard. Walking distance to Atlas hotels and top restaurants.",
  likesCount: 142,

  matchScore: {
    overall: 92,
    pros: [
      "Within your budget (Max 40,000 ETB)",
      "Preferred location (Bole)",
      "2 bedrooms & 2 bathrooms",
      "Dedicated parking included",
      "Reliable water supply with backup tank",
    ],
    warnings: [
      "Limited evidence about evening traffic noise from nearby main road",
    ],
  },

  claims: [
    {
      id: "claim-1",
      category: "water",
      title: "Water Supply",
      claimedText: "24/7 reliable water with dedicated 2000L backup tank",
      madeBy: "Dawit Bekele (Agent)",
      madeAt: "Aug 10, 2026",
      source: "Property Listing Agreement",
      status: "mixed",
      verificationNote: "Tank exists and functions, but municipal mains drop pressure on Wednesday evenings.",
      evidenceCount: 2,
      experiencesCount: 4,
      evidenceThumbnails: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80",
      ],
    },
    {
      id: "claim-2",
      category: "internet",
      title: "Internet Connection",
      claimedText: "Ethio Telecom Fiber optic line installed and ready for connection",
      madeBy: "Dawit Bekele (Agent)",
      madeAt: "Aug 10, 2026",
      source: "Physical On-site Check",
      status: "verified",
      verificationNote: "Fiber terminal box physically verified inside unit.",
      evidenceCount: 1,
      experiencesCount: 2,
    },
    {
      id: "claim-3",
      category: "parking",
      title: "Parking",
      claimedText: "1 designated underground secure parking spot with automated gate",
      madeBy: "Dawit Bekele (Agent)",
      madeAt: "Aug 10, 2026",
      source: "Building Permit & On-site Audit",
      status: "verified",
      verificationNote: "Space #B-14 assigned specifically to this apartment.",
      evidenceCount: 1,
      experiencesCount: 3,
    },
    {
      id: "claim-4",
      category: "distance",
      title: "Distance to Main Road",
      claimedText: "5 minutes walking distance to Atlas main asphalt road",
      madeBy: "Dawit Bekele (Agent)",
      madeAt: "Aug 10, 2026",
      source: "GPS Verification",
      status: "verified",
      verificationNote: "Exact pedestrian distance is 380 meters (approx 4.5 mins walk).",
      evidenceCount: 1,
      experiencesCount: 5,
    },
  ],

  verifications: [
    {
      id: "v-1",
      title: "Exact Location & GPS",
      status: "verified",
      date: "August 10, 2026",
      method: "Field Agent In-person Visit",
      explanation: "Viva field auditor visited the property and captured exact GPS coordinates on site.",
    },
    {
      id: "v-2",
      title: "Property Existence & Occupancy",
      status: "verified",
      date: "August 10, 2026",
      method: "Title Deed & ID Cross-reference",
      explanation: "Ownership authorization document was cross-checked with the registered agent credentials.",
    },
    {
      id: "v-3",
      title: "Bedrooms & Bathrooms Count",
      status: "verified",
      date: "August 10, 2026",
      method: "360 Audit & Floorplan Scan",
      explanation: "2 distinct enclosed bedrooms and 2 full bathrooms verified in person.",
    },
    {
      id: "v-4",
      title: "Actual Interior Photos",
      status: "verified",
      date: "August 10, 2026",
      method: "EXIF & Watermark Verification",
      explanation: "Photos were verified to be untampered and recent (captured within 14 days of listing).",
    },
  ],

  trustDimensions: {
    overall: 92,
    listingAccuracy: 96,
    propertyCondition: 91,
    utilities: 78,
    amenities: 94,
    locationAccuracy: 99,
  },

  experiences: [
    {
      id: "exp-1",
      user: {
        name: "Sara M.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        role: "Verified Previous Tenant",
        duration: "7 months",
      },
      category: "Water Supply",
      advertised: "24/7 Continuous Water",
      experienced: "worse",
      comment: "Water was generally available during the day via the pump, but municipal pressure drops caused 2-hour outages on Wednesday evenings when the pump needed resetting.",
      evidence: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80",
      ],
      date: "July 2026",
    },
    {
      id: "exp-2",
      user: {
        name: "Henok K.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
        role: "Verified Visitor / Inspector",
        duration: "Viewing visit",
      },
      category: "Parking & Access",
      advertised: "Secure Dedicated Parking",
      experienced: "as_advertised",
      comment: "The parking ramp is wide enough for SUVs and the automated gate works seamlessly. Security guard was present at the entrance.",
      date: "August 2026",
    },
  ],

  timeline: [
    {
      id: "t-1",
      date: "August 10, 2026",
      title: "Viva In-Person Verification Completed",
      description: "Field auditor verified property existence, GPS coordinates, floorplan, and water system functionality.",
      type: "verification",
    },
    {
      id: "t-2",
      date: "August 8, 2026",
      title: "Listed by Dawit Bekele",
      description: "Listing created under verified agent portfolio with complete documentation.",
      type: "listing",
    },
    {
      id: "t-3",
      date: "July 15, 2026",
      title: "Tenant Exit Feedback Recorded",
      description: "Previous tenant Sara M. completed structured exit review detailing utility performance.",
      type: "report",
    },
  ],

  agentDetails: {
    id: "agent-dawit",
    name: "Dawit Bekele",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    isVerified: true,
    role: "Verified Agent",
    trustScore: 94,
    verifiedTransactions: 84,
    metrics: {
      listingAccuracy: 96,
      priceTransparency: 93,
      communication: 91,
      reliability: 95,
    },
    bio: "Licensed real estate broker specializing in premium residential properties across Bole, Kazanchis, and Old Airport with 6+ years of verified service.",
  },

  neighborhood: {
    area: "Bole",
    city: "Addis Ababa",
    nearbyServices: [
      { name: "Atlas Main Road", distance: "4 mins walk (380m)", iconType: "road" },
      { name: "Bole Medhanialem Supermarket", distance: "7 mins walk (600m)", iconType: "shop" },
      { name: "Hayat Hospital", distance: "5 mins drive (1.8km)", iconType: "hospital" },
    ],
  },

  similarProperties: [
    {
      id: "kazanchis-luxury-flat-104",
      poster: {
        name: "Tigist Alemu",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
        isVerified: true,
        rating: 5.0,
        reviewsCount: 19,
        role: "Posted by Homeowner",
      },
      timestamp: "4d ago",
      images: [
        "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
      ],
      verifiedBadge: "GPS & Photos Verified",
      price: "40,000 ETB",
      priceLabel: "/ month",
      title: "Luxury Modern Flat — Kazanchis",
      location: "Addis Ababa",
      specs: {
        beds: 2,
        baths: 2,
        area: 135,
        features: ["Private Balcony", "Backup Generator"],
      },
      trustScore: 96,
      claimsVerifiedCount: 11,
      description: "High-end apartment in Kazanchis with generator backup and 24/7 security.",
      likesCount: 289,
    },
    {
      id: "sarbet-spacious-flat-502",
      poster: {
        name: "Samuel Tadesse",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
        isVerified: true,
        rating: 4.7,
        reviewsCount: 63,
        role: "Verified Agent",
      },
      timestamp: "1w ago",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      ],
      verifiedBadge: "Location & Photos Verified",
      price: "30,000 ETB",
      priceLabel: "/ month",
      title: "Spacious 2 Bedroom Flat — Sarbet",
      location: "Addis Ababa",
      specs: {
        beds: 2,
        baths: 1,
        area: 110,
        features: ["Rooftop Access", "Fiber Internet"],
      },
      trustScore: 88,
      claimsVerifiedCount: 5,
      description: "Bright apartment on the 4th floor with great city views and fiber connection.",
      likesCount: 97,
    },
  ],
}
