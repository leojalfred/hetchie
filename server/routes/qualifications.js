import { Router } from 'express'
import Qualification from '../models/Qualification'
import get from './shared/get'
import put from './shared/putName'

const router = Router()
router.get('/', get(Qualification))
router.put('/', put(Qualification))

export default router
