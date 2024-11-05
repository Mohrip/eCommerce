import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../APPS/Users/users.entity';
import { Product } from '../../APPS/Product/product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.wishlist)
  user: User;

  @ManyToOne(() => Product, product => product.id)
  product: Product;
}