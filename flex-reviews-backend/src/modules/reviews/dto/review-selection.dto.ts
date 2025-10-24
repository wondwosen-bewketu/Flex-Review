import { IsString, IsArray, IsNumber } from 'class-validator';

export class ReviewSelectionDto {
  @IsString()
  listingName: string;

  @IsArray()
  @IsNumber({}, { each: true })
  selectedReviewIds: number[];
}
