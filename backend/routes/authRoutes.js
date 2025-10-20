import express from 'express'
import { signin, login, logout } from '../controllers/authController.js'

const router = express.Router()

router.post("/signin", signin)
router.post("/login", login)
router.post("/logout", logout)

export default router