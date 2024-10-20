import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // Add more columns as needed teeesssttt

    // Add relationships with other entities if necessary

    // Add any additional methods or decorators as needed
}