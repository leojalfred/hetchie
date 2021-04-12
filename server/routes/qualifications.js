import { Router } from 'express'
import Qualification from '../models/Qualification'
import get from './shared/get'
import post from './shared/postName'

const router = Router()
router.get('/', get(Qualification))
router.post('/', post(Qualification))

export default router
