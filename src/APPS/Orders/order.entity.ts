import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../Users/users.entity';
import { Product } from '../Product/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column()
  status: string; 

  @Column('decimal')
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @ManyToOne(() => Product, product => product.id)
  product: Product;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}