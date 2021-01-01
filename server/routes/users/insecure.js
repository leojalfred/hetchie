import { Router } from 'express'
import register from './register'
import verify from './verify'
import login from './login'

const router = Router()
router.post('/register', register)
router.get('/verify', verify)
router.post('/login', login)

export default router
