/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  id: number;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  overallRating?: number | null;

  @IsString()
  publicReview: string;

  @IsArray()
  categories: { category: string; rating: number }[];

  @IsString()
  submittedAt: string;

  @IsString()
  guestName: string;

  @IsString()
  listingName: string;

  @IsString()
  channel: string;

  @IsString()
  dateBucket: string;
}