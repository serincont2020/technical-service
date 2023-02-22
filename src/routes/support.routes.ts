import { Router } from "express"
import { createSupport, getSupports, getSupportById, updateSupport, deleteSupport } from "../controllers/support.controller"

const router = Router()

router.post('/supports', createSupport)
router.get('/supports', getSupports)
router.get('/supports/:id', getSupportById)
router.put('/supports/:id', updateSupport)
router.delete('/supports/:id', deleteSupport)

export default router