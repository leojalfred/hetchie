import { Router } from 'express'
import get from './getPractices'
import put from './putPractice'

const router = Router()
router.get('/', get)
router.put('/', put)

export default router
