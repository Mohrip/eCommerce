import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../../cart/cart.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column( {unique: true} )
    email: string;

    @Column()
    password: string;

    @Column()
    role: string

    @Column({ default: '' })
    profile: string

    @Column()
    orders: string;

    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];

}