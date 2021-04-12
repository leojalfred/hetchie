import { Router } from 'express'
import Ranking from '../../models/Ranking'
import get from '../shared/get'
import post from './postRanking'

const router = Router()
router.get('/', get(Ranking))
router.post('/', post)

export default router
