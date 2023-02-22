import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { Technical } from './Technical'


@Entity()
export class Support extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    firstname: string

    @Column()
    lastname: string

    @Column()
    dateSupport: string

    @Column()
    address: string

    @Column({nullable: true})
    phoneUser: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Technical)
    @JoinColumn()
    technical: Technical
}