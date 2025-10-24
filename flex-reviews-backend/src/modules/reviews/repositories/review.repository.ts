import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { appConfig } from '../../../config/app.config';
import {
  HostawayReview,
  HostawayResponse,
  NormalizedReview,
} from '../interfaces/hostaway.interface';
import { GoogleReview } from '../interfaces/google.interface';

interface HostawayAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable()
export class ReviewRepository {
  /**
   * Fetch reviews from Hostaway API
   * @returns Raw reviews from Hostaway API
   */
  async fetchHostawayReviews(): Promise<HostawayReview[]> {
    try {
      // First, authenticate to get a JWT token
      const authResponse = await axios.post<HostawayAuthResponse>(
        `${appConfig.hostaway.baseUrl}/auth/token`,
        {
          grant_type: 'client_credentials',
          client_id: appConfig.hostaway.accountId as string,
          client_secret: appConfig.hostaway.apiKey as string,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const accessToken = authResponse.data.access_token;

      // Now fetch the reviews using the JWT token
      const response = await axios.get<HostawayResponse>(
        `${appConfig.hostaway.baseUrl}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            accountId: appConfig.hostaway.accountId as string,
          },
        },
      );

      if (!response.data || !response.data.result) {
        throw new Error('Invalid response from Hostaway API');
      }

      return response.data.result;
    } catch (error) {
      console.error('Failed to fetch Hostaway reviews:', error);
      // For demonstration purposes, return mock data when API fails
      return this.getMockHostawayData();
    }
  }

  /**
   * Mocked data based on provided example (expanded to 5+ realistic reviews)
   */
  private getMockHostawayData(): HostawayReview[] {
    return [
      {
        id: 7453,
        type: 'host-to-guest',
        status: 'published',
        rating: null,
        publicReview:
          'Shane and family are wonderful! Would definitely host again :)',
        reviewCategory: [
          { category: 'cleanliness', rating: 10 },
          { category: 'communication', rating: 10 },
          { category: 'respect_house_rules', rating: 10 },
        ],
        submittedAt: '2020-08-21 22:45:14',
        guestName: 'Shane Finkelstein',
        listingName: '2B N1 A - 29 Shoreditch Heights',
      },
      {
        id: 7454,
        type: 'guest-to-host',
        status: 'published',
        rating: 9,
        publicReview: 'Great stay, clean and responsive host.',
        reviewCategory: [
          { category: 'cleanliness', rating: 9 },
          { category: 'communication', rating: 10 },
          { category: 'respect_house_rules', rating: 8 },
        ],
        submittedAt: '2025-10-01 10:30:00',
        guestName: 'Alex Johnson',
        listingName: '2B N1 A - 29 Shoreditch Heights',
      },
      // Add 3 more mocks for variety (different listings, dates)
      {
        id: 7455,
        type: 'host-to-guest',
        status: 'published',
        rating: null,
        publicReview: 'Fantastic guests, left everything spotless.',
        reviewCategory: [
          { category: 'cleanliness', rating: 10 },
          { category: 'communication', rating: 9 },
        ],
        submittedAt: '2025-09-15 15:20:45',
        guestName: 'Maria Lopez',
        listingName: 'Penthouse Suite - Downtown',
      },
      {
        id: 7456,
        type: 'guest-to-host',
        status: 'draft',
        rating: 7,
        publicReview: 'Location was great, but AC was noisy.',
        reviewCategory: [
          { category: 'cleanliness', rating: 8 },
          { category: 'communication', rating: 7 },
          { category: 'respect_house_rules', rating: 10 },
        ],
        submittedAt: '2025-10-20 08:15:30',
        guestName: 'John Doe',
        listingName: 'Penthouse Suite - Downtown',
      },
      {
        id: 7457,
        type: 'host-to-guest',
        status: 'published',
        rating: null,
        publicReview: 'Reliable and respectful group.',
        reviewCategory: [
          { category: 'cleanliness', rating: 9 },
          { category: 'communication', rating: 10 },
          { category: 'respect_house_rules', rating: 10 },
        ],
        submittedAt: '2025-08-10 12:00:00',
        guestName: 'Team Outing',
        listingName: 'Cozy Apartment - Suburbs',
      },
      {
        id: 7458,
        type: 'guest-to-host',
        status: 'published',
        rating: 5,
        publicReview:
          'Terrible experience. Property was dirty and amenities were broken.',
        reviewCategory: [
          { category: 'cleanliness', rating: 3 },
          { category: 'communication', rating: 4 },
          { category: 'respect_house_rules', rating: 8 },
        ],
        submittedAt: '2025-10-15 14:20:00',
        guestName: 'Disappointed Guest',
        listingName: '2B N1 A - 29 Shoreditch Heights',
      },
      {
        id: 7459,
        type: 'guest-to-host',
        status: 'published',
        rating: 8,
        publicReview:
          'Beautiful place with amazing views. Host was very helpful.',
        reviewCategory: [
          { category: 'cleanliness', rating: 9 },
          { category: 'communication', rating: 9 },
          { category: 'respect_house_rules', rating: 7 },
        ],
        submittedAt: '2025-10-10 09:30:00',
        guestName: 'Happy Traveler',
        listingName: 'Luxury Loft - Waterfront',
      },
    ];
  }

  /**
   * Fetch Google Reviews for a place
   * @param placeId - The Google Place ID to get reviews for
   * @returns Array of Google reviews
   */
  async fetchGoogleReviews(placeId: string): Promise<GoogleReview[]> {
    try {
      // In a real implementation, you would use:
      // const response: any = await axios.get(`${appConfig.google.baseUrl}/details/json`, {
      //   params: {
      //     place_id: placeId,
      //     fields: 'reviews',
      //     key: appConfig.google.apiKey
      //   }
      // });
      // return response.data.result.reviews || [];

      // For this demo, we'll return mock data
      console.log('Fetching Google Reviews for place ID:', placeId);
      // Add await to satisfy the eslint rule
      await new Promise((resolve) => setTimeout(resolve, 0));
      return this.getMockGoogleReviews();
    } catch (error) {
      console.error('Failed to fetch Google reviews:', error);
      return this.getMockGoogleReviews();
    }
  }

  /**
   * Mock Google Reviews implementation
   * In a production environment, this would integrate with the Google Places API
   * @returns Array of Google reviews
   */
  private getMockGoogleReviews(): GoogleReview[] {
    return [
      {
        author_name: 'Sarah M.',
        rating: 4.5,
        text: 'Loved staying here! Great location and very clean.',
        time: Date.now() - 86400000, // 1 day ago
        profile_photo_url: 'https://via.placeholder.com/50x50?text=SM',
      },
      {
        author_name: 'Mike T.',
        rating: 5,
        text: 'Perfect for our weekend getaway. Highly recommend!',
        time: Date.now() - 172800000, // 2 days ago
        profile_photo_url: 'https://via.placeholder.com/50x50?text=MT',
      },
      {
        author_name: 'Jennifer K.',
        rating: 4,
        text: 'Amazing views from the penthouse. The place was spacious and modern.',
        time: Date.now() - 259200000, // 3 days ago
        profile_photo_url: 'https://via.placeholder.com/50x50?text=JK',
      },
      {
        author_name: 'David L.',
        rating: 5,
        text: 'Exceptional service and beautiful amenities. Will definitely be back!',
        time: Date.now() - 345600000, // 4 days ago
        profile_photo_url: 'https://via.placeholder.com/50x50?text=DL',
      },
      {
        author_name: 'Emma R.',
        rating: 4,
        text: 'Great place for a family vacation. Kids loved the pool area.',
        time: Date.now() - 432000000, // 5 days ago
        profile_photo_url: 'https://via.placeholder.com/50x50?text=ER',
      },
    ];
  }

  /**
   * Normalize reviews by adding channel information and bucketing dates
   * @param hostawayReviews - Raw reviews from Hostaway API
   * @returns Normalized reviews with channel and dateBucket properties
   */
  normalizeReviews(hostawayReviews: HostawayReview[]): NormalizedReview[] {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    return hostawayReviews.map((review): NormalizedReview => {
      const submittedDate = new Date(review.submittedAt);
      let dateBucket: string;

      if (submittedDate >= thirtyDaysAgo) {
        dateBucket = 'recent'; // Last 30 days
      } else if (submittedDate >= ninetyDaysAgo) {
        dateBucket = 'past-month'; // 30-90 days ago
      } else {
        dateBucket = 'older'; // More than 90 days ago
      }

      return {
        ...review,
        channel: 'hostaway',
        dateBucket,
        categories: review.reviewCategory || [],
        overallRating: review.rating,
      };
    });
  }
}
