import { Router } from 'express'
import Location from '../models/Location'
import get from './shared/get'
import put from './shared/putName'

const router = Router()
router.get('/', get(Location))
router.put('/', put(Location))

export default router
