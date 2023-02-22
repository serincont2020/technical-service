import { Router } from "express"
import { registerUser, generateToken, loginUser, ticketUser } from "../controllers/auth.controller"

const router = Router()

router.post('/register', registerUser)
router.post('/token', generateToken)
router.post('/login', loginUser)
router.post('/ticket', ticketUser)

export default router