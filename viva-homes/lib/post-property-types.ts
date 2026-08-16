export type ListingRelationship = "homeowner" | "behalf_homeowner" | "verified_agent"

export type ListingOffering = "rent" | "sale"

export type PropertyCategory =
  | "apartment"
  | "house"
  | "villa"
  | "condominium"
  | "studio"
  | "commercial"
  | "land"
  | "other"

export type PropertyCondition = "new" | "excellent" | "good" | "needs_renovation"

export type FurnishedStatus = "unfurnished" | "semi_furnished" | "fully_furnished"

export interface AdditionalCost {
  id: string
  name: string
  amount: string
  frequency?: string
  description?: string
  enabled: boolean
}

export interface PropertyClaim {
  id: string
  category: "water" | "internet" | "parking" | "distance" | "electricity" | "other"
  title: string
  claimedText: string
  evidenceFiles?: string[]
  isAiDetected?: boolean
}

export interface VerificationEvidence {
  claimId: string
  documentType: "photo" | "deed" | "utility_bill" | "speedtest"
  fileName: string
  fileUrl: string
  status: "attached" | "pending_review"
}

export interface PostPropertyFormData {
  // Step 1: Relationship
  relationship: ListingRelationship
  agentBackingRequested: boolean

  // Step 2: Offering & Type
  offering: ListingOffering
  category: PropertyCategory

  // Step 3: Basics
  title: string
  bedrooms: number
  bathrooms: number
  areaSqM: number
  condition: PropertyCondition
  floorNumber?: number
  totalFloors?: number
  yearBuilt?: number
  furnished: FurnishedStatus

  // Step 4: Price & Costs
  price: string
  paymentFrequency: string
  deposit: string
  agencyFee: string
  additionalCosts: AdditionalCost[]

  // Step 5: Location
  addressSearch: string
  city: string
  subCity: string
  woreda: string
  neighborhood: string
  landmark: string
  isExactLocationPublic: boolean

  // Step 6: Description
  description: string

  // Step 7: Media
  images: {
    id: string
    url: string
    category: "exterior" | "living" | "bedroom" | "kitchen" | "bathroom" | "parking" | "other"
    isCover: boolean
    caption?: string
  }[]

  // Step 8: Features & Amenities
  interiorFeatures: string[]
  utilities: string[]
  parkingType: string
  securityFeatures: string[]
  customAmenities: string[]

  // Step 9: Claims
  claims: PropertyClaim[]

  // Step 10: Verification Evidence
  evidences: VerificationEvidence[]
}

export const INITIAL_POST_PROPERTY_DATA: PostPropertyFormData = {
  relationship: "verified_agent",
  agentBackingRequested: false,
  offering: "rent",
  category: "apartment",
  title: "",
  bedrooms: 2,
  bathrooms: 2,
  areaSqM: 120,
  condition: "excellent",
  furnished: "semi_furnished",
  price: "35,000",
  paymentFrequency: "Monthly",
  deposit: "35,000",
  agencyFee: "17,500",
  additionalCosts: [
    { id: "cost-1", name: "Maintenance Fee", amount: "1,500", frequency: "Monthly", enabled: true },
    { id: "cost-2", name: "Water & Generator Backup", amount: "800", frequency: "Monthly", enabled: true },
  ],
  addressSearch: "Bole Atlas, Near Atlas Hotel",
  city: "Addis Ababa",
  subCity: "Bole",
  woreda: "Woreda 03",
  neighborhood: "Atlas",
  landmark: "Atlas Hotel",
  isExactLocationPublic: true,
  description: "Modern 3rd-floor 2-bedroom apartment with 24/7 water supply from a 2000L backup tank, dedicated fiber internet line, and 1 underground secure parking spot.",
  images: [
    {
      id: "img-1",
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      category: "living",
      isCover: true,
      caption: "Spacious living area with city view",
    },
    {
      id: "img-2",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      category: "kitchen",
      isCover: false,
      caption: "Modern fitted kitchen",
    },
    {
      id: "img-3",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      category: "bedroom",
      isCover: false,
      caption: "Master bedroom",
    },
  ],
  interiorFeatures: ["Balcony", "Built-in kitchen"],
  utilities: ["Water", "Electricity", "Water tank", "Fiber"],
  parkingType: "Private parking",
  securityFeatures: ["Security guard", "CCTV", "Gated compound"],
  customAmenities: [],
  claims: [
    {
      id: "c-1",
      category: "water",
      title: "Water Availability",
      claimedText: "24/7 continuous water supply with 2000L backup tank",
    },
    {
      id: "c-2",
      category: "internet",
      title: "Internet Connection",
      claimedText: "Dedicated Ethio Telecom fiber optic line",
    },
  ],
  evidences: [
    {
      claimId: "c-1",
      documentType: "photo",
      fileName: "water_tank_audit_photo.jpg",
      fileUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80",
      status: "attached",
    },
  ],
}
