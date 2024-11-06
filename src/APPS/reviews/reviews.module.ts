// src/APPS/reviews/reviews.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './review.entity';
import { UsersModule } from '../users/users.module';
import { ProductModule } from '../Product/Product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    UsersModule,
    ProductModule, // Ensure ProductModule is imported
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}