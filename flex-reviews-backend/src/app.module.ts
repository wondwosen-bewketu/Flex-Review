/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews';

@Module({
  imports: [ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}