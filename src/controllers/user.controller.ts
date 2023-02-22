import { Request, Response } from 'express'
import { User } from "../entity/User"
import { Support } from '../entity/Support'
import * as jwt from 'jsonwebtoken'
import { secret } from '../config'

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User()
        
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email

        await user.save()

        return res.json(user)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getUsers = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }

    try {
        const users = await User.find()

        return res.json(users)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getUserById = async (req: Request, res: Response) => {

    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }
    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id)})
        if (!user) return res.status(404).json({ message: "User not found" });
        
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}

export const updateUser = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }
    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id)})
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.update( { id: parseInt(req.params.id) } , req.body)

        return res.status(200)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}

export const deleteUser = async (req: Request, res: Response) => {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ 
            auth: false,
            message: 'No token provided'
        })
    }

    try {
        const user = await User.findOneBy({ id: parseInt(req.params.id)})
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.delete({ id: parseInt(req.params.id) })
        
        return res.sendStatus(200)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}