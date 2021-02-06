import { Router } from 'express'
import get from './getLocations'
import put from './putLocation'

const router = Router()
router.get('/', get)
router.put('/', put)

export default router
