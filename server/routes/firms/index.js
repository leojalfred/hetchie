import { Router } from 'express'
import get from './getFirms'
import put from './putFirms'

const router = Router()
router.get('/', get)
router.put('/', put)

export default router
