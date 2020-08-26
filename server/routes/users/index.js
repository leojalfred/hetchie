import { Router } from 'express'
import register from './register'
import verify from './verify'
import login from './login'
import put from './put'
import preferences from './preferences'

const router = Router()
router.post('/register', register)
router.get('/verify', verify)
router.post('/login', login)
router.put('/', put)
router.put('/preferences', preferences)

export default router
