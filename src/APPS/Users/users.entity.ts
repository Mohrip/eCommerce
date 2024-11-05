import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Review } from '../reviews/review.entity';
import { Wishlist } from '../wishlist/wishlist.entity'; // Import Wishlist entity

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ default: '' })
    profile: string;

    @Column()
    orders: string;

    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @OneToMany(() => Wishlist, wishlist => wishlist.user) // Add this line
    wishlist: Wishlist[]; // Add this line
}