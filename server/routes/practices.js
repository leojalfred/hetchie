import { Router } from 'express'
import Practice from '../models/Practice'
import get from './shared/get'
import post from './shared/postName'

const router = Router()
router.get('/', get(Practice))
router.post('/', post(Practice))

export default router
