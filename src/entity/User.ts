import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Support } from './Support'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    username: string

    @Column({nullable: true})
    password: string

    @Column({nullable: true})
    email: string

    isValidPassword = (password: string) => {
        return bcrypt.compareSync(password, this.password)
    }

    setPassword = async (password: string) => {
        
        return this.password = await bcrypt.hashSync(password, 12)
    }

    generateJWT = () => {
        return jwt.sign(
            {
                email: this.email
            }, 
            "SECRET",
            { expiresIn: '1h'}
        )
    }

}