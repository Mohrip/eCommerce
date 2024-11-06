import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductModule } from './Product/Product.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from '../APPS/cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './Users/users.entity';
import { Product } from './Product/product.entity';
import { Category } from './Product/category.entity';
import { Order, OrderItem } from './orders/order.entity';
import { Cart } from '../APPS/cart/cart.entity';
import {  CartItem } from '../APPS/cart/cart.entity';
import { Review } from './reviews/review.entity';
import { Wishlist } from './wishlist/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [User, Product, Category, Order, OrderItem, Cart, CartItem, Review, Wishlist],
      synchronize: true,
    }),
    UsersModule,
    ProductModule,
    OrdersModule,
    CartModule,
    ReviewsModule,
  ],
})
export class AppModule {}