import { Request, Response } from 'express'
import { Support } from "../entity/Support"
import { Technical } from '../entity/Technical'

export const createSupport = async (req: Request, res: Response) => {
    const technical = req.headers['ticket_service']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Ticket is required'
        })
    }
    try {
        const support = new Support()

        support.firstname = req.body.firstname
        support.lastname = req.body.lastname
        support.dateSupport = req.body.dateSupport
        support.address = req.body.address
        support.phoneUser = req.body.phoneUser

        const randomTech = await Technical.createQueryBuilder('technical').select().orderBy('RANDOM()').getOne()

        await support.save()

        return res.json({support, randomTech})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getSupports = async (req: Request, res: Response) => {
    const technical = req.headers['ticket_service']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Ticket is required'
        })
    }

    try {
        const supports = await Support.find()

        return res.json(supports)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getSupportById = async (req: Request, res: Response) => {
    const technical = req.headers['ticket_service']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Ticket is required'
        })
    }

    try {
        const support = await Support.findOneBy({ id: parseInt(req.params.id)})
        if (!support) return res.status(404).json({ message: "Support not found" });
        
        return res.json(support);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
        
}

export const updateSupport = async (req: Request, res: Response) => {
    const technical = req.headers['ticket_service']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Ticket is required'
        })
    }

    try {
        const support = await Support.findOneBy({ id: parseInt(req.params.id)})
        if (!support) return res.status(404).json({ message: "Support not found" });

        await Support.update({ id: parseInt(req.params.id) }, req.body)
        
        support.save()

        return res.json(support)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
        
}

export const deleteSupport = async (req: Request, res: Response) => {
    const technical = req.headers['ticket_service']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Ticket is required'
        })
    }

    try {
        const support = await Support.findOneBy({ id: parseInt(req.params.id)})
        if (!support) return res.status(404).json({ message: "Support not found" });

        await Support.delete({ id: parseInt(req.params.id) })
        
        return res.sendStatus(200)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
}