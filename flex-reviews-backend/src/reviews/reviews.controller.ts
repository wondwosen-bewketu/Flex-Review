/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { ReviewsService, NormalizedReview, GoogleReview } from './reviews.service';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  async getHostawayReviews(): Promise<{ reviews: NormalizedReview[] }> {
    const normalized = await this.reviewsService.normalizeReviews();
    return { reviews: normalized };
  }

  @Get('google')
  async getGoogleReviews(@Query('listingId') listingId: string): Promise<{ reviews: GoogleReview[] }> {
    const googleReviews = await this.reviewsService.fetchGoogleReviews(listingId || 'default');
    return { reviews: googleReviews };
  }

  @Post('selected')
  saveSelectedReviews(@Body() selectedReviewIds: number[]): { success: boolean } {
    // In a real application, this would save to a database
    // For this demo, we'll just log it
    console.log('Selected reviews saved:', selectedReviewIds);
    return { success: true };
  }

  @Get('selected/:listingName')
  getSelectedReviews(@Param('listingName') listingName: string): { reviewIds: number[] } {
    // In a real application, this would fetch from a database
    // For this demo, we'll return an empty array
    console.log('Fetching selected reviews for:', listingName);
    return { reviewIds: [] };
  }
}