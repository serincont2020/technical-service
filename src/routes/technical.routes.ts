import { Router } from "express"
import { createTechnical, getTechnicals, getTechnicalById, updateTechnical , deleteTechnical} from "../controllers/technical.controller"

const router = Router()

router.post('/technicals', createTechnical)
router.get('/technicals', getTechnicals)
router.get('/technicals/:id', getTechnicalById)
router.put('/technicals/:id', updateTechnical)
router.delete('/utechnicals/:id', deleteTechnical)

export default router