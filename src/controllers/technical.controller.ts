import { Request, Response } from 'express'
import { Technical } from "../entity/Technical"
import { Support } from "../entity/Support"

export const createTechnical = async (req: Request, res: Response) => {
    const technical = req.headers['technical-support']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Technical role is required'
        })
    }
    try {
        const technical = new Technical()

        technical.firstname = req.body.firstname
        technical.lastname = req.body.lastname
        technical.role = req.body.role

        await technical.save()

        return res.json(technical)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getTechnicals = async (req: Request, res: Response) => {
    const technical = req.headers['technical-support']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Technical role is required'
        })
    }
    try {
        const technicals = await Technical.find()
        
        return res.json(technicals)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getTechnicalById = async (req: Request, res: Response) => {
    const technical = req.headers['technical-support']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Technical role is required'
        })
    }
    try {
        const technical = await Technical.findOneBy({ id: parseInt(req.params.id)})
        if (!technical) return res.status(404).json({ message: "Technical not found" });

        const support = await Support.findOneBy({ id: parseInt(req.params.id)})
        
        return res.json({technical , message: 'Los servicios asignados son:', support });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
        
}

export const updateTechnical = async (req: Request, res: Response) => {
    const technical = req.headers['technical-support']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Technical role is required'
        })
    }

    try {
        const technical = await Technical.findOneBy({ id: parseInt(req.params.id)})
        if (!technical) return res.status(404).json({ message: "Technical not found" });

        await Technical.update({ id: parseInt(req.params.id) }, req.body)
        
        technical.save()

        return res.json(technical)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
}

export const deleteTechnical = async (req: Request, res: Response) => {
    const technical = req.headers['technical-support']
    if(!technical) {
        return res.status(401).json({ 
            auth: false,
            message: 'Technical role is required'
        })
    }

    try {
        const technical = await Technical.findOneBy({ id: parseInt(req.params.id)})
        if (!technical) return res.status(404).json({ message: "Technical not found" });

        await Technical.delete({ id: parseInt(req.params.id) })
        
        return res.sendStatus(200)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        
    }
    
}