import { Request, Response } from 'express'
import { User } from "../entity/User"
import * as jwt from 'jsonwebtoken'
import { secret } from '../config'

export const registerUser = async (req: Request, res: Response) => {
    
    try {
        const {email, password} = req.body
        const user = new User()
        
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email

        user.password = await user.setPassword(password)

        await user.save()

        const token = jwt.sign({id: user.id}, secret, {
            expiresIn: 60*60*24 
        } )

        return res.json({auth :true, token})
       
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const generateToken = async (req: Request, res: Response) => {
    
    try {
        const {email, password} = req.body
        const user = new User()
        
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email

        user.password = await user.setPassword(password)

        const token = jwt.sign({id: user.id}, secret, {
            expiresIn: 60*60*24 
        } )

        return res.json({auth :true, token})
       
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const loginUser = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }

    const decode = Object.values(jwt.verify( String(token), secret ))
    
    try {
        const user = await User.findOneBy({id: decode[0]})
        if(!user) {
            res.status(404).json({message: 'User not found'})
        }
        
        res.status(200).json({
            username : user?.username,
            email : user?.email,
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const ticketUser = async (req: Request, res: Response) => {
    
    const {email, username} = req.body
    
    if(!(email && username)){
       return res.status(400).send()
    }
    
    try {
        const user = await User.findOneBy({ email: email})
        
        res.status(200).json({ticket_service : user?.generateJWT() })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}
