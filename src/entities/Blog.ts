import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import User from "./User";

@Entity()
export default class Blog {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title: string

    @Column()
    shortDescription: string

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.blogs)
    user!: User

    @Column({type: 'boolean', default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}


