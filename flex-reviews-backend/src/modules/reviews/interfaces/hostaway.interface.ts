export interface HostawayReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: HostawayReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface HostawayResponse {
  status: string;
  result: HostawayReview[];
}

export interface NormalizedReview extends HostawayReview {
  channel: string; // e.g., 'hostaway', 'google'
  dateBucket: string; // e.g., 'recent', 'past-month', 'older'
  categories: HostawayReviewCategory[];
  overallRating: number | null;
}
