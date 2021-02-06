import { Router } from 'express'
import Practice from '../models/Practice'
import get from './shared/get'
import put from './shared/putName'

const router = Router()
router.get('/', get(Practice))
router.put('/', put(Practice))

export default router
