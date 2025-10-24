import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { ReviewRepository } from './repositories/review.repository';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService],
})
export class ReviewsModule {}
