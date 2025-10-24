export interface NormalizedReview {
  id: number;
  type: string;
  status: string;
  overallRating: number | null;
  categories: { category: string; rating: number }[];
  publicReview: string;
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel: string;
  dateBucket: string;
}

export interface Property {
  name: string;
  description: string;
  image: string;
  amenities: string[];
}