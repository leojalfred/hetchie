import { Router } from 'express'
import Location from '../models/Location'
import get from './shared/get'
import post from './shared/postName'

const router = Router()
router.get('/', get(Location))
router.post('/', post(Location))

export default router
