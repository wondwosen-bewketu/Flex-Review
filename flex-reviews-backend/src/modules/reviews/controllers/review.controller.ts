import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { ReviewSelectionDto } from '../dto/review-selection.dto';
import { NormalizedReview } from '../interfaces/hostaway.interface';
import { GoogleReview } from '../interfaces/google.interface';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('hostaway')
  @ApiOperation({
    summary: 'Get Hostaway reviews',
    description: 'Fetch all reviews from Hostaway platform',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Hostaway reviews',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getHostawayReviews(): Promise<{ reviews: NormalizedReview[] }> {
    try {
      const reviews = await this.reviewService.getHostawayReviews();
      return { reviews };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch Hostaway reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all')
  @ApiOperation({
    summary: 'Get all reviews',
    description: 'Fetch all reviews from both Hostaway and Google platforms',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all reviews',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllReviews(): Promise<{ reviews: NormalizedReview[] }> {
    try {
      const reviews = await this.reviewService.getAllReviews();
      return { reviews };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch all reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('google')
  @ApiOperation({
    summary: 'Get Google reviews',
    description: 'Fetch reviews from Google Places API for a specific listing',
  })
  @ApiQuery({
    name: 'listingId',
    required: false,
    description: 'ID of the listing to fetch reviews for',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved Google reviews',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getGoogleReviews(
    @Query('listingId') listingId: string,
  ): Promise<{ reviews: GoogleReview[] }> {
    try {
      const reviews = await this.reviewService.getGoogleReviews(
        listingId || 'default',
      );
      return { reviews };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch Google reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('selected')
  @ApiOperation({
    summary: 'Save selected reviews',
    description: 'Save the IDs of selected reviews for a specific listing',
  })
  @ApiBody({
    type: ReviewSelectionDto,
    description: 'Review selection data',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully saved selected reviews',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  saveSelectedReviews(@Body() reviewSelectionDto: ReviewSelectionDto): {
    success: boolean;
  } {
    try {
      this.reviewService.saveSelectedReviews(
        reviewSelectionDto.listingName,
        reviewSelectionDto.selectedReviewIds,
      );
      return { success: true };
    } catch (error) {
      throw new HttpException(
        `Failed to save selected reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('selected/:listingName')
  @ApiOperation({
    summary: 'Get selected reviews',
    description: 'Fetch the IDs of selected reviews for a specific listing',
  })
  @ApiParam({
    name: 'listingName',
    description: 'Name of the listing to fetch selected reviews for',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved selected reviews',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getSelectedReviews(@Param('listingName') listingName: string): {
    reviewIds: number[];
  } {
    try {
      const reviewIds = this.reviewService.getSelectedReviews(listingName);
      return { reviewIds };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch selected reviews: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
