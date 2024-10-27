import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductModule } from '../APPS/Product/Product.module';
import { User } from '../APPS/Users/users.entity';
import { Product } from '../APPS/Product/product.entity';
import { Category } from '../APPS/Product/category.entity';


import { OrdersModule } from './orders/orders.module';
import { Order  } from '../APPS/Orders/order.entity';
import {  OrderItem } from '../APPS/Orders/order.entity';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [User, Product, Category, Order, OrderItem, Cart, CartItem],
      synchronize: false,
    }),
    UsersModule,
    ProductModule,
    OrdersModule,
  ],
})
export class AppModule {}



  

