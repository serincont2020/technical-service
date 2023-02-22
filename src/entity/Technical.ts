import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { Support } from './Support';

@Entity()
export class Technical extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({default: true})
    active: boolean

    @Column({default: 'technical'})
    role: string
}