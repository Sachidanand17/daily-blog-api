import {
    Entity,
    Column,
    PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm'
import Blog from "./Blog";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({unique: true})
    email!: string

    @Column()
    password!: string

    @Column({nullable: true})
    sessionToken: string

    @Column({type: 'boolean', default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}

