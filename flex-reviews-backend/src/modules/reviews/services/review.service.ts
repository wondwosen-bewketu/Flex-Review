import {
  NormalizedReview,
  HostawayReviewCategory,
} from '../interfaces/hostaway.interface';
import { GoogleReview } from '../interfaces/google.interface';
import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repositories/review.repository';

@Injectable()
export class ReviewService {
  private selectedReviews: Map<string, number[]> = new Map();

  constructor(private readonly reviewRepository: ReviewRepository) {}

  /**
   * Fetch and normalize reviews from Hostaway API
   * @returns Normalized reviews with channel and dateBucket properties
   */
  async getHostawayReviews(): Promise<NormalizedReview[]> {
    try {
      const hostawayReviews =
        await this.reviewRepository.fetchHostawayReviews();
      return this.reviewRepository.normalizeReviews(hostawayReviews);
    } catch (error) {
      console.error('Failed to get Hostaway reviews:', error);
      throw new Error(
        `Failed to get Hostaway reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  /**
   * Fetch Google Reviews for a place
   * @param placeId - The Google Place ID to get reviews for
   * @returns Array of Google reviews
   */
  async getGoogleReviews(placeId: string): Promise<GoogleReview[]> {
    try {
      return await this.reviewRepository.fetchGoogleReviews(placeId);
    } catch (error) {
      console.error('Failed to get Google reviews:', error);
      throw new Error(
        `Failed to get Google reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  /**
   * Fetch all reviews (Hostaway and Google)
   * @returns Combined array of normalized reviews
   */
  async getAllReviews(): Promise<NormalizedReview[]> {
    try {
      // Fetch Hostaway reviews
      const hostawayReviews = await this.getHostawayReviews();

      // For demonstration, we'll create some mock Google reviews
      // In a real implementation, you would fetch actual Google reviews
      const googleReviews = await this.getGoogleReviews('default');

      // Convert Google reviews to normalized format
      const normalizedGoogleReviews =
        this.normalizeGoogleReviews(googleReviews);

      // Combine both review types
      return [...hostawayReviews, ...normalizedGoogleReviews];
    } catch (error) {
      console.error('Failed to get all reviews:', error);
      throw new Error(
        `Failed to get all reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  /**
   * Normalize Google reviews to match the NormalizedReview interface
   * @param googleReviews - Array of Google reviews
   * @returns Array of normalized reviews
   */
  private normalizeGoogleReviews(
    googleReviews: GoogleReview[],
  ): NormalizedReview[] {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    return googleReviews.map((review, index): NormalizedReview => {
      const submittedDate = new Date(review.time * 1000);
      let dateBucket: string;

      if (submittedDate >= thirtyDaysAgo) {
        dateBucket = 'recent'; // Last 30 days
      } else if (submittedDate >= ninetyDaysAgo) {
        dateBucket = 'past-month'; // 30-90 days ago
      } else {
        dateBucket = 'older'; // More than 90 days ago
      }

      // Create mock categories for Google reviews
      const categories: HostawayReviewCategory[] = [
        { category: 'cleanliness', rating: Math.round(review.rating * 2) },
        { category: 'communication', rating: Math.round(review.rating * 2) },
        { category: 'value', rating: Math.round(review.rating * 2) },
      ];

      return {
        id: 9000 + index, // Use a different ID range for Google reviews
        type: 'google-review',
        status: 'published',
        rating: review.rating,
        publicReview: review.text,
        reviewCategory: categories,
        submittedAt: submittedDate.toISOString(),
        guestName: review.author_name,
        listingName: 'Google Reviews Property', // Default listing name for Google reviews
        channel: 'google',
        dateBucket,
        categories,
        overallRating: review.rating,
      };
    });
  }

  /**
   * Save selected reviews for a specific listing
   * @param listingName - The name of the listing
   * @param selectedReviewIds - Array of selected review IDs
   */
  saveSelectedReviews(listingName: string, selectedReviewIds: number[]): void {
    try {
      this.selectedReviews.set(listingName, selectedReviewIds);
      console.log(
        'Selected reviews saved for',
        listingName,
        ':',
        selectedReviewIds,
      );
    } catch (error) {
      console.error('Failed to save selected reviews:', error);
      throw new Error(
        `Failed to save selected reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  /**
   * Get selected reviews for a specific listing
   * @param listingName - The name of the listing
   * @returns Array of selected review IDs
   */
  getSelectedReviews(listingName: string): number[] {
    try {
      const reviewIds = this.selectedReviews.get(listingName) || [];
      console.log('Fetching selected reviews for', listingName, ':', reviewIds);
      return reviewIds;
    } catch (error) {
      console.error('Failed to fetch selected reviews:', error);
      throw new Error(
        `Failed to fetch selected reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }
}
